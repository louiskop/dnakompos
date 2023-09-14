import React from "react";
import "../../css/pages/ProductPage.css";
import Button from "../layout/Button";

const ProductPage = (props) => {
  return (
    <div className="product-page">
      <div className="product">
        <div className="product-img">
          <img src="/images/product.png" />
        </div>
        <div className="product-details">
          <h1>20kg compost bag</h1>
          <h1>R 1 000</h1>
          <h1>Description</h1>
          <p>
            Non laboris ullamco occaecat amet ad Lorem nostrud cupidatat est
            incididunt magna laboris. Consectetur ipsum sint aliqua anim tempor
            ullamco esse non aute culpa proident exercitation consectetur. Sint
            ipsum magna mollit adipisicing exercitation aute aliqua aliqua
            consequat culpa do. Officia irure ex nisi ad nulla cupidatat aliquip
            dolore. Id ipsum adipisicing excepteur quis et est ad incididunt sit
            mollit nulla nulla eu amet. Tempor velit velit deserunt dolore
            labore.
          </p>
          <Button text="Add to cart" />
        </div>
      </div>
      <div className="catalog">{/* Slider for products */}</div>
    </div>
  );
};

export default ProductPage;
