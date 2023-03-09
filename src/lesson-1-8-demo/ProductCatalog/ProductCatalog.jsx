import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { numberFormatter } from "./utils";
import ProductDetails from "./ProductDetails";
import Search from "./Search";

const PAGE_SIZES = [1, 5, 10, 50, 100, 500, 1000, 5000, 10_000];

const ProductCatalog = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cursor, setCursor] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const filteredProducts = products.filter(
    (product) =>
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handlePrev = () => {
    const prevCursor = cursor - pageSize;
    if (prevCursor > products.length) {
      setCursor(products.length);
    } else if (prevCursor < 0) {
      setCursor(0);
    } else {
      setCursor(prevCursor);
    }
  };
  const handleNext = () => {
    const nextCursor = cursor + pageSize;
    if (nextCursor > products.length) {
      setCursor(products.length);
    } else if (nextCursor < 0) {
      setCursor(0);
    } else {
      setCursor(nextCursor);
    }
  };
  const handlePageSizeChange = (event) => setPageSize(event.target.value);
  const handleSearchTerm = (searchTerm) => setSearchTerm(searchTerm);

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={handleSearchTerm} />
      <hr />
      <h2>
        Products ({numberFormatter.format(filteredProducts.length)} results)
      </h2>
      <div>
        {filteredProducts
          .slice(cursor, cursor + pageSize)
          .map((product, index) => (
            <ProductDetails
              {...product}
              key={index}
              onAddToCart={onAddToCart}
            />
          ))}
      </div>
      <button onClick={handlePrev} disabled={cursor <= 0}>
        Prev ️⬅️
      </button>
      <button onClick={handleNext} disabled={cursor >= products.length}>
        Next ➡️
      </button>
      <p>
        Page {numberFormatter.format(Math.floor(cursor / pageSize))} of{" "}
        {numberFormatter.format(Math.floor(products.length / pageSize))}
      </p>
      <label>
        Items per page
        <select value={pageSize} onChange={handlePageSizeChange}>
          {PAGE_SIZES.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {numberFormatter.format(pageSize)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default memo(ProductCatalog);
