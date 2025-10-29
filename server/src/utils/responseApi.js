/**
 * ResponseApi class to standardize API responses
 */
class ResponseApi {
  constructor(statusCode, status, data, message = null, results = null) {
    this.statusCode = statusCode;
    this.status = status;
    if (results !== null) {
      this.results = results;
    }
    this.data = data;

    if (message) {
      this.message = message;
    }
  }

  // Success response
  send(res) {
    const { statusCode, ...response } = this;
    res.status(statusCode).json(response);
  }
}
export default ResponseApi;
