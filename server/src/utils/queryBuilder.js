class QueryBuilder {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // Remove excluded fields from query object
    queryObj = Object.fromEntries(
      Object.entries(queryObj).filter(([key]) => !excludedFields.includes(key))
    );
    let queryStr = JSON.stringify(queryObj);
    // Add $ to operators for MongoDB
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const limitFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(limitFields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // multiply by 1 to convert string to number
    const currentPage = this.queryString.page * 1 || 1;
    // default limit is 100
    const limit = this.queryString.limit * 1 || 100;
    // calculate how many documents to skip
    const skip = (currentPage - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
