import { memo, useCallback } from "react";
import { currencyFormatter } from "./utils";

const ProductDetails = ({ name, description, price, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({
      name,
      description,
      price,
    });
  };
  return (
    <div>
      <strong>{name}</strong>
      <p>{description}</p>
      <p>{currencyFormatter.format(price)}</p>
      <button onClick={handleAddToCart}>Add to Cart 🤑</button>
    </div>
  );
};

export default ProductDetails;
