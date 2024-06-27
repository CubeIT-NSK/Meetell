import {Fragment} from "react";
import Home from "../appHome/Home";
import Start from "../appStart/Start";

function Main({ setRate }) {
  return (
    <Fragment>
      <Start />
      <Home setRate={setRate}/>
    </Fragment>
  );
}

export default Main;