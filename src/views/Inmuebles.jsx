import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendRequest } from '../functions';
import Filtros from '../components/Filtros';
import storage from '../storage/storage'
import defaultImage from '../assets/img-default.png'
import loadingImage from '../assets/logo.png';


function Inmuebles() {
  const [inmuebles, setInmuebles] = useState([]);


  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const API_URL = storage.getAPI_URL();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const fetchInmuebles = async (filters = {}) => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search') || '';
    let response;

    if (Object.keys(filters).length > 0) {

      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has('search')) {
        searchParams.delete('search');
      }
      const newSearch = searchParams.toString();
      window.history.replaceState({}, '', `${location.pathname}${newSearch ? '?' + newSearch : ''}`);
      response = await sendRequest('POST', filters, '/api/filtro/inmuebles', '', false, false);

    } else if (searchQuery) {
      response = await sendRequest('POST', { search: searchQuery }, '/api/buscar/inmuebles', '', false, false);
    } else {
      response = await sendRequest('GET', {}, '/api/inmuebles', '', false);
    }

    setInmuebles(response.data.inmuebles);
    setLoading(false);
  };

  useEffect(() => {
    fetchInmuebles();
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.search]);


  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  const applyFilters = (filters) => {
    fetchInmuebles(filters);
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const handleToggleReadMore = (index) => {
    setExpandedIndexes((prev) => {
      const newExpandedIndexes = [...prev];
      if (newExpandedIndexes.includes(index)) {
        newExpandedIndexes.splice(newExpandedIndexes.indexOf(index), 1);
      } else {
        newExpandedIndexes.push(index);
      }
      return newExpandedIndexes;
    });
  };

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const obtenerImagenDestacada = (fotos) => {
    if (fotos && fotos.length > 0) {
      for (let i = 0; i < fotos.length; i++) {
        if (fotos[i].destacado === 1) {
          return `${API_URL}${fotos[i].url}`;
        }
      }
      return `${API_URL}${fotos[0].url}`;
    } else {
      return defaultImage;
    }
  };




  if (loading) {
    return (
        <div className="loading-logo">
            <img src={loadingImage} alt="Cargando..." className="loading-image " />
        </div>
    );
}

  return (
    <div className="main-container">
      {/* Botón para abrir el sidebar en dispositivos móviles */}
      {isMobileView && (
        <div className='content-filter-btn'>
          <button className="open-sidebar-btn" onClick={openSidebar}><i className="fa-solid fa-filter"></i> Filtros</button>
        </div>
      )}

      {/* Formulario de búsqueda */}
      {isMobileView && (
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar inmueble..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit"><i className="fa-solid fa-search"></i></button>
        </form>
      )}

      {/* Contenedor de filtros (visible en escritorio y móvil) */}
      {!isMobileView && (
        <div className="filters-container">
          <Filtros applyFilters={applyFilters} />
        </div>
      )}

      {/* Contenedor de inmuebles */}
      <div className="inmuebles-container">
        {inmuebles.length > 0 ? (
          inmuebles.map((inmueble, index) => (
            <div className="property-card card" key={index}>
              <figure className="card-banner">
                <a href={`/inmuebles/${inmueble.id_inmueble}`}>
                  <img src={obtenerImagenDestacada(inmueble.fotos)} alt={inmueble.title} className="w-100" />
                </a>
                <div className="card-badge">
                  {inmueble.porcentaje_descuento > 0 && (
                    <>
                      <i className="fa-solid fa-tags " style={{ marginRight: '10px' }}></i>
                      <span>{inmueble.porcentaje_descuento}%</span>
                    </>
                  )}
                </div>
                <div className="banner-actions">
                  <button disabled className="banner-actions-btn">
                    <ion-icon name="location"></ion-icon>
                    <address>{inmueble.region}-{inmueble.ciudad}, {inmueble.pais}</address>
                  </button>
                </div>
              </figure>
              <div className="card-content">
                <div className="card-price">
                  <strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(inmueble.precio)}</strong> COP
                </div>
                <h3 className="h3 card-title">
                  <a href={`/inmuebles/${inmueble.id_inmueble}`}>{inmueble.nombre}</a>
                </h3>
                <p className="card-text">
                  {expandedIndexes.includes(index)
                    ? inmueble.descripcion
                    : truncateText(inmueble.descripcion, 100)}
                </p>
                {inmueble.descripcion.length > 100 && (
                  <button onClick={() => handleToggleReadMore(index)} className="read-more-link">
                    {expandedIndexes.includes(index) ? (
                      <>
                        <i className="fas fa-chevron-up"></i> Ver menos
                      </>
                    ) : (
                      <>
                        <i className="fas fa-chevron-down"></i> Ver más
                      </>
                    )}
                  </button>
                )}
                <ul className="card-list">
                  <li className="card-item">
                    <strong>{inmueble.habitaciones}</strong>
                    <ion-icon name="bed-outline"></ion-icon>
                    <span>Cuartos</span>
                  </li>
                  <li className="card-item">
                    <strong>{inmueble.medida}</strong>
                    <ion-icon name="cube-outline"></ion-icon>
                    <span>Metros²</span>
                  </li>
                  <li className="card-item">
                    <strong>{inmueble.codigo}</strong>

                    <span>Código</span>
                  </li>
                </ul>
                
              </div>
              <div className="card-footer" style={{padding: '15px'}}>
                      <div className="card-author">
                        {/* Contenido del autor del inmueble */}
                      </div>
                      {/* Acciones del footer (puedes ocultar según sea necesario) */}
                      <div className="card-footer-actions">
                        {/*<button className="card-footer-actions-btn">
                          <ion-icon name="resize-outline"></ion-icon>
                        </button>
                        <button className="card-footer-actions-btn">
                          <ion-icon name="heart-outline"></ion-icon>
                        </button>*/}
                        <a href={inmueble.link} target='_blank' title='Cotizar vía WhatsApp' rel='noopener noreferrer' className="card-footer-actions-btn whats-btn">
                        <ion-icon name="logo-whatsapp"></ion-icon> 

                        </a>
                      </div>
                    </div>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados, prueba con otro término.</p>
        )}
      </div>

      {/* Sidebar de filtros (visible solo en dispositivos móviles) */}
      {isMobileView && (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="close-sidebar-btn" onClick={closeSidebar}>×</button>
          <Filtros applyFilters={applyFilters} />
        </div>
      )}
    </div>
  );
}

export default Inmuebles;
