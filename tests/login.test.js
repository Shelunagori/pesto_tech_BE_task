const request = require("supertest");
const app = require("../app");
const HTTP_STATUS = require("../utils/httpStatus");

describe("Login API Test", () => {
  it("should return 200 and a token on successful login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_user",
      password: "test_password",
    });
    expect(response.status).toBe(HTTP_STATUS.OK); // Expecting status code 200
    expect(response.body.status).toBe("success");
    expect(response.body).toHaveProperty("token"); // Expecting a token in the response body
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid_email", password: "invalid_password" });

    expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED); // Expecting status code 401 for unauthorized access
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 400 for missing email or password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test_user" }); // Missing password
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST); // Expecting status code 400 for bad request
    expect(response.body.message).toBe("Invalid email & Password");
  });
});
