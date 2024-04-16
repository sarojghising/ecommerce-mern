class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; // Product.find()
        this.queryStr = queryStr; // keyword=samosa
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options:"i"
            }

        } : {};

        this.query = this.query.find({...keyword}); 

        return this;
    }

    filter() {

        const oldQueryCopy = {...this.queryStr};

        // remove fields for category filter
        const excludedFields = ['page', 'sort', 'limit', 'fields','keyword'];

        excludedFields.forEach(el => delete oldQueryCopy[el]);

        this.query = this.query.find(oldQueryCopy);

        return this;


    }

}

export default ApiFeatures;