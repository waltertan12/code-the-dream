import { useEffect, useState } from "react";
import "./signup-form.css";

const SignupForm = () => {
  return (
    <form action="http://localhost:3001/api/users" method="POST">
      <label>
        <strong>Username</strong>
        <br />
        <input name="username" type="text" autocomplete="false"></input>
      </label>
      <label>
        <strong>Email</strong>
        <br />
        <input name="email" type="email" autocomplete="false"></input>
      </label>
      <label>
        <strong>Password</strong>
        <br />
        <input name="password" type="password" autocomplete="false"></input>
      </label>
      <label>
        <strong>Password Confirmation</strong>
        <br />
        <input name="passwordConfirmation" type="password"></input>
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
