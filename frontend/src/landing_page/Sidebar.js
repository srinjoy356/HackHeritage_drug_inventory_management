// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeLink, setActiveLink] = useState('dashboard');

    // Toggle sidebar visibility
    const toggleNavbar = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };

   

    // Handle dropdown toggle
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    // Set active link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
   
    useEffect(() => {
        const dropdownToggles = document.querySelectorAll('.dropdown-togg');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
            });
        });

        return () => {
            dropdownToggles.forEach(toggle => {
                toggle.removeEventListener('click', (event) => {
                    event.preventDefault();
                    const parent = toggle.parentElement;
                    parent.classList.toggle('open');
                });
            });
        };
    }, []);

    return (
        <div className="side-bar">
        <div id="body-pd">
            <header className={`header ${isNavbarVisible ? 'body-pd' : ''}`} id="header">
                <div className="header_toggle" onClick={toggleNavbar}>
                    <i className={`bx bx-menu ${isNavbarVisible ? 'bx-x' : ''}`} id="header-toggle"></i>
                </div>
                <div className="header_img">
                    <img src="https://i.imgur.com/hczKIze.jpg" alt="Profile" />
                </div>
            </header>
            <div className={`l-navbar ${isNavbarVisible ? 'show' : ''}`} id="nav-bar">
                <nav className="nav">
                    <div>
                        <Link
                            
                            className={`nav_logo `}
                            to="/home"
                        
                        >
                            <i className='bx bx-layer nav_logo-icon dash' style={{fontSize:"28px"}}></i>
                            <span className="nav_logo-name"><span style={{color:"orange"}}>Niravana</span><br></br><span style={{color:"#87f167"}}>HealthChain</span></span>
                        </Link>
                        <div className="nav_list">
                            <Link
                                
                                className={`nav_link ${activeLink === 'dashboard' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('dashboard')}
                                to="/home"
                            >
                                <i className='bx bx-grid-alt nav_icon' style={{fontSize:"25px"}}></i>
                                <span className="nav_name">Dashboard</span>
                            </Link>
                            <li className={`dropdown ${openDropdown === 'products' ? 'open' : ''}`}>
                                <Link
                                    
                                    className={`dropdown-togg nav_link ${activeLink === 'products' ? 'active' : ''}`}
                                    onClick={()=>{
                                      handleLinkClick('products');
                                      toggleDropdown('products');
                                    }}
                                    to="/products"
                                     
                                >
                                    <i className="fa-duotone fa-solid fa-boxes-stacked nav_icon"></i>
                                    <span className="nav_name">Products</span>
                                    <p className="arrow">&#9662;</p>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropmenu"  to="/addproducts">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                                
                                            </svg>
                                            Add Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropmenu" to="/products" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                            </svg>
                                            Manage Products
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`dropdown ${openDropdown === 'orders' ? 'open' : ''}`}>
                                <Link
                                    
                                    className={`dropdown-togg nav_link ${activeLink === 'orders' ? 'active' : ''}`}
                                    onClick={()=>{
                                      handleLinkClick('orders');
                                      toggleDropdown('orders');
                                    }}
                                    to="/orders"
                                >
                                    <i className="fa-duotone fa-solid fa-cart-shopping nav_icon"></i>
                                    <span className="nav_name">Orders</span>
                                    <p className="arrow">&#9662;</p>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropmenu" href="#add-order" to="/addorders">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                            </svg>
                                            Add Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropmenu"  to="/orders">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                            </svg>
                                            Manage Orders
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            
                            <Link
                                
                                className={`nav_link ${activeLink === 'warehouse' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('warehouse')}
                                to="/warehouse"
                            >
                                <i className="fa-duotone fa-solid fa-warehouse nav_icon"></i>
                                <span className="nav_name">Warehouse</span>
                            </Link>
                            <Link
                                
                                className={`nav_link ${activeLink === 'users' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('users')}
                                to="/user"
                            >
                                <i className="fa-solid fa-user nav_icon"></i>
                                <span className="nav_name">Users</span>
                            </Link>
                        </div>
                    </div>
                    <Link
                        to='/login'
                        className={`nav_link ${activeLink === 'signout' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('signout')}
                    >
                        <i className='bx bx-log-out nav_icon' style={{fontSize:"25px"}}></i>
                        <span className="nav_name">SignOut</span>
                    </Link>
                </nav>
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
