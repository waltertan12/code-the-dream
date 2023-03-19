import { useEffect, useState } from "react";
import "./signup-form.css";

const createUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3001/api/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    }

    throw Error("Failed to create user");
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const SignupForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = new FormData(event.target);
      const user = await createUser({
        username: userData.get("username"),
        email: userData.get("email"),
        password: userData.get("password"),
        passwordConfirmation: userData.get("passwordConfirmation"),
      });

      console.log({ user });
      alert("User created!");
    } catch (error) {
      console.log(error);
    }
  };
  const validateInput = (event) => {
    event.target.reportValidity();
  };

  return (
    <form
      action="http://localhost:3001/api/users"
      method="POST"
      onSubmit={handleSubmit}
    >
      <label>
        <strong>Username</strong>
        <br />
        <input
          name="username"
          type="text"
          autoComplete="off"
          required
          onBlur={validateInput}
        ></input>
      </label>
      <label>
        <strong>Email</strong>
        <br />
        <input
          name="email"
          type="email"
          autoComplete="off"
          required
          onBlur={validateInput}
        ></input>
      </label>
      <label>
        <strong>Password</strong>
        <br />
        <input
          name="password"
          type="password"
          autoComplete="off"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$"
          required
          onBlur={validateInput}
        ></input>
      </label>
      <label>
        <strong>Password Confirmation</strong>
        <br />
        <input
          name="passwordConfirmation"
          type="password"
          autoComplete="off"
          required
          onBlur={validateInput}
        ></input>
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
