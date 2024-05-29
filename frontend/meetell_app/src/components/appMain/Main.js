import {Fragment} from "react";
import Header from "../appHeader/Header";
import Home from "../appHome/Home";
import Start from "../appStart/Start";

function Main() {
  return (
    <Fragment>
      <Header />
      <Start />
      <Home />
    </Fragment>
  );
}

export default Main;