import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../repository/credentials";

export default function Login(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }
    else if(user.blocked === true) {
      setFields({ ...fields, password: "" });
      setErrorMessage("Your account has been blocked! ");
      return;
    }

    // Set user state.
    props.loginUser(user);
    navigate("/");
    alert("Login successful!");
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <div className="form">
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}
