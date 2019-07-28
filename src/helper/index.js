/**
 * Function used to return formatted response to APi Gateway
 */
exports.response = (message = {}, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(message)
});
