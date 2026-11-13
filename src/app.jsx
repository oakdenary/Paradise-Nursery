import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}
           style={{ display: showProductList ? 'none' : 'flex' }}>
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p>Where green meets serenity</p>
          <AboutUs />
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>

      {showProductList && (
        <div className="product-list-container">
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
