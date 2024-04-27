import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search posts"
      onSearch={handleSearch}
      style={{ width: 200, marginBottom: 16 }}
    />
  );
};

export default SearchBar;
