import React, { SyntheticEvent, useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};
const Login: React.FunctionComponent<LoginProps> = function (props) {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      clearTimeout(timerIdentifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      setEnteredEmail(event.target.value);
    };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      setEnteredPassword(event.target.value);
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
