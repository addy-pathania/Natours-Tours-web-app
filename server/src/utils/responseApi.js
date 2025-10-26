/**
 * ResponseApi class to standardize API responses
 */
class ResponseApi {
  constructor(statusCode, status, data, message = null, results = null) {
    this.statusCode = statusCode;
    this.status = status;
    this.data = data;

    if (results !== null) {
      this.results = results;
    }
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
