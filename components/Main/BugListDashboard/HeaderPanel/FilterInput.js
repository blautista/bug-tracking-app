import React, { useState } from "react";

const FilterInput = (props) => {
  const [filter, setFilter] = useState('');

  const sendFilter = (e) => {
    setFilter(e.target.value);
    props.onFilterChange(e.target.value);
  };

  return (
    <>
      <input
        style={{ position: "relative" }}
        type="text"
        onChange={sendFilter}
        value={filter}
      />
    </>
  );
};

export default FilterInput;
