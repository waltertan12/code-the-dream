export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ListResponse<T> {
  data: T[];
  count: number;
  nextCursor: string | null;
  prevCursor: string | null;
}

export type ListProductResponse = ListResponse<Product>;

export const ASC = "ASC";
export const DESC = "DESC";
export type SortDirection = typeof ASC | typeof DESC;
export const SORT_DIRECTIONS: SortDirection[] = [ASC, DESC];

export const SORT_BY_ID = "id";
export const SORT_BY_NAME = "name";
export const SORT_BY_PRICE = "price";
export type SortBy =
  | typeof SORT_BY_ID
  | typeof SORT_BY_NAME
  | typeof SORT_BY_PRICE;
export const SORT_BYS: SortBy[] = [SORT_BY_ID, SORT_BY_NAME, SORT_BY_PRICE];

export const PAGE_SIZES = [5, 10, 25];

export const listProducts = async (
  cursor?: string,
  limit: number = 100,
  sortBy: SortBy = SORT_BY_ID,
  sortDirection: SortDirection = ASC
): Promise<ListProductResponse> => {
  const query = new URLSearchParams();
  query.set("limit", String(limit));
  query.set("sortBy", sortBy);
  query.set("sortDirection", sortDirection);
  if (cursor) {
    query.set("cursor", cursor);
  }
  const response = await fetch(
    `http://localhost:3001/api/v1/products?${query}`
  );
  return await response.json();
};
