import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  

  return (
    <div>
      <h1>Product Detail: </h1>
      <h2>ID: {product.id}</h2>
      <h2>Name: {product.name}</h2>
      <h2>Category: {product.category}</h2>
      <h3>Price: {product.price}</h3>
      <h4>Description: {product.description}</h4>

      
      <br />
      <Link to="/products">&larr; Quay lại danh sách</Link>
    </div>
  );
}

export default ProductDetail;
