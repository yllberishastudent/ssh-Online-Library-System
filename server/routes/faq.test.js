const request = require("supertest");
const app = require("../server");
const db = require("../models");

beforeEach(async () => {
  // Clear the database before each test
  await db.Faq.destroy({ where: {} });
});

// Test GET / endpoint
describe("GET /", () => {
  test("should get all FAQs", async () => {
    // Create some FAQs in the database
    await db.Faq.bulkCreate([
      { question: "Question 1", answer: "Answer 1", status: "active" },
      { question: "Question 2", answer: "Answer 2", status: "inactive" },
    ]);

    // Send GET request to / endpoint
    const response = await request(app).get("/");

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].question).toBe("Question 1");
    expect(response.body[0].answer).toBe("Answer 1");
    expect(response.body[0].status).toBe("active");
    expect(response.body[1].question).toBe("Question 2");
    expect(response.body[1].answer).toBe("Answer 2");
    expect(response.body[1].status).toBe("inactive");
  });
});

// Test GET /status/:status endpoint
describe("GET /status/:status", () => {
  test("should get FAQs based on the status", async () => {
    // Create some FAQs in the database
    await db.Faq.bulkCreate([
      { question: "Question 1", answer: "Answer 1", status: "active" },
      { question: "Question 2", answer: "Answer 2", status: "inactive" },
    ]);

    // Send GET request to /status/:status endpoint
    const response = await request(app).get("/status/active");

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].question).toBe("Question 1");
    expect(response.body[0].answer).toBe("Answer 1");
    expect(response.body[0].status).toBe("active");
  });
});

// Test GET /:faq_id endpoint
describe("GET /:faq_id", () => {
  test("should get a specific FAQ by ID", async () => {
    // Create a FAQ in the database
    const createdFaq = await db.Faq.create({
      question: "Question 1",
      answer: "Answer 1",
      status: "active",
    });

    // Send GET request to /:faq_id endpoint
    const response = await request(app).get(`/${createdFaq.id}`);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe("Question 1");
    expect(response.body.answer).toBe("Answer 1");
    expect(response.body.status).toBe("active");
  });

  test("should return 404 if FAQ not found", async () => {
    // Send GET request to a non-existent /:faq_id endpoint
    const response = await request(app).get("/123");

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("FAQ not found");
  });
});

// Test POST / endpoint
describe("POST /", () => {
  test("should create a new FAQ", async () => {
    // Send POST request to / endpoint
    const response = await request(app)
      .post("/")
      .send({ question: "Question 1", answer: "Answer 1", status: "active" });

    // Assertions
    expect(response.statusCode).toBe(201);
    expect(response.body.question).toBe("Question 1");
    expect(response.body.answer).toBe("Answer 1");
    expect(response.body.status).toBe("active");
  });
});

// Test PUT /:faq_id endpoint
describe("PUT /:faq_id", () => {
  test("should update an existing FAQ by ID", async () => {
    // Create a FAQ in the database
    const createdFaq = await db.Faq.create({
      question: "Question 1",
      answer: "Answer 1",
      status: "active",
    });

    // Send PUT request to /:faq_id endpoint
    const response = await request(app)
      .put(`/${createdFaq.id}`)
      .send({
        question: "Updated Question",
        answer: "Updated Answer",
        status: "inactive",
      });

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.question).toBe("Updated Question");
    expect(response.body.answer).toBe("Updated Answer");
    expect(response.body.status).toBe("inactive");
  });

  test("should return 404 if FAQ not found", async () => {
    // Send PUT request to a non-existent /:faq_id endpoint
    const response = await request(app)
      .put("/123")
      .send({
        question: "Updated Question",
        answer: "Updated Answer",
        status: "inactive",
      });

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("FAQ not found");
  });
});

// Test DELETE /:faq_id endpoint
describe("DELETE /:faq_id", () => {
  test("should delete an existing FAQ by ID", async () => {
    // Create a FAQ in the database
    const createdFaq = await db.Faq.create({
      question: "Question 1",
      answer: "Answer 1",
      status: "active",
    });

    // Send DELETE request to /:faq_id endpoint
    const response = await request(app).delete(`/${createdFaq.id}`);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("FAQ deleted successfully");
  });

  test("should return 404 if FAQ not found", async () => {
    // Send DELETE request to a non-existent /:faq_id endpoint
    const response = await request(app).delete("/123");

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("FAQ not found");
  });
});
