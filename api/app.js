const faker = require("@faker-js/faker").faker;
const uuid = require("uuid");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DEFAULT_LIMIT = 1_000;
const DEFAULT_CURSOR = 0;
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

app.get("/api/products", (request, response) => {
  const delay = Math.floor(Math.random() * 500);
  console.log({
    message: "Received list products request",
    query: request.query,
    delay,
  });
  const products = STATIC_PRODUCTS;
  let limit = DEFAULT_LIMIT;
  if (request.query.limit) {
    limit = Number(request.query.limit);
  }

  let cursor = DEFAULT_CURSOR;
  if (request.query.cursor) {
    cursor = Number(request.query.cursor);
  }

  let nextCursor = cursor + limit;
  if (nextCursor > products.length) {
    nextCursor = null;
  }
  let prevCursor = cursor - limit;
  if (prevCursor < 0) {
    prevCursor = null;
  }

  setTimeout(() => {
    response.status(200).json({
      data: products.slice(cursor, cursor + limit),
      count: products.length,
      nextCursor,
      prevCursor,
    });
  }, delay);
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
      username: body.username || faker.internet.userName(),
      email: body.email || faker.internet.email(),
      insertedAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  }, delay);
});

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
