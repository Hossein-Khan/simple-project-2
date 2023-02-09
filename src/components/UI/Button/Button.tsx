import React from "react";

import styles from "./Button.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FunctionComponent<ButtonProps> = function (props) {
  return (
    <button
      type={props.type || "button"}
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
