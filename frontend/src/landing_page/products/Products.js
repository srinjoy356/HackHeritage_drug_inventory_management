import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {productsData}  from '../../data/data';
import AddProduct from './AddProducts';
import './ProductManagement.css';
import Sidebar from '../Sidebar';

function Products() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const navigate = useNavigate();

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setIsShowing(true);
  };

  const handleSave = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? selectedProduct : product
    );
    setProducts(updatedProducts);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsShowing(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    navigate('/addproducts');
  };

  const handlePrint = () => {
    const printContents = document.getElementById('product-table').outerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Sidebar/>
    <div className="product-management-container">
      <h1>Product Management</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="add-product-button" onClick={handleAddProduct}>
          Add Product
        </button>
        <button className="print-button" onClick={handlePrint}>
          Print Table
        </button>
      </div>
      <table id="product-table" className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Expiry Date</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Quantity</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.expiryDate}</td>
              <td>&#x20b9;{product.price.toFixed(2)}</td>
            
              
              <td>
                {product.quantity === 0 ? (
                  <span className="status out-of-stock">Out of Stock</span>
                ) : (
                  <span className="status available">Available</span>
                )}
              </td>
              <td>{product.quantity}</td>
              <td>{product.warehouse}</td>
              <td>
                <button
                  className="action-button edit-button"
                  onClick={() => handleEdit(product)}
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                 <i class="fa-solid fa-trash"></i>
                </button>
                <button
                  className="action-button show-button"
                  onClick={() => handleShow(product)}
                >
                 <i class="fa-solid fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <div className="edit-form">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleInputChange}
              />
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={selectedProduct.category}
                onChange={handleInputChange}
              />
              <label>Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                value={selectedProduct.expiryDate}
                onChange={handleInputChange}
              />
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handleInputChange}
              />
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={selectedProduct.quantity}
                onChange={handleInputChange}
              />
              <label>Warehouse:</label>
              <input
                type="text"
                name="warehouse"
                value={selectedProduct.warehouse}
                onChange={handleInputChange}
              />
              <label>Product Image URL:</label>
              <input
                type="text"
                name="image"
                value={selectedProduct.image}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <textarea
                name="description"
                value={selectedProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {isShowing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Product Details</h2>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Expiry Date:</strong> {selectedProduct.expiryDate}</p>
            <p><strong>Price:</strong> &#x20b9;{selectedProduct.price.toFixed(2)}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p><strong>Warehouse:</strong> {selectedProduct.warehouse}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/addproducts" element={<AddProduct addProduct={addProduct} />} />
      </Routes>
    </div>
    </>
  );
}

export default Products;
