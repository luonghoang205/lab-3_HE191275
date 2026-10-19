import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductItem from '../components/ProductItem';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 3;

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = (searchParams.get('keyword') || '').trim();
  const category = (searchParams.get('category') || '').trim();
  const sort = searchParams.get('sort') || 'default';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Filter products by keyword and category
  let filtered = products.filter((product) => {
    const matchesKeyword = keyword
      ? product.name.toLowerCase().includes(keyword.toLowerCase())
      : true;

    const matchesCategory =
      category && category !== 'All Categories'
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;

    return matchesKeyword && matchesCategory;
  });

  // Sort products
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalProducts = filtered.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE) || 1;

  // Calculate slice for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'default') {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="product-list-page">
      {/* Controls row: Search, Category Filter, Sort */}
      <div className="filter-controls-row">
        <SearchBar />
        <CategoryFilter />
        <div className="sort-filter">
          <select
            className="sort-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="default">Sắp xếp: Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
           
          </select>
        </div>
      </div>

      {/* Stats and pagination header row */}
      <div className="list-stats-pagination-row">
        <div className="stats-info">
          Tổng: <strong>{totalProducts}</strong> | Trang: <strong>{currentPage}/{totalPages}</strong>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      {/* Products table */}
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Tên sản phẩm</th>
              <th style={{ width: '180px' }}>Danh mục</th>
              <th style={{ width: '180px' }}>Giá</th>
              <th style={{ width: '130px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {totalProducts === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">
                  Không tìm thấy sản phẩm nào phù hợp.
                </td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">
                  Không có sản phẩm nào ở trang này.
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
