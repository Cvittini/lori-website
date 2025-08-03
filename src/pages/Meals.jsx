import React, { useState } from 'react';
import './Meals.css';

const productData = {
  cookies: {
    name: "Healthy Cookies",
    options: [10, 20, 30],
    prices: { 10: 20, 20: 38, 30: 54 },
    description: "Delicious, guilt-free cookies made with clean ingredients.",
    image: "/images/cookies.jpg"
  },
  tea: {
    name: "Energizing Tea",
    options: [6, 10],
    prices: { 6: 60, 10: 90 },
    description: "A refreshing energy boost packed with antioxidants.",
    image: "/images/tea.jpg"
  }
};

const ProductCard = ({ productKey }) => {
  const [quantity, setQuantity] = useState(productData[productKey].options[0]);
  const [flavor, setFlavor] = useState("Tropical Fruit"); // default flavor
  const product = productData[productKey];

  const flavorOptions = ["Tropical Fruit", "Tropical", "Blues"];

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="product-desc">{product.description}</p>

      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="quantity-select">
        {product.options.map(option => (
          <option key={option} value={option}>
            {option} {productKey === 'cookies' ? 'cookies' : 'bottles'}
          </option>
        ))}
      </select>

      {productKey === 'tea' && (
        <select value={flavor} onChange={e => setFlavor(e.target.value)} className="flavor-select">
          {flavorOptions.map(flavor => (
            <option key={flavor} value={flavor}>{flavor}</option>
          ))}
        </select>
      )}

      <p className="price">${product.prices[quantity]}</p>
      <button className="order-btn">Add to Cart</button>
    </div>
  );
};


const Meals = () => {
  return (
    <div className="meals-section">
      <div className="meals-hero">
        <h1>Nutritious & Delicious</h1>
        <p>Boost your energy and treat yourself guilt-free.</p>
      </div>

      <div className="meals-grid">
        <ProductCard productKey="cookies" />
        <ProductCard productKey="tea" />
      </div>
    </div>
  );
};

export default Meals;
