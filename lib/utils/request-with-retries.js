const axios = require("axios");

// Prevents Axios from attempting to use the XHR API in non-node
// environments like Jest
axios.defaults.adapter = httpAdapter;

async function requestWithRetries(url) {
  const RATE_LIMIT_EXCEEDED_STATUS_CODE = 429;

  const response = await axios.get(url);

  if (response.statusCode !== RATE_LIMIT_EXCEEDED_STATUS_CODE) {
    return response;
  }

  const retryTimeout = response.headers["Retry-After"];

  return new Promise(async resolve =>
    setTimeout(await axios.get(url), retryTimeout)
  );
}
