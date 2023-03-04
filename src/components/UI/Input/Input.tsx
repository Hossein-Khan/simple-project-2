import React, {
  forwardRef,
  SyntheticEvent,
  useImperativeHandle,
  useRef,
} from "react";

import classes from "./Input.module.css";

type InputProps = {
  isValid: boolean | unknown;
  type: string;
  id: string;
  lable: string;
  value: string;
  className?: string;
  onChange: React.ChangeEventHandler;
  onBlur: React.EventHandler<SyntheticEvent>;
};

type refType = { focus: () => void };

const Input = forwardRef<refType, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const activate = function () {
    inputRef.current?.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid || props.isValid === null ? "" : classes.invalid
      }`}
    >
      <label htmlFor={props.id}>{props.lable}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
