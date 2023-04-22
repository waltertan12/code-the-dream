import React, { useEffect, useState } from "react";
import {
  Product,
  ListProductResponse,
  SORT_BY_ID,
  ASC,
  PAGE_SIZES,
  listProducts,
  SortBy,
  SortDirection,
} from "./ProductApi";
import ProductRow from "./ProductRow";
import { CursorPagination } from "./ProductPagination";

const ClientSidePagination = () => {
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
      <ul style={{ padding: 0 }}>
        {products.map((product) => {
          return <ProductRow product={product} key={product.id} />;
        })}
      </ul>
      <CursorPagination
        pageSize={PAGE_SIZES[0]}
        sortBy={SORT_BY_ID}
        sortDirection={ASC}
        hasNext={false}
        hasPrevious={false}
        onPageSizeChange={(nextPageSize: number) => {
          console.log("Changing page size", nextPageSize);
        }}
        onSortByChange={(nextSortBy: SortBy) => {
          console.log("Changing sort by", nextSortBy);
        }}
        onSortDirectionChange={(nextSortDirection: SortDirection) => {
          console.log("Changing sort direction", nextSortDirection);
        }}
        onNextClick={() => {
          console.log("Clicking next");
        }}
        onPreviousClick={() => {
          console.log("Changing previous");
        }}
      />
    </div>
  );
};

export default ClientSidePagination;
