import React from "react";
import img404 from "../../../assets/images/404.png";
import "./lost.scss";

const Lost = () => {
  return (
    <div className="lost flex flex-ai-c flex-jc-c">
      <div>
        <img src={img404} alt="404"></img>
      </div>
    </div>
  );
};

export default Lost;
