import React, { SyntheticEvent, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};
const Login: React.FunctionComponent<LoginProps> = function (props) {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      setEnteredEmail(event.target.value);

      setFormIsValid(
        event.target.value.includes("@") && enteredPassword.trim().length > 6
      );
    };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      setEnteredPassword(event.target.value);

      setFormIsValid(
        event.target.value.trim().length > 6 && enteredEmail.includes("@")
      );
    };

  const validateEmailHandler: React.EventHandler<SyntheticEvent> = function () {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler: React.EventHandler<SyntheticEvent> =
    function () {
      setPasswordIsValid(enteredPassword.trim().length > 6);
    };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = function (
    event
  ) {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
