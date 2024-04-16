class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; // Product.find()
        this.queryStr = queryStr; // keyword=samosa
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }

        } : {};

        this.query = this.query.find({ ...keyword });

        return this;
    }

    filter() {

        const oldQueryCopy = { ...this.queryStr };

        // remove fields for category filter
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];

        excludedFields.forEach(el => delete oldQueryCopy[el]);

        // filter for price and rating 
        let queryStr = JSON.stringify(oldQueryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;

    }




}

export default ApiFeatures;