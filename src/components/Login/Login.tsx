import React, {
  SyntheticEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

type LoginProps = {
  //onLogin: (enteredEmail: string, enteredPassword: string) => void;
};

type InputState = { value: string; isValid: boolean | unknown };
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
  const authCtx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState<boolean | unknown>(null);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
      //console.log("!");
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
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          id="email"
          lable="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id="password"
          lable="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
