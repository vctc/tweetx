import React, { useState, useEffect } from "react";
import "./login.scss";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useHistory, Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import firebase from "../../Firebase";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  email: "",
  password: ""
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "email is required";
  } else {
    const emailValid = values.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    if (!emailValid) {
      errors.email = "email is not valid";
    }
  }

  if (!values.password) {
    errors.password = "password is required";
  }

  return errors;
};

const Login = () => {
  const history = useHistory();

  const [firebaseErrors, setFirebaseErrors] = useState(null);

  useEffect(() => {
    if (firebaseErrors) {
      toast.error(firebaseErrors);
    }
  }, [firebaseErrors]);

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useForm(
    INITIAL_VALUES,
    validate,
    onSubmit
  );

  const handleClick = () => {
    history.push("/signup");
  };

  async function onSubmit() {
    const { email, password } = values;
    try {
      const response = await firebase.login(email, password);
      localStorage.setItem("tweetxUser", true);
      if (response) history.push("/feed");
    } catch (err) {
      setFirebaseErrors(err.message);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <Button
          type="button"
          onClick={handleClick}
          className="signup__button"
          ui="flat"
        >
          Create Account
        </Button>
        <h1 className="login__heading">Login</h1>
        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <Input
            name="email"
            onChange={handleChange}
            values={values.email}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <Input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            values={values.password}
            type="password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <div className="login__form__footer">
            <Link to="/forgot">Forgot Password?</Link>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="login__form__button"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
