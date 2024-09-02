import React, { useState } from 'react';
import './AddProduct.css';
import Sidebar from '../Sidebar';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    expiryDate: '',
    price: '',
    quantity: '',
    warehouse: '',
    image: '',
    description: ''
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Product Added:', product);
  };

  return (
    <>
    <div className='dash-board'>
    <Sidebar/>
    <div className="form-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Shelf No. :</label>
          <input
            type="text"
            name="warehouse"
            value={product.shelfNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label>Product Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="add-button">Add Product</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default AddProduct;
