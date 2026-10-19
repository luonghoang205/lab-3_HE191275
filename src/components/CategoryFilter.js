import React from 'react';
import { useSearchParams } from 'react-router-dom';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value && value !== 'All Categories') {
      newParams.set('category', value);
    } else {
      newParams.delete('category');
    }

    // Reset to page 1 when category changes
    newParams.delete('page');

    setSearchParams(newParams);
  };

  return (
    <div className="category-filter">
      <select
        className="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Tất cả danh mục</option>
        <option value="Điện thoại">Điện thoại</option>
        <option value="Laptop">Laptop</option>
        <option value="Máy tính bảng">Máy tính bảng</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
