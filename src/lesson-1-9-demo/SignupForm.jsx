import { useEffect, useState } from "react";
import "./signup-form.css";

const SignupForm = () => {
  return (
    <form action="http://localhost:3001/api/users" method="POST">
      <label>
        <strong>Username</strong>
        <br />
        <input name="username" type="text" autoComplete="off"></input>
      </label>
      <label>
        <strong>Email</strong>
        <br />
        <input name="email" type="email" autoComplete="off"></input>
      </label>
      <label>
        <strong>Password</strong>
        <br />
        <input name="password" type="password" autoComplete="off"></input>
      </label>
      <label>
        <strong>Password Confirmation</strong>
        <br />
        <input
          name="passwordConfirmation"
          type="password"
          autoComplete="off"
        ></input>
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
