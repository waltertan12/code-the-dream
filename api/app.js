const faker = require("@faker-js/faker").faker;
const uuid = require("uuid");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(morgan("combined"));
app.use(cors());

const LIMIT = 10_000;
const CURSOR = 0;
const PRODUCT_COUNT = 1_000_000;
const generateProducts = (count = PRODUCT_COUNT) => {
  return new Array(count).fill(null).map(() => ({
    id: uuid.v4(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
  }));
};
const STATIC_PRODUCTS = generateProducts();

app.get("/api/products", (req, res) => {
  let limit = LIMIT;
  if (req.query.limit) {
    limit = Number(req.query.limit);
  }

  if (req.query["fresh"] === "true") {
    return res.json({
      data: generateProducts(limit),
      count: limit,
    });
  }

  let cursor = CURSOR;
  if (req.query.cursor) {
    cursor = Number(req.query.cursor);
  }

  return res.status(200).json({
    data: STATIC_PRODUCTS.slice(cursor, cursor + limit),
    count: STATIC_PRODUCTS.length,
  });
});

app.post("/api/users", (request, response) => {
  const body = request.body || {};
  const delay = Math.floor(Math.random() * 500);
  console.log({
    message: "Received create user request",
    body: request.body,
    delay,
  });

  const now = new Date();
  setTimeout(() => {
    response.status(201).json({
      id: uuid.v4(),
      name: body.name || faker.internet.userName(),
      email: body.email || faker.internet.email(),
      insertedAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  }, delay);
});

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
