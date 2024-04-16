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

}

export default ApiFeatures;