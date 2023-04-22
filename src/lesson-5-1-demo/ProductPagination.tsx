import React from "react";
import {
  ASC,
  PAGE_SIZES,
  SORT_BYS,
  SORT_BY_ID,
  SORT_DIRECTIONS,
  SortBy,
  SortDirection,
} from "./ProductApi";

interface CursorPaginationProps {
  pageSize?: number;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  onPageSizeChange: (nextPageSize: number) => void;
  onSortByChange: (nextSortBy: SortBy) => void;
  onSortDirectionChange: (nextSortDirection: SortDirection) => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const CursorPagination: React.FC<CursorPaginationProps> = ({
  pageSize = PAGE_SIZES[0],
  sortBy = SORT_BY_ID,
  sortDirection = ASC,
  onPageSizeChange,
  onSortByChange,
  onSortDirectionChange,
  onNextClick,
  onPreviousClick,
  hasNext,
  hasPrevious,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        {/* Control page size */}
        <label>
          Page Size
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {PAGE_SIZES.map((nextPageSize) => {
              return (
                <option value={nextPageSize} key={nextPageSize}>
                  {nextPageSize}
                </option>
              );
            })}
          </select>
        </label>
        {/* Control sort by */}
        <label>
          Sort By
          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value as SortBy)}
          >
            {SORT_BYS.map((nextSortBy) => {
              return (
                <option value={nextSortBy} key={nextSortBy}>
                  {nextSortBy}
                </option>
              );
            })}
          </select>
        </label>
        {/* Control sort direction */}
        <label>
          Sort Direction
          <select
            value={sortDirection}
            onChange={(event) =>
              onSortDirectionChange(event.target.value as SortDirection)
            }
          >
            {SORT_DIRECTIONS.map((nextSortDirection) => {
              return (
                <option value={nextSortDirection} key={nextSortDirection}>
                  {nextSortDirection === ASC ? "🔼" : "🔽"}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Control previous */}
        <button onClick={onPreviousClick} disabled={!hasPrevious}>
          Previous
        </button>
        {/* Control next */}
        <button onClick={onNextClick} disabled={!hasNext}>
          Next
        </button>
      </div>
    </div>
  );
};
