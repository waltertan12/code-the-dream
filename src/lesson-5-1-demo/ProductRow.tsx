import React from "react";
import { Product } from "./ProductApi";
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <div
      key={product.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <strong>{product.name}</strong>
      <p>{product.description}</p>
      <p>{currencyFormatter.format(product.price)}</p>
    </div>
  );
};

export default ProductRow;
