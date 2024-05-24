import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { verifyUser, findUser, updateUser, deleteUser } from "../repository/credentials";
//import { getUsers, getEmail, updateUsername, updatePassword, deleteUser, getJoiningDate } from "../repository/credentials";
import profilePic from "../icons/usericon.jpg"; 
import deleteButton from "../icons/deleteicon.png"; 
import editName from "../icons/editicon.png";
import changePassword from "../icons/editpw.png";

export default function MyProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(); 
  const [isLoading, setIsLoading] = useState(true);
  const [enErrors, setENErrors] = useState({ });
  const [cpErrors, setCPErrors] = useState({ });
  const [nameFields, setNameFields] = useState({first_name: "", last_name: "", password: ""});
  const [passwordFields, setPasswordFields] = useState({oldPassword: "", newPassword: "", repeatPassword: ""});
  const [enShown, setENShown] = useState(false);   // Edit Name section
  const [cpShown, setCPShown] = useState(false);   // Change Password section

  useEffect(() => {
    async function loadUser() {
      const currentUser = await findUser(props.user.username);

      setUser(currentUser);
      // console.log(currentProducts);
      setIsLoading(false);
    }

    loadUser();
  }, []);

  const showEditName = () => {
    //event.preventDefault();
    setENShown(true);
    setCPShown(false);
  }

  const hideEditName = () => {
    setENShown(false);
  }

  const showChangePassword = () => {
    setCPShown(true);
    setENShown(false);
  }

  const hideChangePassword = () => {
    setCPShown(false);
  }

  const hideEdits = () => {
    setENShown(false);
    setCPShown(false);
  }
  
  // -----------------------------------------------------------------------Edit Name Section -----------------------------------------------------------------------------------------------------
  // Generic change handler.
  const handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy nameFields.
    const temp = { first_name: nameFields.first_name, last_name: nameFields.last_name, password: nameFields.password };
    // OR use spread operator.
    // const temp = { ...usernameFields };

    // Update field and state.
    temp[name] = value;
    setNameFields(temp);
  }

  const handleNameSubmit = async (event) => {
    event.preventDefault();
    
    const { trimmedNameFields, isValid } = await handleNameValidation();
    if(!isValid)
      return;

    const user = {
      username:props.user.username, 
      password:props.user.password,
      first_name:trimmedNameFields.first_name, 
      last_name:trimmedNameFields.last_name, 
      joining_date:props.user.joining_date, 
      curr_cart: props.user.curr_cart
    }
    await updateUser(user);

    props.logoutUser();
    props.loginUser(user);   // Login with the new name to update all the names on the pages
    setUser(user); 

    const temp = { ...nameFields };
    temp.first_name = ""; 
    temp.last_name = "";
    temp.password = "";
    setNameFields(temp);

    setENShown(false);
    // navigate("/");
    // navigate("/profile");
    alert("Name change successful!");
    
  }

  const handleNameValidation = async () => {
    const trimmedNameFields = trimNameFields();
    const currentErrors = { };

    console.log(trimmedNameFields);

    let key = "first_name";
    let field = trimmedNameFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "last_name";
    field = trimmedNameFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedNameFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(await verifyUser(props.user.username, field) === null)
      currentErrors[key] = "Password is incorrect."; 

    setENErrors(currentErrors);

    return { trimmedNameFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimNameFields = () => {
    const trimmedNameFields = { };
    Object.keys(nameFields).map(key => trimmedNameFields[key] = nameFields[key].trim());
    setNameFields(trimmedNameFields);

    return trimmedNameFields;
  };

  //------------------------------------------------------------Change Password Section---------------------------------------------------------------------------------------------------------------------
  const handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy Fields.
    const temp = { oldPassword: passwordFields.oldPassword, newPassword: passwordFields.newPassword, repeatPassword: passwordFields.repeatPassword };

    // Update field and state.
    temp[name] = value;
    setPasswordFields(temp);
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    const { trimmedPasswordFields, isValid } = await handlePasswordValidation();
    if(!isValid)
      return;

    console.log(trimmedPasswordFields.newPassword);

    const user = {
      username:props.user.username, 
      password:trimmedPasswordFields.newPassword,
      first_name:props.user.first_name, 
      last_name:props.user.last_name, 
      joining_date:props.user.joining_date, 
      curr_cart: props.user.curr_cart
    }
    const np = await updateUser(user);
    console.log(np);

    props.logoutUser();
    props.loginUser(user);   
    setUser(user); 

    const temp = { ...passwordFields };
    temp.oldPassword = ""; 
    temp.newPassword = "";
    temp.repeatPassword = "";
    setPasswordFields(temp);

    setCPShown(false);
    // navigate("/");
    // navigate("/profile");
    alert("Password change successful!");
    
  }

  const handlePasswordValidation = async () => {
    const trimmedPasswordFields = trimPasswordFields();
    const currentErrors = { };

    let key = "oldPassword";
    let field = trimmedPasswordFields[key];
    if(field.length === 0)
      currentErrors[key] = "Please enter old password.";
    else if(await verifyUser(props.user.username, field) === null)
      currentErrors[key] = "Password is incorrect."; 

    key = "newPassword"; 
    field = trimmedPasswordFields[key]; 
    if(field.length === 0)
      currentErrors[key] = "Please enter new password.";
    // else if (!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/.test(field))
    //   currentErrors[key] = "Password must be 8-32 characters, has at least 3 lower letters, at least 2 capital letters, at least 2 numbers, and 1 special character (!@#$&*). ";

    key = "repeatPassword"; 
    field = trimmedPasswordFields[key]; 
    if(field.length === 0)
      currentErrors[key] = "Please repeat new password."; 
    else if(field !== trimmedPasswordFields["newPassword"])
      currentErrors[key] = "Repeat password does not match new password"; 

    setCPErrors(currentErrors);

    return { trimmedPasswordFields, isValid: Object.keys(currentErrors).length === 0 };
  }

  const trimPasswordFields = () => {
    const trimmedPasswordFields = { };
    Object.keys(passwordFields).map(key => trimmedPasswordFields[key] = passwordFields[key].trim());
    setPasswordFields(trimmedPasswordFields);

    return trimmedPasswordFields;
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const deleteAcc = async (event) => {
    event.preventDefault();
    console.log(props.user.username);
    await deleteUser(props.user.username);
    props.logoutUser();
    
    navigate("/signup");
    alert("Your account has been deleted!"); 
  }

  return (
    <div className="main">
      <h1>My Profile</h1>
      <img src={profilePic} className="profileicon" alt="profilepic"/>
        {isLoading === false &&
          <>
            <h4><strong>{user.username}</strong></h4>
            <div>{user.first_name} {user.last_name}</div>
            <div>Date of Joining: {user.joining_date}</div>
          </>
        }
      <br/><button onClick={showEditName}><img src={editName} className="smallicon" alt="editName"/>Edit Name</button>
      <button onClick={showChangePassword}><img src={changePassword} className="smallicon" alt="changePassword"/>Change Password</button>
      <Popup trigger={
      <button onClick={hideEdits}><img src={deleteButton} className="smallicon" alt="delete"/>Delete Account</button>}>
        {
          close => (
            <div className="main">
              Are you sure you want to delete this account? 
              <button type="button" onClick={deleteAcc}>
                Yes
              </button>
              <button type="button" onClick={() => close()}>
                Cancel
              </button>
            </div>
          )
        }
      </Popup>
      {enShown &&
        <div className="form">
          <div className="col-md-5">
            <form onSubmit={handleNameSubmit}>
              <h1>Edit Name</h1>
              <div className="form-group">
                <label htmlFor="firs_tname" className="control-label">New First Name</label>                            
                <input name="first_name" id="first_name" className="form-control"
                value={nameFields.first_name} onChange={handleNameChange} />
                {enErrors.first_name &&
                  <div className="text-danger">{enErrors.first_name}</div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="last_name" className="control-label">New Last Name</label>                            
                <input name="last_name" id="last_name" className="form-control"
                value={nameFields.last_name} onChange={handleNameChange} />
                {enErrors.last_name &&
                  <div className="text-danger">{enErrors.last_name}</div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label">Enter Password</label>                            
                <input type="password" name="password" id="password" className="form-control"
                value={nameFields.password} onChange={handleNameChange} />
                {enErrors.password &&
                  <div className="text-danger">{enErrors.password}</div>
                }
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary mr-3" value="Submit" />
                <button className="btn btn-danger" onClick={hideEditName}>Cancel</button>
              </div>
{/*               
              {errorMessage !== null &&
                <div className="form-group">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              }       */}
            </form>
          </div>
        </div>
      }
      {cpShown &&
        <div className="form">
          <div className="col-md-5">
            <form onSubmit={handlePasswordSubmit}>
              <h1>Change Password</h1>
              <div className="form-group">
                <label htmlFor="oldPassword" className="control-label">Enter Current Password</label>                            
                <input type="password" name="oldPassword" id="oldPassword" className="form-control"
                value={passwordFields.oldPassword} onChange={handlePasswordChange} />
                {cpErrors.oldPassword &&
                  <div className="text-danger">{cpErrors.oldPassword}</div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="newPassword" className="control-label">New Password</label>                            
                <input type="password" name="newPassword" id="newPassword" className="form-control"
                value={passwordFields.newPassword} onChange={handlePasswordChange} />
                {cpErrors.newPassword &&
                  <div className="text-danger">{cpErrors.newPassword}</div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="repeatPassword" className="control-label">Repeat Password</label>                            
                <input type="password" name="repeatPassword" id="repeatPassword" className="form-control"
                value={passwordFields.repeatPassword} onChange={handlePasswordChange} />
                {cpErrors.repeatPassword &&
                  <div className="text-danger">{cpErrors.repeatPassword}</div>
                }
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary mr-3" value="Submit" />
                <button className="btn btn-danger" onClick={hideChangePassword}>Cancel</button>
              </div> 
            </form>
          </div>
        </div>
      }
    </div>
  );
}
