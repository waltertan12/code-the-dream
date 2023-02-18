import { useState, useEffect } from "react";

const LoginForm = ({ onClose, onSubmit }) => {
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        ❌
      </button>
      <h1>Login!</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="lmao@example.com"
          autocomplete="off"
        />
        <label for="password">Password</label>
        <input type="password" name="password" />
        <label for="password">Password Confirmation</label>
        <input type="password" name="password-confirmation" />
        <label for="login"></label>
        <input type="submit" name="login" value="Login" />
      </form>
    </div>
  );
};

const ModalApp = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };
  return (
    <div>
      <button onClick={handleShowLoginForm}>Login</button>
      <button onClick={() => console.log("Signing up")}>Sign up</button>
      {showLoginForm ? (
        <LoginForm
          onSubmit={() => setShowLoginForm(false)}
          onClose={() => setShowLoginForm(false)}
        />
      ) : null}
    </div>
  );
};

export default ModalApp;
