const axios = require("axios");
const requestWithRetries = require("./request-with-retries");

beforeEach(() => {
  axios.get.mockReset();
});

test("successful request", async () => {
  axios.get.mockReturnValue(Promise.resolve({ data: "Yay!", status: 200 }));

  const response = await requestWithRetries("http://www.example.com");

  expect(response.data).toBe("Yay!");

  // Request should not be retried
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("non rate limit error in request", async () => {
  axios.get.mockReturnValue(
    Promise.resolve({ data: "Not Found", status: 404 })
  );

  const response = await requestWithRetries("http://www.example.com");

  expect(response.data).toBe("Not Found");

  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("rate limit error in request", async () => {
  axios.get
    .mockReturnValueOnce(
      Promise.resolve({
        data: "Rate Limit Exceeded",
        status: 429,
        headers: { "Retry-After": 1 }
      })
    )
    .mockReturnValueOnce(Promise.resolve({ data: "Success", status: 200 }));

  const response = await requestWithRetries("http://www.example.com");

  expect(response.data).toBe("Success");

  // Request should have been retried
  expect(axios.get).toHaveBeenCalledTimes(2);
});
