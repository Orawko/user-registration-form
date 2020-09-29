import React, {useState} from "react";
import "./styles.css";

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEXP = /^(?=^.{6,}$)(?=.*[a-z])(?=.*[A-Z]).*$/;
const FIELD_ERROR = {
  firstName: "If specified, should be at least 3 character long",
  username: "Minimum 3 characters required",
  password: "Password must be at least 6 character long and have one capital letter",
  repeatPassword: "Passwords must be identical",
  email: "It is not a valid email address"
}
const SUBMIT_MESSAGE = {
  error: "Fill in all required fields",
  success: "Register successful!"
}

export const validateEmail = email => EMAIL_REGEXP.test(String(email).toLowerCase());

export const validatePassword = password => PASSWORD_REGEXP.test(String(password));

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fieldsStatus, setFieldsFilled] = useState(null);
  const [formErrors, setErrors] = useState({
    firstName: "",
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
  });

  const handleChange = event => {
    event.preventDefault();
    const {name, value} = event.target;

    let formErrorsTmp = formErrors;
    switch (name) {
      case "firstName":
        formErrorsTmp.firstName = value.length === 0 || value.length >= 3 ? "" : FIELD_ERROR.firstName;
        setFirstName(value);
        break;
      case "username":
        formErrorsTmp.username = value.length >= 3 ? "" : FIELD_ERROR.username;
        setUsername(value);
        break;
      case "password":
        formErrorsTmp.password = validatePassword(value) ? "" : FIELD_ERROR.password;
        setPassword(value);
        break;
      case "repeatPassword":
        formErrorsTmp.repeatPassword = value === password ? "" : FIELD_ERROR.repeatPassword;
        setRepeatPassword(value);
        break;
      case "email":
        setEmail(value);
        formErrorsTmp.email = validateEmail(value) ? "" : FIELD_ERROR.email;
        break;
      default:
        break;
    }

    setErrors(formErrorsTmp);
  }

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setFirstName("");
  }

  const checkFieldsErrors = () => Object.values(formErrors).every(fieldError => fieldError.length === 0);

  const checkFieldsFilled = () =>
    username.length > 0
    && password.length > 0
    && repeatPassword.length > 0
    && email.length > 0;

  const showSuccessMessage = () => {
    setFieldsFilled("ok");

    console.log(`
        Creating new account:
        
        First name: ${firstName ? firstName : "not specified"}
        Username: ${username}
        Password: ${password}
        Email: ${email} 
      `);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setFieldsFilled(checkFieldsFilled())

    if (checkFieldsErrors() && checkFieldsFilled()) {
      clearFields();
      setTimeout(showSuccessMessage, 1000);
    } else {
      console.error('Form invalid');
    }
  }

  return (
    <form onSubmit={handleSubmit} id="client" className="form">
      <h1>Sign up</h1>

      <label className="label">First name - Optional</label>
      <input
        className={formErrors.firstName.length > 0 ? "error-input-field input" : "input"}
        type="text"
        name="firstName"
        onChange={handleChange}
        value={firstName}
      />
      {formErrors.firstName.length > 0 && <span className="error-message">{formErrors.firstName}</span>}

      <label className="label"> Username </label>
      <input
        className={formErrors.username.length > 0 ? "error-input-field input" : "input"}
        type="text"
        name="username"
        onChange={handleChange}
        value={username}
      />
      {formErrors.username.length > 0 && <span className="error-message">{formErrors.username}</span>}

      <label className="label"> Password </label>
      <input
        className={formErrors.password.length > 0 ? "error-input-field input" : "input"}
        type="password"
        name="password"
        onChange={handleChange}
        value={password}
      />
      {formErrors.password.length > 0 && <span className="error-message">{formErrors.password}</span>}

      <label className="label"> Repeat password </label>
      <input
        className={formErrors.repeatPassword.length > 0 ? "error-input-field input" : "input"}
        type="password"
        name="repeatPassword"
        onChange={handleChange}
        value={repeatPassword}
      />
      {formErrors.repeatPassword.length > 0 && <span className="error-message">{formErrors.repeatPassword}</span>}

      <label className="label"> Email </label>
      <input
        className={formErrors.email.length > 0 ? "error-input-field input" : "input"}
        type="email"
        name="email"
        onChange={handleChange}
        value={email}
      />
      {formErrors.email.length > 0 && <span className="error-message">{formErrors.email}</span>}
      <br/>

      <button className="submitButton" type="submit">Submit</button>

      {fieldsStatus === false && <span className="error-message">{SUBMIT_MESSAGE.error}</span>}
      {fieldsStatus === "ok" && <span className="success-message">{SUBMIT_MESSAGE.success}</span>}

    </form>
  );
}
