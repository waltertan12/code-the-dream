import React, { useEffect, useState } from "react";
import {
  listProducts,
  Product,
  ListProductResponse,
  SORT_BYS,
  SORT_DIRECTIONS,
  ASC,
  PAGE_SIZES,
} from "./ProductApi";
import ProductRow from "./ProductRow";

const ServerSidePagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    listProducts()
      .then((response: ListProductResponse) => {
        if (ignore) {
          return;
        }
        setProducts(response.data);
      })
      .catch((error) => {
        if (ignore) {
          return;
        }
        setError(error);
      })
      .finally(() => {
        if (ignore) {
          return;
        }
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Unable to load products 😭</p>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => {
          return <ProductRow product={product} key={product.id} />;
        })}
      </ul>
      <div>
        <label>
          Page Size
          <select>
            {PAGE_SIZES.map((pageSize) => {
              return (
                <option value={pageSize} key={pageSize}>
                  {pageSize}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Sort By
          <select>
            {SORT_BYS.map((sortBy) => {
              return (
                <option value={sortBy} key={sortBy}>
                  {sortBy}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Sort Direction
          <select>
            {SORT_DIRECTIONS.map((sortDirection) => {
              return (
                <option value={sortDirection} key={sortDirection}>
                  {sortDirection === ASC ? "🔼" : "🔽"}
                </option>
              );
            })}
          </select>
        </label>
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default ServerSidePagination;
