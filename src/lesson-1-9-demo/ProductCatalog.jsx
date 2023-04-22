import { useState, useEffect } from "react";
import LoadingSpinner from "../lesson-1-8-demo/LoadingSpinner";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const listProducts = async (pageSize, cursor) => {
  const url = new URL("http://localhost:3001/api/v1/products");
  url.searchParams.append("limit", pageSize);
  if (cursor !== null) {
    url.searchParams.append("cursor", cursor);
  }
  const response = await fetch(url);
  return response.json();
};

const ProductCatalog = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const loadData = async () => {
      try {
        const response = await listProducts(pageSize, null);
        if (ignore) {
          return console.log({
            message: "Ignoring response",
            ignore,
            response,
          });
        }

        console.log({ response });
        setIsLoading(false);
        setProducts(response.data);
        setNextCursor(response.nextCursor);
        setPrevCursor(response.prevCursor);
      } catch (error) {
        if (ignore) {
          return console.log({ message: "Ignoring error", ignore, error });
        }
        console.error({ error });
        setError(error);
        setIsLoading(false);
      }
    };
    loadData();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    setIsLoading(true);
    listProducts(pageSize, prevCursor)
      .then((response) => {
        console.log({ response });
        setIsLoading(false);
        setProducts(response.data);
        setNextCursor(response.nextCursor);
        setPrevCursor(response.prevCursor);
      })
      .catch((error) => {
        console.error({ error });
        setIsLoading(false);
        setError(error);
      });
  };
  const handleNext = () => {
    setIsLoading(true);
    listProducts(pageSize, nextCursor)
      .then((response) => {
        console.log({ response });
        setIsLoading(false);
        setProducts(response.data);
        setNextCursor(response.nextCursor);
        setPrevCursor(response.prevCursor);
      })
      .catch((error) => {
        console.error({ error });
        setIsLoading(false);
        setError(error);
      });
  };

  if (error) {
    return <div>Unable to load products. Please refresh the page ♻️</div>;
  }

  if (isLoading) {
    return <LoadingSpinner variant="ellipses" />;
  }

  return (
    <div>
      <div>
        {products.map(({ id, name, description, price }, index) => (
          <div key={id + index}>
            <strong>{name}</strong>
            <p>{description}</p>
            <p>{currencyFormatter.format(price)}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrev} disabled={prevCursor === null}>
        Prev ️⬅️
      </button>
      <button onClick={handleNext} disabled={nextCursor === null}>
        Next ➡️
      </button>
    </div>
  );
};

export default ProductCatalog;
