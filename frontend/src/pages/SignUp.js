import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser, findUser } from "../repository/credentials";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "", password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({ });

  const today = new Date().toDateString();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, firstname: fields.firstname, lastname: fields.lastname, password: fields.password, confirmPassword: fields.confirmPassword};
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // console.log(trimmedFields);
    // Create user.
    const user = {
      username: fields.username, 
      first_name: fields.firstname, 
      last_name: fields.lastname, 
      password: fields.password, 
      joining_date: today, 
      curr_cart: 0
    }
    
    await createUser(user);

    // Set user state.
    props.loginUser(user);
    navigate("/profile");
    alert("Sign up successful!");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "username";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <div className="form">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
              {errors.username &&
                <div className="text-danger">{errors.username}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">First name</label>
              <input name="firstname" id="firstname" className="form-control"
                value={fields.firstname} onChange={handleInputChange} />
              {errors.firstname &&
                <div className="text-danger">{errors.firstname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="control-label">Last name</label>
              <input name="lastname" id="lastname" className="form-control"
                value={fields.lastname} onChange={handleInputChange} />
              {errors.lastname &&
                <div className="text-danger">{errors.lastname}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password <small className="text-muted">must be at least 6 characters</small>
              </label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
              {errors.password &&
                <div className="text-danger">{errors.password}</div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} />
              {errors.confirmPassword &&
                <div className="text-danger">{errors.confirmPassword}</div>
              }
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary mr-5" value="Register" />
              <Link className="btn btn-outline-dark" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
