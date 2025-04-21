import React, { useEffect, useState } from "react";
import heroBanner_a from "../assets/hero-banner.png";
import aboutBanner_a from "../assets/about-banner-1.png";
import aboutBanner_b from "../assets/about-banner-2.jpg";
import serviceImage_a from "../assets/service-1.png";
import serviceImage_b from "../assets/service-2.png";
import serviceImage_c from "../assets/service-3.png";
import defaultImage from "../assets/img-default.png";
import { sendRequest } from "../functions";
import storage from "../storage/storage";

const Landing = () => {
  const [inmueblesDes, setInmueblesDes] = useState([]);
  const [novedades, setNovedades] = useState([]);
  const API_URL = storage.getAPI_URL();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
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
    if (fotos.length === 0) {
      return defaultImage;
    }
    for (let i = 0; i < fotos.length; i++) {
      if (fotos[i].destacado === 1) {
        return `${API_URL}${fotos[i].url}`;
      }
    }
    return `${API_URL}${fotos[0].url}`;
  };

  useEffect(() => {
    const fetchInmuebles = async () => {
      const response = await sendRequest(
        "GET",
        {},
        "/api/destacados/inmuebles",
        "",
        false
      );
      setInmueblesDes(response.data.inmuebles_destacados);

      const responseNove = await sendRequest(
        "GET",
        {},
        "/api/noticias",
        "",
        false
      );
      setNovedades(responseNove.data.noticias);
    };

    fetchInmuebles();
  }, []);

  return (
    <div className="pages">
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">
              <ion-icon name="home"></ion-icon>

              <span>Agencia Inmobiliaria</span>
            </p>

            <h2 className="h1 hero-title">Encuentra el hogar ideal</h2>

            <p className="hero-text">
              Tu hogar ideal está más cerca de lo que imaginas. Explora nuestras
              opciones y encuentra el espacio perfecto para ti. ¡Encuentra el
              lugar donde comienzan tus mejores momentos!
            </p>

            <a href="https://wa.link/7x17bg" target="_blank" rel="noopener noreferrer">
  <button className="btn">Contáctanos</button>
            </a>
          </div>

          <figure className="hero-banner">
            <img
              src={heroBanner_a}
              alt="Modern house model"
              className="w-100"
            />
          </figure>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <figure className="about-banner">
            <img src={aboutBanner_a} alt="House interior" />

            <img src={aboutBanner_b} alt="House interior" className="abs-img" />
          </figure>

          <div className="about-content">
            <p className="section-subtitle">Sobre Nosotros</p>

            <h2 className="h2 section-title">
              Pionero en el mercado de residencias estudiantiles
            </h2>

            <p className="about-text">
              En <b>Pensi</b>, conectamos a estudiantes en Barranquilla con
              alojamientos que se ajustan a sus necesidades.
            </p>
            <p className="about-text">
              Comprometidos con ofrecer un servicio especializado y cercano,
              buscando siempre la mejor opción de vivienda, que se adapte a las
              necesidades específicas de cada persona
            </p>

            <ul className="about-list">
              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="home-outline"></ion-icon>
                </div>

                <p className="about-item-text">Transparencia</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>

                <p className="about-item-text">Seguridad</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="wine-outline"></ion-icon>
                </div>

                <p className="about-item-text">Comodidad</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="leaf-outline"></ion-icon>
                </div>

                <p className="about-item-text">
                  Compromiso con el cliente y la sociedad
                </p>
              </li>
            </ul>

            <p className="callout">
              Trabajamos para que cada estudiante encuentre su hogar ideal que
              inspire su experiencia academica
            </p>

            <a href="#services" className="btn">
              Más Información
            </a>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <br />
        <div className="container">
          <p className="section-subtitle">Nuestros Servicios</p>
          <h2 className="h2 section-title">Nuestro enfoque principal</h2>
          <ul className="service-list">
            <li id="consigue-tu-pen">
              <div className="service-card">
                <div className="card-icon">
                  <img src={serviceImage_a} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="#property">Consigue tu pen</a>
                </h3>
                <p className="card-text">
                  El momento que soñaste ha llegado. Encuentra el lugar perfecto
                  para vivir la mejor etapa de tu vida, donde cada instante se
                  convierte en un recuerdo invaluable. ¡Consigue tu pen y
                  empieza a escribir tu propia historia!
                </p>
                 <a href="#property" className="card-link">
                  <span>Encuentra una casa</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>
            </li>
            {/* <li>
              <div className="service-card">
                <div className="card-icon">
                  <img src={serviceImage_b} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="#">Renta una casa</a>
                </h3>
                <p className="card-text">
                  Con más de 1 millón de casas en venta disponibles en el sitio web,
                  podemos encontrarle una casa a la que querrá llamar hogar.
                </p>
                <a href="#" className="card-link">
                  <span>Contáctanos</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>
            </li> */}
            <li id="publica-tu-pen">
              <div className="service-card">
                <div className="card-icon">
                  <img src={serviceImage_c} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAYAAFrxoTZUMjZVWUhFQVhGVjRWUk5CMVY5M0cyS0JXNS4u">Publica tu pen</a>
                </h3>
                <p className="card-text">
                  Convierte tu espacio en el lugar ideal para vivir momentos
                  únicos y genera ingresos extra al mismo tiempo. Publica tu pen
                  y conéctalo con quienes buscan el escenario perfecto para su
                  próxima gran experiencia. ¡Tu locación, su próximo gran
                  recuerdo!
                </p>
                 <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAYAAFrxoTZUMjZVWUhFQVhGVjRWUk5CMVY5M0cyS0JXNS4u" className="card-link">
                  <span>Contáctanos</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="property" id="property">
        <div className="container">
          <p className="section-subtitle">Propiedades</p>
          <h2 className="h2 section-title">Listas destacadas</h2>
          {/**Inmuebles card */}
          {inmueblesDes.length === 0 ? (
            <p>No se encontraron inmuebles destacados en este momento.</p>
          ) : (
            <ul className="property-list has-scrollbar">
              {inmueblesDes.map((inmueble, index) => (
                <li key={index}>
                  <div className="property-card">
                    <figure className="card-banner">
                      <a href={`/inmuebles/${inmueble.id_inmueble}`}>
                        <img
                          src={obtenerImagenDestacada(inmueble.fotos)}
                          alt={inmueble.title}
                          className="w-100"
                        />
                      </a>
                      <div className="card-badge">
                        {inmueble.porcentaje_descuento > 0 && (
                          <>
                            <i
                              className="fa-solid fa-tags "
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span>{inmueble.porcentaje_descuento}%</span>
                          </>
                        )}
                      </div>
                      <div className="banner-actions">
                        <button disabled className="banner-actions-btn">
                          <ion-icon name="location"></ion-icon>
                          <address>
                            {inmueble.direccion} {inmueble.region}-
                            {inmueble.ciudad}, {inmueble.pais}
                          </address>
                        </button>
                      </div>
                    </figure>
                    <div className="card-content">
                      <div className="card-price">
                        <strong>
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(inmueble.precio)}
                        </strong>{" "}
                        COP
                        {inmueble.precio_descuento > 0 && (
                          <p className="precio-des">
                            Ahora:{" "}
                            {new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                            }).format(
                              inmueble.precio - inmueble.precio_descuento
                            )}{" "}
                            COP
                          </p>
                        )}
                      </div>
                      <h3 className="h3 card-title">
                        <a href={`/inmuebles/${inmueble.id_inmueble}`}>
                          {inmueble.nombre}
                        </a>
                      </h3>
                      <p className="card-text">
                        {expandedIndexes.includes(index)
                          ? inmueble.descripcion
                          : truncateText(inmueble.descripcion, 100)}
                      </p>
                      {inmueble.descripcion.length > 100 && (
                        <button
                          onClick={() => handleToggleReadMore(index)}
                          className="read-more-link"
                        >
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
                        <li className="card-item genero">
                          <strong>{inmueble.genero.descripcion}</strong>
                          <ion-icon name="man-outline"></ion-icon>
                          <span>Genero</span>
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
                    <div className="card-footer">
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
                        <a
                          href={inmueble.link}
                          target="_blank"
                          title="Cotizar vía WhatsApp"
                          rel="noopener noreferrer"
                          className="card-footer-actions-btn whats-btn"
                        >
                          <ion-icon name="logo-whatsapp"></ion-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="container">
          <p className="section-subtitle">Noticias y blogs</p>
          <h2 className="h2 section-title">Últimas noticias</h2>
          {/**Blog card */}
          {novedades.length === 0 ? (
            <p>No se encontraron noticias en este momento.</p>
          ) : (
            <ul className="blog-list has-scrollbar">
              {novedades.map((novedad, index) => (
                <li key={index}>
                  <div className="blog-card">
                    <figure className="card-banner">
                      <img
                        src={`${API_URL}${novedad.url_foto}`}
                        alt={novedades.titulo}
                        className="w-100"
                      />
                    </figure>
                    <div className="blog-content">
                      <div className="blog-content-top">
                        <ul className="card-meta-list">
                          <li>
                            <button className="card-meta-link">
                              <ion-icon name="person"></ion-icon>
                              <span>Por: {novedad.usuario.name}</span>
                            </button>
                          </li>
                          <li>
                            <button className="card-meta-link">
                              <ion-icon name="pricetags"></ion-icon>
                              <span>{novedad.etiqueta}</span>
                            </button>
                          </li>
                        </ul>
                        <h3 className="h3 blog-title">
                          <a
                            href={novedad.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {novedad.titulo}
                          </a>
                        </h3>
                      </div>
                      <div className="blog-content-bottom">
                        <div className="publish-date">
                          <ion-icon name="calendar"></ion-icon>

                          <time dateTime="2022-27-04">May 27, 2024</time>
                        </div>

                        <a
                          href={novedad.link}
                          className="read-more-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Leer más
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-card">
            <div className="card-content">
              <h2 className="h2 card-title">Busca el pen de tus sueños</h2>

              <p className="card-text">
                Podemos ayudarle a hacer realidad su sueño de un nuevo hogar.
              </p>
            </div>

            <a
              href="https://wa.link/7x17bg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn cta-btn"
            >
              <span>Contáctanos</span>

              <ion-icon name="arrow-forward-outline"></ion-icon>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
