
// Enables searching, filtering and pagination

class ApiFeatures {

    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){

        // create keyword object
        const keyword = this.queryStr.keyword ? {
            
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }

        } : {};
        
        // update query with searched items
        this.query = this.query.find({...keyword});

        return this;
    }


    filter(){
    
        const queryStrCopy = {...this.queryStr};

        // remove fields from the query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(val => delete queryStrCopy[val]);
 
        // advanced filtering (ranges...)
            // add $ before lt, gt, lte, gte in queryStr
        let stringOfQueryStr = JSON.stringify(queryStrCopy);
        stringOfQueryStr = stringOfQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);


        // update query with filtered items (in json format)
        this.query = this.query.find(JSON.parse(stringOfQueryStr));

        return this;
    }

    
    pagination(resultsPerPage){

        // get current page or default
        const currentPage = Number(this.queryStr.page) || 1;
        // compute the index of items to display on page
        const startAt = resultsPerPage * (currentPage - 1);

        // limit amount of docs to be returned and skip to start position 
        this.query = this.query.limit(resultsPerPage).skip(startAt);

        return this;
    }

}

module.exports = ApiFeatures;