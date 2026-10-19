import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

  return (
    <tr className="product-row">
      <td className="product-id">{product.id}</td>
      <td className="product-name">{product.name}</td>
      <td className="product-category">{product.category}</td>
      <td className="product-price">{formattedPrice}</td>
      <td className="product-actions">
        <Link to={`/products/${product.id}`} className="btn-detail">
          Chi tiết
        </Link>
      </td>
    </tr>
  );
};

export default ProductItem;
