import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div>
       
        
        {/* Thanh menu điều hướng chung */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home Page</Link> {" | "}
          <Link to="/products">Products</Link>
        </nav>

        {/* Khai báo các Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;