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

const initialFormState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupForm = () => {
  const [formState, setFormState] = useState(initialFormState);
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
  const handleFormChange = (event) => {
    console.log({
      target: event.target,
      name: event.target.name,
      value: event.target.value,
    });
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const validateInput = (event) => {
    // TODO: Implement validation
  };
  const isFormComplete = () => {
    return Object.keys(formState).every((key) => {
      return formState[key] !== initialFormState[key];
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <strong>Username</strong>
        <br />
        <input
          name="username"
          type="text"
          autoComplete="off"
          value={formState.username}
          onChange={handleFormChange}
        ></input>
      </label>
      <label>
        <strong>Email</strong>
        <br />
        <input
          name="email"
          type="email"
          autoComplete="off"
          onBlur={validateInput}
          value={formState.email}
          onChange={handleFormChange}
        ></input>
      </label>
      <label>
        <strong>Password</strong>
        <br />
        <input
          name="password"
          type="password"
          autoComplete="off"
          onBlur={validateInput}
          value={formState.password}
          onChange={handleFormChange}
        ></input>
      </label>
      <label>
        <strong>Password Confirmation</strong>
        <br />
        <input
          name="passwordConfirmation"
          type="password"
          autoComplete="off"
          onBlur={validateInput}
          value={formState.passwordConfirmation}
          onChange={handleFormChange}
        ></input>
      </label>
      <button type="submit" disabled={!isFormComplete()}>
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
