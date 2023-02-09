import React from "react";

import Card from "../UI/Card/Card";
import styles from "./Home.module.css";

type HomeProps = {
  onLogout: () => void;
};

const Home: React.FunctionComponent<HomeProps> = function (props) {
  return (
    <Card className={styles.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
