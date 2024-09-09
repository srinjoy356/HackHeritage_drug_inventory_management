// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { Link } from 'react-router-dom';

const SideManu = () => {
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
                <div>
                    <h1>NIRVANA - HealthChain</h1>
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
                        
                            <Link
                                
                                className={`nav_link ${activeLink === 'users' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('users')}
                                to="/shipment"
                            >
                                <i className="fa-duotone fa-solid fa-cart-shopping nav_icon"></i>
                                <span className="nav_name">Shipment</span>
                            </Link>
                        </div>
                    </div>
                    <Link
                        to='/'
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

export default SideManu;