const app = require("./app");
const request = require("supertest");

describe("GET /", () => {
  it("responds with hello world", () => {
    request(app)
      .get("/")
      .expect(200)
      .then(response => {
        expect(response.text).toBe("Hello world");
      });
  });
});
