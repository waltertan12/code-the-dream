import { useCallback, useState } from "react";
import Cart from "./Cart";
import { faker } from "@faker-js/faker";
import ProductCatalog from "./ProductCatalog";

const initialProducts = new Array(10_000).fill(null).map(() => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price()),
}));

const ProductApp = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => setCart([...cart, product]);

  return (
    <div>
      <Cart cart={cart} />
      <hr />
      <ProductCatalog products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductApp;
