import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Replace the placeholder image URLs with real plant photos.
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://placehold.co/300x200?text=Snake+Plant',
        description: 'Produces oxygen at night, improving air quality.',
        cost: '$15',
      },
      {
        name: 'Spider Plant',
        image: 'https://placehold.co/300x200?text=Spider+Plant',
        description: 'Filters formaldehyde and xylene from the air.',
        cost: '$12',
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        image: 'https://placehold.co/300x200?text=Lavender',
        description: 'Calming scent, used in aromatherapy.',
        cost: '$20',
      },
      {
        name: 'Jasmine',
        image: 'https://placehold.co/300x200?text=Jasmine',
        description: 'Sweet fragrance that fills a room.',
        cost: '$18',
      },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      {
        name: 'Aloe Vera',
        image: 'https://placehold.co/300x200?text=Aloe+Vera',
        description: 'Soothing gel for skin. Needs very little water.',
        cost: '$14',
      },
      {
        name: 'Jade Plant',
        image: 'https://placehold.co/300x200?text=Jade+Plant',
        description: 'Hardy succulent that stores water in its leaves.',
        cost: '$16',
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#plants" onClick={handleContinueShopping}>Plants</a>
          <a
            href="#cart"
            onClick={(e) => {
              e.preventDefault();
              setShowCart(true);
            }}
            aria-label="Shopping cart"
          >
            Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div id="plants" className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="category-plants">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
