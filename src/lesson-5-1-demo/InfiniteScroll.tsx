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

const InfiniteScroll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  useEffect(() => {
    let ignore = false;
    setError(undefined);
    setLoading(true);
    listProducts(undefined, 3)
      .then((response: ListProductResponse) => {
        if (ignore) {
          return;
        }
        setProducts(response.data);
        setNextCursor(response.nextCursor);
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
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        setError(undefined);
        setLoading(true);
        listProducts(nextCursor ?? undefined, 3)
          .then((response: ListProductResponse) => {
            setLoading(false);
            setProducts([...products, ...response.data]);
            setNextCursor(response.nextCursor);
          })
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      console.log("unmounting???");
      window.removeEventListener("scroll", onScroll);
    };
  }, [nextCursor]);

  return (
    <div>
      <ul>
        {products.map((product) => {
          return <ProductRow product={product} key={product.id} />;
        })}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error 😭</p>}
    </div>
  );
};

export default InfiniteScroll;
