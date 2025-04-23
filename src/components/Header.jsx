import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import storage from '../storage/storage';
import {showAlert, sendRequest } from '../functions'


const Header = () => {
    const isLoggedIn = storage.get('authUser') !== null;
    const [isOpenMenu, setIsOpenMenu] = useState('');
    const [isHeaderActive, setIsHeaderActive] = useState(false);
    const closeMenu = () => setIsOpenMenu('');
    const openMenu = () => setIsOpenMenu('active');
    const address = "Cra 51b #2-790, Barranquilla, Colombia";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const navigate = useNavigate();

    //Search for inmuebles
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLoging = () => {
        navigate('/login');
    }
    const handleLogout = async () => {
        await sendRequest('POST', {}, '/api/logout-client', '', true, false);
        
        storage.remove('authToken');
        storage.remove('authUser');
        showAlert('Has cerrado sesión correctamente.', 'success', 3000, '/');

    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            navigate('/inmuebles');
        } else {
            navigate(`/inmuebles?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        setSearchQuery('');
    };

    const handleClick = () => {
        closeMenu(); 
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) { // Ajustar el valor según cuando quieras activar el header
                setIsHeaderActive(true);
            } else {
                setIsHeaderActive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (

        <header className={`header ${isHeaderActive ? 'active' : ''}`} >

            <div className="overlay" ></div>

            <div className="header-top">
                <div className="container">

                    <ul className="header-top-list">
                        <li>
                            <a href="mailto:info@Inmueblespensi.com" className="header-top-link" target='_blank' rel="noopener noreferrer">
                                <ion-icon name="mail-outline"></ion-icon>

                                <span>PensiColombia@hotmail.com</span>
                            </a>
                        </li>

                        <li>
                            <a href={googleMapsUrl} className="header-top-link" target="_blank" rel="noopener noreferrer">
                                <ion-icon name="location-outline"></ion-icon>
                                <address>Barranquilla, Atlantico</address>
                            </a>

                        </li>

                    </ul>

                    <div className="wrapper">
                        <ul className="header-top-social-list">

                            <li>
                                <a href="https://www.facebook.com/share/1XEEf3cT8M/?mibextid=wwXIfr"
                                    className="header-top-social-link" target="_blank" rel="noopener noreferrer">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                </a>
                            </li>

                            <li>
                                {/*<a href="#" className="header-top-social-link" target="_blank" rel="noopener noreferrer">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                </a>*/}
                            </li>

                            <li>
                                <a href="https://www.instagram.com/pensicolombia?igsh=eGFtNW5mMnM2dXU3" className="header-top-social-link" target="_blank" rel="noopener noreferrer">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                </a>
                            </li>

                            <li>
                                <a href="https://www.tiktok.com/@pensicolombia?_t=ZS-8uV0fNiW0nK&_r=1" className="header-top-social-link" target="_blank" rel="noopener noreferrer">
                                    <ion-icon name="logo-tiktok"></ion-icon>
                                </a>
                            </li>

                        </ul>

                        <a href="https://wa.link/7x17bg" className="header-top-btn" target="_blank" rel="noopener noreferrer">Contáctanos</a>
                    </div>

                </div>
            </div>

            <div className="header-bottom">
                <div className="container">

                    <a href="/" className="logo">
                        <img src={logo} alt="Pensi logo" />
                    </a>

                    <nav className={`navbar ${isOpenMenu}`} >

                        <div className="navbar-top">

                            <a href="/" className="logo">
                                <img src={logo} alt="Pensi logo" />
                            </a>

                            <button className="nav-close-btn" onClick={closeMenu} aria-label="Close Menu">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>

                        </div>

                        <div className="navbar-bottom">
                            <ul className="navbar-list">

                                <li>
                                    <a href="/#home" className="navbar-link" onClick={handleClick}>Inicio </a>
                                </li>

                                <li>
                                    <a href="/#about" className="navbar-link" onClick={handleClick} >Sobre Nosotros</a>
                                </li>

                                <li>
                                    <a href="/#services" className="navbar-link" onClick={handleClick} >Servicios</a>
                                </li>

                                <li>
                                    <a href="/#property" className="navbar-link " onClick={handleClick} >Propiedades</a>
                                </li>

                                <li>
                                    <a href="/#footer" className="navbar-link" onClick={handleClick} >Contáctanos</a>
                                </li>

                            </ul>
                        </div>

                    </nav>

                    <div className="header-bottom-actions">


                        <form className="barra-de-busqueda" onSubmit={handleSearchSubmit} method='POST'>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                id="input-buscar-inmueble"
                                name="input-buscar-inmueble"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" aria-label="Buscar" style={{ background: 'none', border: 'none', color: '#ffff' }}>
                            
                            <i className="fas fa-search"></i>
                            </button>
                        </form>


                        <button onClick={isLoggedIn ? handleLogout : handleLoging} className="header-bottom-actions-btn" id="profile" aria-label={isLoggedIn ? "Logout" : "Profile"}>
                            <ion-icon name={isLoggedIn ? "log-out-outline" : "person-outline"}></ion-icon>
                            <span>{isLoggedIn ? "Salir" : "Registro"}</span>
                        </button>

                        

                        <button className="header-bottom-actions-btn" aria-label="Open Menu"
                            onClick={openMenu} >
                            <ion-icon name="menu-outline"></ion-icon>
                            <span>Menu</span>
                        </button>

                    </div>


                </div>
            </div>

        </header>

    )
}

export default Header