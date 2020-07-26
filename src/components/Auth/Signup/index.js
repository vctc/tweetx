import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import firebase from "../../Firebase";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  confirm_password: ""
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "email is required";
  }

  if (!values.password) {
    errors.password = "password is required";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "confirm password is required";
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = "password and confirm password is not same";
  }

  if (!values.name) {
    errors.name = "name is required";
  }

  return errors;
};

const Signup = () => {
  const history = useHistory();

  const [firebaseErrors, setFirebaseErrors] = useState(null);

  useEffect(() => {
    if (firebaseErrors) toast.error(firebaseErrors);
  }, [firebaseErrors]);

  const { values, handleChange, handleSubmit, errors } = useForm(
    INITIAL_VALUES,
    validate,
    onSubmit
  );

  async function onSubmit() {
    const { email, password, name } = values;

    try {
      await firebase.register(name, email, password);
      setFirebaseErrors(null);
      localStorage.setItem("tweetxUser", true);
      history.push("/feed");
    } catch (err) {
      setFirebaseErrors(err.message);
    }
  }

  const handleClick = () => {
    history.push("/login");
  };
  return (
    <div className="login">
      <div className="login__container">
        <Button
          type="button"
          onClick={handleClick}
          className="signup__button"
          ui="flat"
        >
          Login
        </Button>
        <h1 className="login__heading">Create Account</h1>
        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <Input
            placeholder="Name"
            name="name"
            values={values.names}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <Input
            placeholder="Email"
            type="email"
            name="email"
            values={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <Input
            placeholder="Password"
            type="password"
            name="password"
            values={values.password}
            onChange={handleChange}
          />

          {errors.password && <p className="error-text">{errors.password}</p>}

          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            values={values.confirm_password}
            onChange={handleChange}
          />
          {errors.confirm_password && (
            <p className="error-text">{errors.confirm_password}</p>
          )}

          <div className="login__form__footer">
            <span />
            <Button type="submit" className="login__form__button">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
