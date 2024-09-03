import React, { useState } from 'react';
import './warehouse.css'; // Import the CSS file for styling

import Sidebar from '../Sidebar';
import { productsData } from '../../data/data'
const Warehouse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewClick = (product) => {
    console.log("View button clicked for product:", product.name); // Debugging
    setSelectedProduct(product);
  };

  const closeProductDetails = () => { 
    setSelectedProduct(null);
  };

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Sidebar/>
    <div className="dash-board">
    <div className="warehouse">
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="shelf-container">
        {['Shelf A', 'Shelf B', 'Shelf C', 'Shelf D', 'Shelf E'].map((shelf) => (
          <div key={shelf} className="shelf">
            <h2 className='shelf-name'>{shelf}</h2>
            <div className="product-list-warehouse">
              {filteredProducts
                .filter((product) => product.shelfNumber === shelf)
                .map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h5 className='mt-6' style={{fontWeight:"600" , color:"blue"}}>{product.name}</h5>
                    <p className='text'>Price:  ₹{product.price}</p>
                    <p className='text'>
                      Status: 
                      <span className={product.quantity === 0 ? 'out-of-stock' : 'available'}>
                        {product.quantity === 0 ? 'Out of Stock' : 'Available'}
                      </span>
                    </p>
                    <button className='view-button' onClick={() => handleViewClick(product)}>View</button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <>
          <div className="overlay show" onClick={closeProductDetails}></div>
          <div className="product-details show">
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="product-details-image" />
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong>  ₹{selectedProduct.price}</p>
            <p><strong>Expiry Date:</strong> {selectedProduct.expiryDate}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p>
              <strong>Status:</strong> {selectedProduct.quantity === 0 ? 'Out of Stock' : 'Available'}
            </p>
            <button className='close-button' onClick={closeProductDetails}>Close</button>
          </div>
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default Warehouse;
