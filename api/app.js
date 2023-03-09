const faker = require("@faker-js/faker").faker;
const uuid = require("uuid");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3001;

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

app.get("/products", (req, res) => {
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

  return res.json({
    data: STATIC_PRODUCTS.slice(cursor, cursor + limit),
    count: STATIC_PRODUCTS.length,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
