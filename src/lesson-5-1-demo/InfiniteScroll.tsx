import React, { useCallback, useEffect, useRef, useState } from "react";
import { listProducts, Product, ListProductResponse } from "./ProductApi";
import ProductRow from "./ProductRow";

interface InfiniteScrollProps {
  useLoadMore: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ useLoadMore }) => {
  const observer = useRef<IntersectionObserver>();
  // async data fetching variables
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  // paging data
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
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const response = await listProducts(nextCursor ?? undefined, 5);
      setProducts((currentProducts) => [
        ...currentProducts,
        // Append the latest product data to the products array
        ...response.data,
      ]);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error({ error });
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error("Unable to load products"));
      }
    } finally {
      setLoading(false);
    }
  };
  const lastElementRef = useCallback(
    // element is the last <ProductRow /> being referenced
    (element: HTMLDivElement) => {
      if (useLoadMore) {
        return;
      }

      // disconnect observer set on previous last element
      if (observer.current) {
        observer.current.disconnect();
      }

      // if there's no more data to be fetched, don't create a new observer
      if (!nextCursor) {
        return;
      }

      // create a new observer
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          handleLoadMore();
        }
      });

      // observe the last element
      if (element) {
        observer.current.observe(element);
      }
    },
    [useLoadMore, nextCursor]
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
      {useLoadMore && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
};

export default InfiniteScroll;
