import React, { useEffect, useState } from "react";
import {
  ASC,
  ListProductResponse,
  PAGE_SIZES,
  Product,
  SORT_BY_ID,
  SortBy,
  SortDirection,
  listProducts,
} from "./ProductApi";
import ProductRow from "./ProductRow";
import { CursorPagination } from "./ProductPagination";

const ServerSidePagination = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [cursor, setCursor] = useState<string | undefined>();
  const [previousCursor, setPreviousCursor] = useState<string | undefined>();
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
  const [sortBy, setSortBy] = useState<SortBy>(SORT_BY_ID);
  const [sortDirection, setSortDirection] = useState<SortDirection>(ASC);
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    listProducts(cursor, pageSize, sortBy, sortDirection)
      .then((response: ListProductResponse) => {
        if (ignore) {
          return;
        }
        setPreviousCursor(response.prevCursor ?? undefined);
        setNextCursor(response.nextCursor ?? undefined);
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
  }, [cursor, pageSize, sortBy, sortDirection]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Unable to load products 😭</p>;
  }

  return (
    <div>
      <ul style={{ padding: 0 }}>
        {products.map((product) => {
          return <ProductRow product={product} key={product.id} />;
        })}
      </ul>
      <CursorPagination
        pageSize={pageSize}
        sortBy={sortBy}
        sortDirection={sortDirection}
        hasNext={!!nextCursor}
        hasPrevious={!!previousCursor}
        onPageSizeChange={(nextPageSize: number) => {
          setPageSize(nextPageSize);
        }}
        onSortByChange={(nextSortBy: SortBy) => {
          setCursor(undefined);
          setSortBy(nextSortBy);
        }}
        onSortDirectionChange={(nextSortDirection: SortDirection) => {
          setCursor(undefined);
          setSortDirection(nextSortDirection);
        }}
        onNextClick={() => {
          setCursor(nextCursor);
        }}
        onPreviousClick={() => {
          setCursor(previousCursor);
        }}
      />
    </div>
  );
};

export default ServerSidePagination;
