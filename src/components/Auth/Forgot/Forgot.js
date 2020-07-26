import React, { useState, useEffect } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import useForm from "../../hooks/useForm";
import firebase from "../../Firebase";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  email: ""
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

  return errors;
};

const Forgot = () => {
  const [firebaseErrors, setFirebaseErrors] = useState(null);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (firebaseErrors) {
      toast.error(firebaseErrors);
    }
  }, [firebaseErrors]);
  useEffect(() => {
    if (isReset) {
      toast.success("Check your email to reset your password");
    }
  }, [isReset]);

  const { values, handleChange, handleSubmit, errors } = useForm(
    INITIAL_VALUES,
    validate,
    onSubmit
  );

  async function onSubmit() {
    const { email } = values;
    try {
      await firebase.reset(email);
      setIsReset(true);
    } catch (err) {
      setFirebaseErrors(err.message);
      setIsReset(false);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__heading">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <Input
            name="email"
            onChange={handleChange}
            values={values.email}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="login__form__footer">
            <span />
            <Button type="submit" className="login__form__button">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
