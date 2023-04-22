import React from "react";
import { faker } from "@faker-js/faker";

interface Dog {
  id: number;
  breed: string;
  name: string;
}

const ArrayManipulation: React.FC = () => {
  const numbers = Array(100)
    .fill(null)
    .map((_, index) => index);

  const dogs: Dog[] = Array(100)
    .fill(null)
    .map((_, index) => ({
      id: index,
      breed: faker.animal.dog(),
      name: faker.name.fullName(),
    }));

  return (
    <>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name} - {dog.breed}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArrayManipulation;
