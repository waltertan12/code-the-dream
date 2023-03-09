import { currencyFormatter, numberFormatter } from "./utils";

const Cart = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      <p>
        Total:{" "}
        {currencyFormatter.format(
          cart.reduce((total, product) => total + product.price, 0)
        )}
      </p>
      <p>Items: {numberFormatter.format(cart.length)}</p>
    </div>
  );
};

export default Cart;
