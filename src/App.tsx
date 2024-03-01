import { FormEvent, useState } from "react";
import "./App.css";

/**
 * Example sign up form
 */
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const checkErrors = () => {
    const err = [];
    if (!username?.length || username.length < 4) {
      err.push("Your username must be at least 4 characters long.");
    }

    if (!password?.length || password.length < 6) {
      err.push("Your password must be at least 6 characters long.");
    } else if (password !== passwordConfirm) {
      err.push("Password and Confirm Password must match.");
    }

    return err;
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = checkErrors();
    setErrors(errors);

    if (!errors.length) {
      // Mocking a submission here - some kind of fetch to the server.
      // Alert interrupts the state change but just used for demonstration.
      const postNewUser = new Promise((resolve) => {
        resolve(true);
      });

      postNewUser.then(() => {
        setSignedUp(true);
        setUsername("");
        setPassword("");
        setPasswordConfirm("");
      });
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="card">
        <h1 className="create-account-heading">Welcome!</h1>
        {!signedUp && (
          <form onSubmit={submitForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="signup-input"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="signup-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                className="signup-input"
                id="confirm-password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>
            <button>Sign Up</button>
          </form>
        )}
        {signedUp && (
          <div className="signup-confirmed">Thank you for signing up! 🎉</div>
        )}
        <ul className="error-container">
          {errors.map((error) => {
            return <li>{error}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
