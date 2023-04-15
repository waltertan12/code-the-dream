import { useState } from "react";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const findAge = (birthday) => {
  const difference = new Date().getTime() - birthday.getTime();
  const years = difference / (1000 * 60 * 60 * 24 * 365.25);
  const days = (years % 1) * 365.25;
  return { years: Math.floor(years), days: Math.floor(days) };
};

const formatAge = (age) => {
  let formattedAge = `${age.years}`;
  if (Math.abs(age.years) !== 1) {
    formattedAge += " years and ";
  } else {
    formattedAge += " year and ";
  }

  if (Math.abs(age.days) !== 1) {
    formattedAge += `${age.days} days`;
  } else {
    formattedAge += `${age.days} day`;
  }

  return formattedAge;
};

const AgeCalculator = () => {
  const [birthday, setBirthday] = useState(new Date(2023, 1, 1));
  const handleBirthdayChange = (event) => {
    setBirthday(new Date(event.target.value));
  };

  return (
    <div>
      <h1>Age Calculator</h1>
      <div>
        <label>
          Enter a birthday
          <input
            type="date"
            onChange={handleBirthdayChange}
            required
            value={formatDate(birthday)}
          />
        </label>
        <p>Age: {formatAge(findAge(birthday))}</p>
      </div>
    </div>
  );
};

export default AgeCalculator;
