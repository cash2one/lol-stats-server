const axios = require("axios");
const httpAdapter = require("axios/lib/adapters/http");

// Prevents Axios from attempting to use the XHR API in non-node
// environments like Jest
axios.defaults.adapter = httpAdapter;

async function requestWithRetries(url) {
  const RATE_LIMIT_EXCEEDED_STATUS_CODE = 429;
  const RATE_LIMIT_BUFFER = 10;

  const response = await axios.get(url);

  if (response.status !== RATE_LIMIT_EXCEEDED_STATUS_CODE) {
    return response;
  }

  // Add a slight buffer to the "Retry-After" value to ensure we don't incur
  // another rate limit error
  const retryTimeout =
    response.headers["Retry-After"] * 1000 + RATE_LIMIT_BUFFER;

  return new Promise(async resolve =>
    setTimeout(resolve(axios.get(url)), retryTimeout)
  );
}

module.exports = requestWithRetries;
