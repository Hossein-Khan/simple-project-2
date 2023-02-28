import React, { SyntheticEvent, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};

type InputState = { value: string; isValid: boolean | "INITIAL" };
type InputAction =
  | { type: "INPUT_BLUR" }
  | { type: "USER_INPUT"; value: string };

const emailReducer = function (
  state: InputState,
  action: InputAction
): InputState {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.includes("@") };
    //break;
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    //break;
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = function (
  state: InputState,
  action: InputAction
): InputState {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.length > 6 };
    //break;
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.length > 6 };
    //break;
    default:
      return { value: "", isValid: false };
  }
};

const Login: React.FunctionComponent<LoginProps> = function (props) {
  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState<boolean | "INITIAL">(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: "INITIAL",
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: "INITIAL",
  });

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormIsValid(
        (emailState.isValid === "INITIAL" &&
          passwordState.isValid === "INITIAL") ||
          (emailState.isValid && passwordState.isValid)
      );
      console.log("!");
    }, 300);
    return () => {
      clearTimeout(timerIdentifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      emailDispatch({ type: "USER_INPUT", value: event.target.value });
    };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (event) {
      passwordDispatch({ type: "USER_INPUT", value: event.target.value });
    };

  const validateEmailHandler: React.EventHandler<SyntheticEvent> = function () {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler: React.EventHandler<SyntheticEvent> =
    function () {
      passwordDispatch({ type: "INPUT_BLUR" });
    };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = function (
    event
  ) {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid ? "" : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid ? "" : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
