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

import AddProduct from './landing_page/products/AddProducts';
import Details from './landing_page/home/details';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import AddOrder from './landing_page/orders/AddOrder';
import Login from './landing_page/user_login/Login';
import Signup from './landing_page/user_login/Signup';
import OCR from './landing_page/warehouse/ocr';
import Login_Interface from './landing_page/user_login/Login_Interface';
import LoginManu from './landing_page/user_login/LoginManu';
import Manufacture from './landing_page/home/Manufactre';
import Shipment from './landing_page/Shipment/Shipment';

import LoginWhole from './landing_page/user_login/LoginWhole';
import Wholesale from './landing_page/home/Wholesale';
import Recieve from './landing_page/Shipment/Recieve';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
   

<BrowserRouter>
  <Routes>
<Route path='/Manufacture' element={<LoginManu/>}/>
<Route path='/Wholesaler' element={<LoginWhole/>}/>
<Route path='/Manu' element={<Manufacture/>}/>
<Route path='/whole' element={<Wholesale/>}/>

  <Route path="/" element={<Login_Interface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<Dashboard/>}></Route>
   
        <Route path="/details" element={<Details/>}></Route>
    
    <Route path="/orders" element={<Orders/>}></Route>
    <Route path="/warehouse" element={<Warehouse/>}></Route>
    <Route path="/products" element={<Products/>}></Route>
   <Route path='/shipment' element={<Shipment/>}></Route>
   <Route path='/rec' element={<Recieve/>}></Route>
    <Route path="/addproducts" element={<AddProduct/>}></Route>
    <Route path="/addorders" element={<AddOrder/>}></Route>
    <Route path='/OCR' element={<OCR/>}></Route>
    
  </Routes>
  </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();