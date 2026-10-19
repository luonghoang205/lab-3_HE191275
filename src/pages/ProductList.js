import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("keyword") || "";
  const sort = searchParams.get("sort") || "";

  const [searchTerm, setSearchTerm] = useState(keywordFromUrl);

  useEffect(() => {
    setSearchTerm(keywordFromUrl);
  }, [keywordFromUrl]);

  
  let filterKeyword = products.filter((product) =>
    product.name.toLowerCase().includes(keywordFromUrl.toLowerCase())
  );

  
  if (sort === "price-asc") {
    filterKeyword.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filterKeyword.sort((a, b) => b.price - a.price);
  }

  
  const pageParam = searchParams.get("page");
  const page = Math.max(1, pageParam ? Number(pageParam) : 1);
  const pageSize = 4; 

  const totalPages = Math.max(1, Math.ceil(filterKeyword.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const displayProducts = filterKeyword.slice(startIndex, startIndex + pageSize);

  // Hàm cập nhật các tham số trên URL
  function updateParams(changes) {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === "none" || value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    setSearchParams(nextParams);
  }

  function goToPage(newPage) {
    updateParams({ page: newPage });
  }

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    updateParams({ keyword: value, page: 1 }); // Reset về trang 1 khi tìm kiếm
  }

  function handleSortChange(event) {
    updateParams({ sort: event.target.value, page: 1 }); // Reset về trang 1 khi sắp xếp
  }

  return (
    <div>
      <h2>List of Products</h2>
      
      {/* Ô tìm kiếm */}
      <div>
        <label>
          Search by name:{" "}
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </label>
      </div>

      {/* Bộ lọc sắp xếp */}
      <div style={{ marginTop: '10px' }}>
        <label>
          Sort by price: {" "}
          <select value={sort} onChange={handleSortChange}>
            <option value="none">Mặc định</option>
            <option value="price-asc">Giá từ thấp đến cao</option>
            <option value="price-desc">Giá từ cao đến thấp</option>
          </select>
        </label>
      </div>

      {/* Hiển thị danh sách sản phẩm hoặc thông báo trống */}
      {displayProducts.length === 0 ? (
        <p style={{ marginTop: '15px', color: 'red' }}>Không tìm thấy sản phẩm</p>
      ) : (
        <ul style={{ marginTop: '15px' }}>
          {displayProducts.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.price} {" "}
              <Link to={`/products/${product.id}`}>View Detail</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Giao diện nút phân trang */}
      <div style={{ marginTop: '20px' }}>
        <div>
          <button 
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                style={{
                  fontWeight: pageNumber === currentPage ? 'bold' : 'normal'
                }}
              >
                {pageNumber}
              </button>
            )
          )}

          <button 
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            next
          </button>
        </div>

        <div style={{ marginTop: '5px' }}>
          Trang {currentPage}/{totalPages}
        </div>
      </div>
    </div>
  );
}

export default ProductList;