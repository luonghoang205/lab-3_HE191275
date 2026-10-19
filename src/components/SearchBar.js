import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeyword = searchParams.get('keyword') || '';
  const [searchTerm, setSearchTerm] = useState(currentKeyword);

  // Sync state if URL search param changes externally
  useEffect(() => {
    setSearchTerm(currentKeyword);
  }, [currentKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    const trimmed = searchTerm.trim();

    if (trimmed) {
      newParams.set('keyword', trimmed);
    } else {
      newParams.delete('keyword');
    }

    // Reset to page 1 when a new search is performed
    newParams.delete('page');

    setSearchParams(newParams);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm tên sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-btn">
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchBar;
