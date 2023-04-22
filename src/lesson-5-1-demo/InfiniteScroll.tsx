import React, { useCallback, useEffect, useRef, useState } from "react";
import { listProducts, Product, ListProductResponse } from "./ProductApi";
import ProductRow from "./ProductRow";

const InfiniteScroll = () => {
  const observer = useRef<IntersectionObserver>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  useEffect(() => {
    let ignore = false;
    setError(undefined);
    setLoading(true);
    listProducts(undefined, 10)
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
  const lastElementRef = useCallback(
    (element: HTMLDivElement) => {
      //element is the last React element being referenced

      // disconnect observer set on previous last element
      if (observer.current) {
        observer.current.disconnect();
      }

      // if there's no more data to be fetched, don't create a new observer
      if (!nextCursor) {
        return;
      }

      // create a new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          console.log("load more");
          setLoading(true);
          setError(undefined);
          listProducts(nextCursor ?? undefined, 5)
            .then((response: ListProductResponse) => {
              setProducts((currentProducts) => [
                ...currentProducts,
                ...response.data,
              ]);
              setNextCursor(response.nextCursor);
            })
            .catch((error) => {
              setError(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });

      // observe the last element
      if (element) {
        observer.current.observe(element);
      }
    },
    [nextCursor]
  );

  return (
    <div>
      <ul style={{ padding: 0 }}>
        {products.map((product, index) => {
          return (
            <ProductRow
              ref={index === products.length - 1 ? lastElementRef : undefined}
              product={product}
              key={product.id}
            />
          );
        })}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error 😭</p>}
    </div>
  );
};

export default InfiniteScroll;
