import React, { useEffect, useState } from 'react';
import { sendRequest } from '../functions';


function Filtros({ applyFilters }) {
    const [generos, setGeneros] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [servicios_ex, setServicios_ex] = useState([]);


    const [filters, setFilters] = useState({
        precio_min: '',
        precio_max: '',
        descuento_min: '',
        descuento_max: '',
        region: '',
        pais: '',
        ciudad: '',
        ubicacion: '',
        min_habitaciones: '',
        max_habitaciones: '',
        id_genero: '',
        id_servicio_extra: '',
        id_tipo_servicio: '',
        metros: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanedFilters = Object.keys(filters)
            .filter(key => filters[key] !== '')
            .reduce((obj, key) => {
                obj[key] = filters[key];
                return obj;
            }, {});

        applyFilters(cleanedFilters);
    };

    const fetchData = async () => {
        const respons = await sendRequest('GET', {}, '/api/generos', '', false);
        setGeneros(respons.generos || []);

        const respo = await sendRequest('GET', {}, '/api/servicios', '', false);
        setServicios(respo.servicios || []);

        const response = await sendRequest('GET', {}, '/api/servicios/extra', '', false);
        setServicios_ex(response.servicios_extra || []);
    };

    useEffect(() => {
        fetchData();

    }, [])

    return (
        <div className="filtros">
            <form onSubmit={handleSubmit}>
                <h3 className="titulo-filtro">Filtros personalizados</h3>
                {generos.length > 0 && (
                    <div>
                        <label>Géneros</label>
                        <select name="id_genero" value={filters.id_genero} onChange={handleChange}>
                            <option value="">Seleccione un género</option>
                            {generos.map((genero) => (
                                <option key={genero.id_genero} value={genero.id_genero}>{genero.descripcion}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label>Precio máximo</label>
                    <input type="number" name="precio_max" value={filters.precio_max} onChange={handleChange} />
                </div>
                {servicios.length > 0 && (
                    <div>
                        <label>Servicios</label>
                        <select name="id_tipo_servicio" value={filters.id_tipo_servicio} onChange={handleChange}>
                            <option value="">Seleccione un servicio</option>
                            {servicios.map((servicio) => (
                                <option key={servicio.id_tipo_servicio} value={servicio.id_tipo_servicio}>{servicio.descripcion}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label>Metros cuadrados</label>
                    <input type="number" name="metros" value={filters.metros} onChange={handleChange} />
                </div>
                <div>
                    <label>Ubicación</label>
                    <input list="ubicacion-list" name="ubicacion" value={filters.ubicacion} onChange={handleChange} />
                    <datalist id="ubicacion-list">
                        <option value="Bogotá" />
                        <option value="Medellín" />
                        <option value="Cartagena" />
                        <option value="Santa Marta" />
                        <option value="Cali" />
                        <option value="Barranquilla" />
                        <option value="San Andrés" />
                        <option value="Pereira" />
                        <option value="Manizales" />
                        <option value="Bucaramanga" />
                    </datalist>
                </div>
                <div>
                    <label>Habitaciones</label>
                    <input type="number" name="max_habitaciones" value={filters.max_habitaciones} onChange={handleChange} />
                </div>
                {servicios_ex.length > 0 && (
                    <div>
                        <label>Servicios Extras</label>
                        <select name="id_servicio_extra" value={filters.id_servicio_extra} onChange={handleChange}>
                            <option value="">Seleccione un servicio extra</option>
                            {servicios_ex.map((servicio_ex) => (
                                <option key={servicio_ex.id_servicio_extra} value={servicio_ex.id_servicio_extra}>{servicio_ex.descripcion}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="btn-submit-filter" type="submit">Aplicar Filtros</button>
            </form>
        </div>
    );
}

export default Filtros;
