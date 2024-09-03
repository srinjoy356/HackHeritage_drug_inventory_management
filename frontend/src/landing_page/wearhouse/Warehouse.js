import React,{ useState } from 'react';
import Sidebar from '../Sidebar';
import Data from './wproducts.json';
import "./warehouse.css";
import './ProductManagement.css';
function Warehouse() {
    
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setIsShowing(true);
  };
  const handleCloseModal = () => {
    
    setIsShowing(false);
    setSelectedProduct(null);
  };

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    
    return ( 
        <>
        <Sidebar/>
        <h1 style={{display:'flex',justifyContent:'left'}}>Warehouse</h1>
        <div style={{display:'flex',justifyContent:'left',height:'20px',width:'500px'}}>
        <input
          
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyUp={handleSearch}
          className="search-bar"
        />
        </div>
        <h1 className='shelfname'>Shelf A</h1>
      <div className="crdgrp">
      
        {Data.length && Data.filter((movie) => {
          if(movie.warehouse.toLowerCase().includes("warehouse a")) {
            if (searchTerm === "") {
              //if query is empty
              return movie;
            } else if (movie.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              //returns filtered array
              return movie;
            }
          }
        })
        .map((panu) => (
        <><div className="cardd" key={panu.id}>
          <h5 className='cardele'>{panu.name}</h5>
          <p className='cardele'>{panu.category}</p>
          <button class="btnwview" onClick={() => handleShow(panu)}>View</button>
          <span className='qw'>{panu.quantity}</span>
        <p className='pric' >&#x20b9;{panu.price}</p>
          
        </div>
        </>))}
         </div>
         <h1 className='shelfname'>Shelf B</h1>
      <div className="crdgrp">
      
        {Data.length && Data.filter((movie) => {
          if(movie.warehouse.toLowerCase().includes("warehouse b")) {
            if (searchTerm === "") {
              //if query is empty
              return movie;
            } else if (movie.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              //returns filtered array
              return movie;
            }
          }
        })
        .map((panu) => (
        <><div className="cardd" key={panu.id}>
          <h5 className='cardele'>{panu.name}</h5>
          <p className='cardele'>{panu.category}</p>
          <button class="btnwview" onClick={() => handleShow(panu)}>View</button>
          <span className='qw'>{panu.quantity}</span>
        <span className='pric' >&#x20b9;{panu.price}</span>
          
        </div>
        </>))}
         </div>
         <h1 className='shelfname'>Shelf C</h1>
      <div className="crdgrp">
      
        {Data.length && Data.filter((movie) => {
          if(movie.warehouse.toLowerCase().includes("warehouse c")) {
            if (searchTerm === "") {
              //if query is empty
              return movie;
            } else if (movie.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              //returns filtered array
              return movie;
            }
          }
        })
        .map((panu) => (
        <><div className="cardd" key={panu.id}>
          <h5 className='cardele'>{panu.name}</h5>
          <p className='cardele'>{panu.category}</p>
          <button class="btnwview" onClick={() => handleShow(panu)}>View</button>
          <span className='qw'>{panu.quantity}</span>
        <span className='pric' >&#x20b9;{panu.price}</span>
          
        </div>
        </>))}
         </div>


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
        
         
         

        </>
     );
}

export default Warehouse;