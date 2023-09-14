import React from "react";
import "../../css/pages/InfoPage.css";
import Button from "../layout/Button";

const InfoPage = () => {
  return (
    <div className="info-page">
      <div className="about">
        <h2>The team</h2>
        <div className="staff">
          <div>
            <img src="/images/member1.jpg" />
            <p>Jan Dak - Head of rustefin</p>
          </div>
          <div>
            <img src="/images/member2.jpg" />
            <p>Baas Dolf - Dolf Baas</p>
          </div>
          <div>
            <img src="/images/member3.jpg" />
            <p>Likes - Head of kwai</p>
          </div>
        </div>

        <p id="aboutText">
          DNA Kompos is a South African company dedicated to providing our
          customers with the best compost on the market. We believe that
          composting is one of the most important things we can do for the
          environment, and we are passionate about helping people grow their own
          food, reduce waste, and create a more sustainable world.
        </p>
        <h3>
          So why wait? Get started with DNA Kompos today and discover the power
          of compost!
        </h3>
        <ul className="contactInfo">
          <li>dnakompos@gmail.com</li>
          <li>084 438 6687</li>
        </ul>
      </div>
      <div className="contact">
        <div className="splash">
          <h1>Get in touch</h1>
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Email Address" name="email" />
          <textarea placeholder="Message" name="message" />
          <Button
            text="Submit"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "700",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
