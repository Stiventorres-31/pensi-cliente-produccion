import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { confirmation, sendRequest, showAlert } from '../functions';
import loadingImage from '../assets/logo.png';
import defaultImage from '../assets/img-default.png';

import storage from "../storage/storage";


const Detalle = () => {
    const API_URL = storage.getAPI_URL();
    const { id } = useParams();
    const [inmueble, setInmueble] = useState(null);

    const [imagenes, setImagenes] = useState([]);
    const [imagenPrincipal, setImagenPrincipal] = useState(null);


    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex < imagenes.length - 3) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            scrollRef.current.scrollLeft += scrollRef.current.offsetWidth + 16;
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth + 16;
        }
    };

    const getInmuebles = async () => {
        const response = await sendRequest('GET', {}, '/api/inmuebles/' + id, '', false);

        setInmueble(response.data.inmueble);

        const imagenes = response.data.inmueble.fotos || [];
        setImagenes(imagenes);

        if (imagenes.length > 0) {
            const destacada = imagenes.find((img) => img.destacado === 1);
            setImagenPrincipal(destacada || imagenes[0]);
        }

    }

    useEffect(() => {

        getInmuebles();
    }, [id]);


    const handleClickImagen = (img) => {
        setImagenPrincipal(img);
    };

    if (!inmueble) {
        return (
            <div className="loading-logo">
                <img src={loadingImage} alt="Cargando..." className="loading-image " />
            </div>
        );
    }

    return (
        <div className="container-detalle">
            <div className="carousel-container">
                <div className="image-main">
                    <img
                        id="mainImage"
                        src={imagenPrincipal ? `${API_URL}${imagenPrincipal.url}` : defaultImage}
                        alt="Imagen principal"
                    />
                    <div className="image-info">
                        <p className="price" style={{display:'flex'}}>
                            Precio:{"  "}
                            <span style={{ textDecoration: "line-through", marginLeft: '5px' }}>
                                {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                }).format(inmueble.precio)}
                            </span>
                        </p>

                        {inmueble.precio_descuento > 0 && (
                            <p className="discount">
                                Ahora:{" "}
                                {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                }).format(inmueble.precio_descuento)}
                            </p>
                        )}
                    </div>

                </div>
                <div className="carousel">
                    <div className="carousel-track" ref={scrollRef}>
                        {imagenes.map((img, index) => (
                            <div key={img.id_foto} className="carousel-item">
                                <img
                                    src={`${API_URL}${img.url}`}
                                    alt={`Imagen ${img.id_foto}`}
                                    onClick={() => handleClickImagen(img)}
                                />

                            </div>
                        ))}
                    </div>
                    <button className="carousel-prev" onClick={prevSlide}>
                        &#8249;
                    </button>
                    <button className="carousel-next" onClick={nextSlide}>
                        &#8250;
                    </button>
                </div>
            </div>
            <div className="details-container">

                <h2 className="property-title">
                    {inmueble.codigo}: {inmueble.nombre}
                </h2>
                <p className="address">
                    {inmueble.direccion}, {inmueble.ciudad}-{inmueble.region},{" "}
                    {inmueble.pais}
                </p>
                <div className="property-info">
                    <p className="property-size">
                        <i className="fa-solid fa-ruler-horizontal"></i> {inmueble.medida} m²
                    </p>
                    <p className="property-rooms">
                        <i className="fa-solid fa-people-roof"></i> {inmueble.habitaciones}
                    </p>
                </div>
                <p className="description">{inmueble.descripcion}</p>
                <div className="services-a">
                    <p>
                        <i className="fa-solid fa-school-circle-check"></i> Tipos de servicios:
                    </p>
                    <div className="services-list">
                        {inmueble.servicios.map((servicio) => (
                            <div
                                key={servicio.id_inmueble_tipo_servicio}
                                className="service-item"
                            >
                                <i className="fa-solid fa-check-circle"></i>{" "}
                                {servicio.servicio.descripcion}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="extra-services">
                    <p>
                        <i className="fa-solid fa-layer-group"></i> Servicios extra:
                    </p>
                    <div className="extra-services-list">
                        {inmueble.servicios_ex.map((servicio) => (
                            <div
                                key={servicio.id_inmueble_servicio_extra}
                                className="extra-service-item"
                            >
                                <i className="fa-solid fa-check-circle"></i>{" "}
                                {servicio.servicio_ex.descripcion}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='content-action-btn'>
                    <a href={inmueble.link} target='_blank' title='Cotizar vía WhatsApp' rel='noopener noreferrer' className="btn-action  whats-btn">
                        <ion-icon name="logo-whatsapp"></ion-icon> Cotizar vía WhatsApp

                    </a>
                </div>

            </div>
        </div>

    )
}

export default Detalle