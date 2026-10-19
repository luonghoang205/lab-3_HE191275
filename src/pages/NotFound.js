import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1 className="not-found-code">404 - Không tìm thấy trang</h1>
        <p className="not-found-desc">Trang bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/" className="btn-home">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
