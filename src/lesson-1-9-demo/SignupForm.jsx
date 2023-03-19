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
  const [formErrors, setFormErrors] = useState({});

  const validations = [
    {
      key: "username",
      isValid: (formState) => formState.username.trim().length > 0,
      errorMessage: "username cannot be blank",
    },
    {
      key: "email",
      isValid: (formState) =>
        formState.email.length > 0 &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.email),
      errorMessage: "email is not valid",
    },
    {
      key: "password",
      isValid: (formState) => {
        return (
          formState.password.length > 12 &&
          /[a-z]/.test(formState.password) &&
          /[A-Z]/.test(formState.password) &&
          /[0-9]/.test(formState.password) &&
          /[!@#$%^&*]/.test(formState.password)
        );
      },
      errorMessage: "password is not valid",
    },
    {
      key: "passwordConfirmation",
      isValid: (formState) => {
        console.log(formState.password, formState.passwordConfirmation);
        return formState.password === formState.passwordConfirmation;
      },
      errorMessage: "password confirmation does not match password",
    },
  ];
  const validateFormState = (formState) => {
    const errors = {};
    validations.forEach((validation) => {
      const isValid = validation.isValid(formState);
      if (!isValid) {
        errors[validation.key] = validation.errorMessage;
      }
    });

    return errors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const errors = validateFormState(formState);
      setFormErrors(errors);
      // If there are any errors, set the errors and stop form submission
      if (Object.keys(errors).length > 0) {
        return;
      }
      const user = await createUser(formState);

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
        {formErrors.username ? (
          <p className="error">{formErrors.username}</p>
        ) : null}
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
        {formErrors.email ? <p className="error">{formErrors.email}</p> : null}
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
        {formErrors.password ? (
          <p className="error">{formErrors.password}</p>
        ) : null}
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
        {formErrors.passwordConfirmation ? (
          <p className="error">{formErrors.passwordConfirmation}</p>
        ) : null}
      </label>
      <button type="submit" disabled={!isFormComplete()}>
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
