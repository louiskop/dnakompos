import React from "react";
import "../../css/layout/Button.css";

const Button = (props) => {
  return (
    <div className="button" onClick={props.onClick} style={props.style}>
      <p>{props.text}</p>
    </div>
  );
};

export default Button;
