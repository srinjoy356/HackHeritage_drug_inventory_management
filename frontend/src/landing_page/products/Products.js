import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {productsData}  from '../../data/data';
import AddProduct from './AddProducts';
import './ProductManagement.css';
import Sidebar from '../Sidebar';
import axios from 'axios';

function Products() {

 const drug = [
    {
      id: 1,
      name: "Paracetamol Tablets",
      category: "Pain Relief",
      expiryDate: "2025-08-15",
      price: 50.99,
      quantity: 8,
      shelfNumber: "Shelf A",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/9/IV/UY/CG/75459511/500mg-paracetamol-tablet.jpg", 
      description: "Effective pain relief for headaches, fever, and mild aches."
    },
    {
      id: 2,
      name: "Cough Syrup",
      category: "Cough & Cold",
      expiryDate: "2024-11-30",
      price: 170.50,
      quantity: 200,
      shelfNumber: "Shelf B",
      image: "https://images.apollo247.in/pub/media/catalog/product/a/l/alk0008.jpg?tr=w-400,q-100,f-webp,c-at_max",
      description: "Soothing syrup for relief from cough and throat irritation."
    }
  ]

console.log(drug);


  const [products, setProducts] = useState(drug);
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
    <div className='dash-board'>
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
        <button className="add-product-but" onClick={handleAddProduct}>
          Add Product
        </button>
        <button className="print-but" onClick={handlePrint}>
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
            <th>Shelf No.</th>
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
              <td>{product.shelfNumber}</td>
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
              <label>Shelf No. :</label>
              <input
                type="text"
                name="warehouse"
                value={selectedProduct.shelfNumber}
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
            <p><strong>Shelf No. :</strong> {selectedProduct.shelfNumber}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <img src={selectedProduct.image} style={{height:"200px" , width:"200px" , alignSelf:"center"}} alt={selectedProduct.name} className="product-image" />
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
    </div>
    </>
  );
}

export default Products;
