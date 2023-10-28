const advancedResults = (model, populate) => async (req, res, next) => {
    let q;
    const removeFields = ["select", "sort", "limit", "page"];
    const reqQuery = { ...req.query };
    removeFields.forEach((param) => delete reqQuery[param]);
    const qStr = JSON.stringify(reqQuery).replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );
    const totalDocs = await model.countDocuments();
    const { limit, startIndex, pagination } = getPagination(
        req.query,
        totalDocs
    );
    q = model.find(JSON.parse(qStr)).skip(startIndex).limit(limit);
    
    if (req.query.select) {
        const selectedFields = req.query.select.split(",").join(" ");
        q = q.select(selectedFields);
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        q = q.sort(sortBy);
    } else {
        q = q.sort("-createdAt");
    }
    if (populate) {
        q = q.populate(populate);
    }
    const results = await q;

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results,
    };
    next();
};

/**
 * @description paginate response
 * @param query query object
 * @param totalDocs number of model documents
 * @default - limit=10 and page=1
 * @return limit,startIndex,pagination
 *
 */
function getPagination(query, totalDocs) {
    const pagination = {};
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < totalDocs) {
        pagination.next = {
            next: {
                page: page + 1,
                limit,
            },
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            prev: {
                page: page - 1,
                limit,
            },
        };
    }
    return { limit, startIndex, pagination };
}

module.exports = advancedResults;
