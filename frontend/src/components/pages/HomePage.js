import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/pages/HomePage.css";
import Button from "../layout/Button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h1>The future of compost is now</h1>
        <div className="whitespace"></div>
        <p className="open-paragraph">
          DNA KOMPOS is a lorem ipsum dolor sit amet, consectetur adipiscing
          elit lorem. ipsum dolor sit amet, consectetur adipiscing el DNA KOMPOS
          is a lorem ipsum dolor sit amet, consectetur adipiscing elit lorem.
          ipsum dolor sit amet, consectetur adipiscing el
        </p>
        <div className="calltoaction">
          <Button
            text="Buy now"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "700",
            }}
            onClick={() => {
              navigate("/product");
            }}
          />
          <Button
            text="Contact us"
            style={{
              backgroundColor: "#F5F9FC",
              color: "black",
              fontWeight: "700",
            }}
            onClick={() => {
              navigate("/info");
            }}
          />
        </div>
      </div>

      <div className="hero_image">
        <img src="/images/hero.png" />
      </div>
    </div>
  );
};

export default HomePage;
