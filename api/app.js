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

const DEFAULT_LIMIT = 100;
const DEFAULT_CURSOR = 0;
const PRODUCT_COUNT = 100_000;
const generateProducts = (count = PRODUCT_COUNT) => {
  return new Array(count).fill(null).map(() => ({
    id: uuid.v4(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price(1, 1_000_000_000)),
  }));
};
const STATIC_PRODUCTS = generateProducts();
const sortFunction = (prop, direction) => (left, right) => {
  if (left[prop] > right[prop]) {
    return 1 * direction;
  } else if (left[prop] === right[prop]) {
    return sortFunction("id")(left, right);
  } else {
    return -1 * direction;
  }
};

const sortedProducts = {
  id: {
    ASC: STATIC_PRODUCTS.slice().sort(sortFunction("id", 1)),
    DESC: STATIC_PRODUCTS.slice().sort(sortFunction("id", -1)),
  },
  price: {
    ASC: STATIC_PRODUCTS.slice().sort(sortFunction("price", 1)),
    DESC: STATIC_PRODUCTS.slice().sort(sortFunction("price", -1)),
  },
  name: {
    ASC: STATIC_PRODUCTS.slice().sort(sortFunction("name", 1)),
    DESC: STATIC_PRODUCTS.slice().sort(sortFunction("name", -1)),
  },
};

console.log({
  asc: sortedProducts.price.ASC.slice(0, 10),
  desc: sortedProducts.price.DESC.slice(0, 10),
});

const VALID_SORT = {
  id: "id",
  name: "name",
  price: "price",
};

const VALID_SORT_DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
  asc: "ASC",
  desc: "DESC",
};

app.get("/api/v1/products", (request, response) => {
  const delay = Math.random() * 500;
  console.log({ request: request.query });
  const sortBy = VALID_SORT[request.query.sortBy] ?? "id";
  const sortDirection =
    VALID_SORT_DIRECTION[request.query.sortDirection] ?? "ASC";

  const products = sortedProducts[sortBy][sortDirection];

  let limit = DEFAULT_LIMIT;
  if (request.query.limit) {
    limit = Number(request.query.limit);
  }

  let cursor = DEFAULT_CURSOR;
  if (request.query.cursor) {
    cursor = Number(atob(request.query.cursor));
  }

  let nextCursor = cursor + limit;
  if (nextCursor > products.length) {
    nextCursor = null;
  } else {
    nextCursor = btoa(nextCursor);
  }

  let prevCursor = cursor - limit;
  if (prevCursor < 0) {
    prevCursor = null;
  } else {
    prevCursor = btoa(prevCursor);
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

app.get("/api/v1/products", (request, response) => {
  const products = STATIC_PRODUCTS;
  let limit = DEFAULT_LIMIT;
  if (request.query.limit) {
    limit = Number(request.query.limit);
  }

  let cursor = DEFAULT_CURSOR;
  if (request.query.cursor) {
    cursor = Number(atob(request.query.cursor));
  }

  let nextCursor = cursor + limit;
  if (nextCursor > products.length) {
    nextCursor = null;
  } else {
    nextCursor = btoa(nextCursor);
  }

  let prevCursor = cursor - limit;
  if (prevCursor < 0) {
    prevCursor = null;
  } else {
    prevCursor = btoa(prevCursor);
  }

  response.status(200).json({
    data: products.slice(cursor, cursor + limit),
    count: products.length,
    nextCursor,
    prevCursor,
  });
});

const validateCreateUser = (createUserRequest) => {
  const errors = [];
  if (!createUserRequest.username) {
    errors.push("username is required");
  }

  if (!createUserRequest.email) {
    errors.push("email is required");
  }

  if (!createUserRequest.password) {
    errors.push("password is required");
  }

  if (createUserRequest.password.length < 12) {
    errors.push("password must be a minimum of 12 characters");
  }

  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(
      createUserRequest.password
    )
  ) {
    errors.push(
      "password must contain a lowercase letter, an uppercase letter, a number, and a symbol (@$!%*#?&)"
    );
  }

  if (createUserRequest.password !== createUserRequest.passwordConfirmation) {
    errors.push("password does not match password confirmation");
  }

  return errors;
};

app.post("/api/users", (request, response) => {
  const body = request.body || {};
  const delay = Math.floor(Math.random() * 500);
  console.log({
    message: "Received create user request",
    body: request.body,
    delay,
  });

  const errors = validateCreateUser(body);
  if (errors.length) {
    setTimeout(() => {
      response.status(400).json({
        errors,
      });
    }, delay);
    return;
  }

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
