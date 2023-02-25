import { useState, useEffect, useRef } from "react";

const Modal = ({ children, handleSubmit, onClose }) => {
  return (
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        ❌
      </button>
      {children}
    </div>
  );
};

const LoginForm = ({ onSubmit, autoFocus }) => {
  const emailInputRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: event.target.elements["email"].value,
      password: event.target.elements["password"].value,
    };
    onSubmit(loginData);
  };

  useEffect(() => {
    console.log({ autoFocus, emailInputRef });
    if (autoFocus && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [autoFocus, emailInputRef]);

  return (
    <>
      <h1>Login!</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="lmao@example.com"
          autocomplete="off"
          ref={emailInputRef}
        />
        <label for="password">Password</label>
        <input type="password" name="password" />
        <label for="login"></label>
        <input type="submit" name="login" value="Login" />
      </form>
    </>
  );
};

const SignupForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const signupData = {
      email: event.target.elements["email"].value,
      password: event.target.elements["password"].value,
      passwordConfirmation:
        event.target.elements["password-confirmation"].value,
    };
    onSubmit(signupData);
  };
  return (
    <>
      <h1>Signup!</h1>
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
    </>
  );
};

const ModalApp = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const handleShowLoginForm = () => {
    setShowLoginModal(true);
  };
  const handleShowSignupForm = () => {
    setShowSignupModal(true);
  };

  return (
    <div>
      <button onClick={handleShowLoginForm}>Login</button>
      <button onClick={handleShowSignupForm}>Sign up</button>
      {showLoginModal ? (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onSubmit={() => setShowLoginModal(false)} autoFocus />
        </Modal>
      ) : null}
      {showSignupModal ? (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm onSubmit={() => setShowSignupModal(false)} />
        </Modal>
      ) : null}
    </div>
  );
};

export default ModalApp;
