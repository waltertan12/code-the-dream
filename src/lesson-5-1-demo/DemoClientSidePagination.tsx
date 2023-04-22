import React, { ChangeEvent, useState } from "react";
import { faker } from "@faker-js/faker";

interface User {
  id: number;
  username: string;
  createdAt: Date;
}

interface UsersListProps {
  users?: User[];
}

const generatedUsers = Array(100)
  .fill(null)
  .map((_, index) => ({
    id: index,
    username: faker.internet.userName(),
    createdAt: faker.date.birthdate(),
  }));

type SortBy = keyof User;
type SortDirection = "ASC" | "DESC";

export const UsersList: React.FC<UsersListProps> = ({
  users = generatedUsers,
}) => {
  const [pageSize, setPageSize] = useState(5);
  const [cursor, setCursor] = useState(0);
  const handlePreviousClick = () => {
    setCursor(cursor - pageSize);
  };
  const handleNextClick = () => {
    setCursor(cursor + pageSize);
  };

  console.log({ cursor, pageSize, nextCursor: cursor + pageSize });

  return (
    <div>
      <ul>
        {users
          .slice(cursor, cursor + pageSize)
          // TODO
          .map((user) => {
            return (
              <li key={user.id}>
                {user.id} {user.username} {user.createdAt.toLocaleString()}
              </li>
            );
          })}
      </ul>

      <button onClick={handlePreviousClick} disabled={cursor <= 0}>
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={cursor + pageSize >= users.length}
      >
        Next
      </button>
    </div>
  );
};

export const UsersListWithSorting: React.FC<UsersListProps> = ({
  users = generatedUsers,
}) => {
  const [pageSize, setPageSize] = useState(5);
  const [cursor, setCursor] = useState(0);
  // Add new state variables to track sort by and sort direction
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  const handlePreviousClick = () => {
    // TODO
  };
  const handleNextClick = () => {
    //TODO
  };
  const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO
  };
  const handleSortDirectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO
  };
  const direction = sortDirection === "ASC" ? 1 : -1;

  return (
    <div>
      <ul>
        {users
          // TODO
          // sort the users first before paginating
          // slice creates a new array from indexes cursor to cursor + pageSize
          .slice(cursor, cursor + pageSize)
          .map((user) => {
            return (
              <li key={user.id}>
                {user.id} {user.username} {user.createdAt.toLocaleString()}
              </li>
            );
          })}
      </ul>

      <select value={sortBy} onChange={handleSortByChange}>
        <option value="id">ID</option>
        <option value="username">Username</option>
        <option value="createdAt">Created At</option>
      </select>
      <select value={sortDirection} onChange={handleSortDirectionChange}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
