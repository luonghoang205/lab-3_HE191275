import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="detail-top-nav">
          <Link to="/products" className="btn-back">
            Quay lại danh sách
          </Link>
        </div>
        <div className="detail-not-found-card">
          <h2>Sản phẩm không tồn tại</h2>
          <p>Không tìm thấy sản phẩm với mã ID: {id}</p>
          <Link to="/products" className="btn-primary">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

  return (
    <div className="product-detail-page">
      <div className="detail-top-nav">
        <Link to="/products" className="btn-back">
          Quay lại danh sách
        </Link>
      </div>

      <div className="product-detail-card">
        <div className="product-image-container">
          <div className="product-image-placeholder">
            <span>Ảnh sản phẩm</span>
          </div>
        </div>

        <div className="product-info-container">
          <h1 className="product-detail-name">{product.name}</h1>

          <div className="product-meta-row">
            <span className="meta-label">ID:</span>
            <span className="meta-value">{product.id}</span>
          </div>

          <div className="product-meta-row">
            <span className="meta-label">Danh mục:</span>
            <span className="meta-value product-category-badge">{product.category}</span>
          </div>

          <div className="product-meta-row">
            <span className="meta-label">Giá:</span>
            <span className="meta-value product-price-highlight">{formattedPrice}</span>
          </div>

          <div className="product-meta-row description-row">
            <span className="meta-label">Mô tả:</span>
            <span className="meta-value product-description-text">{product.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
