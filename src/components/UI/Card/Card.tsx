import React from "react";

import styles from "./Card.module.css";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FunctionComponent<CardProps> = function (props) {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
