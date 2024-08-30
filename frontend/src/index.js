import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Sidebar from './landing_page/Sidebar';
import Dashboard from './landing_page/home/Dashboard';
import Orders from './landing_page/orders/Orders';
import Products from './landing_page/products/Products';
import Warehouse from './landing_page/warehouse/Warehouse';
import Category from './landing_page/category/category';
import AddProducts from './landing_page/products/AddProducts';
import AddOrders from './landing_page/orders/AddOrders';
import {BrowserRouter , Routes , Route} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
   

<BrowserRouter>
  <Routes>
  
    <Route path="/" element={<Dashboard/>}></Route>
    <Route path="/orders" element={<Orders/>}></Route>
    <Route path="/warehouse" element={<Warehouse/>}></Route>
    <Route path="/products" element={<Products/>}></Route>
    <Route path="/category" element={<Category/>}></Route>
    <Route path="/addproducts" element={<AddProducts/>}></Route>
    <Route path="/addorders" element={<AddOrders/>}></Route>
    
  </Routes>
  </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
