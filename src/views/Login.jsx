import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRequest, showAlert } from '../functions';
import storage from '../storage/storage';


const Login = () => {
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const [emailU, setEmailU] = useState('');
    const [passwordU, setPasswordU] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [nombres, setNombres] = useState('');
    const [tipo_identidad, setTipo_identidad] = useState('');
    const [numero_identidad, setNumero_identidad] = useState('');
    const [check_terminos, setCheck_terminos] = useState(false);
    const [isSubming, setSubming] = useState(false);


    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {

        const value = e.target.value.toLowerCase();

        (login) ? setEmailU(value) : setEmail(value);

        // Validación de correo electrónico
        if (!validateEmail(value)) {
            setEmailError('Por favor ingrese un correo electrónico válido.');
        } else {
            setEmailError('');
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setSubming(true);

        try {
            const response = await sendRequest('POST', { email: emailU, password: passwordU }, '/api/login/client', '', false);
            if (response.status === 200) {
                setEmailU('');
                setPasswordU('');
                storage.set('authToken', response.data.token);
                storage.set('authUser', response.data.cliente);

                setSubming(false);

                navigate('/');
            }
            setSubming(false);
        } catch (err) {
            showAlert('Error: ' + err.message, 'error');
            setSubming(false);
        }


    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setSubming(true);
        try {
            const response = await sendRequest('POST', { type_register: 'client_jmci', nombres: nombres, tipo_identidad: tipo_identidad, numero_identidad: numero_identidad, email: email, password: password, password_confirmation: password_confirmation, terminos: check_terminos }, '/api/clients', '', false);
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                setPassword_confirmation('');
                setNombres('');
                setTipo_identidad('');
                setNumero_identidad('');
                setCheck_terminos(false);

                storage.set('authToken', response.data.token);
                storage.set('authUser', response.data.cliente);

                setSubming(false);

                navigate('/');
            }
            setSubming(false);
        } catch (err) {
            showAlert('Error: ' + err.message, 'error');
            setSubming(false);
        }

    }

    const handleLogin = () => {
        setLogin(!login);
    }

    return (
        <div className="contenedor-login ">
            <div className={`container-form login  ${login ? '' : 'hide'}`}>
                <div className="information">
                    <div className="info-childs">
                        <h2>¡¡Bienvenido nuevamente!!</h2>
                        <p>Para unirte a nuestra comunidad por favor Inicia Sesión con tus datos</p>

                        <button onClick={handleLogin}>{login ? 'Registrarse' : 'Iniciar Sesión'}</button>
                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <h2>Iniciar Sesión</h2>

                        <p>Inicia Sesión con tu cuenta.</p>
                        <form onSubmit={handleSubmitLogin} autoComplete='off' className={`form form-login  `}  >
                            <div>
                                <label>
                                    <i className='bx bx-envelope'></i>
                                    <input type="email" placeholder="Correo Electronico" id="userEmail"
                                        value={emailU}
                                        onChange={handleEmailChange}
                                        name="userEmail"
                                        required />
                                </label>
                            </div>
                            <div className="alerta-error-login">{emailError && <p className="text" style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>{emailError}</p>}</div>
                            <div>
                                <label>
                                    <i className='bx bx-lock-alt'></i>
                                    <input type="password" placeholder="Contraseña" id="userPassword"
                                        value={passwordU}
                                        onChange={(e) => setPasswordU(e.target.value)}
                                        name="userPassword"
                                        required />
                                </label>
                            </div>
                            <div className="btns-form">
                                <button type="submit" disabled={isSubming} className='btn-form-login' >Iniciar Sesión</button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>

            <div className={`container-form register  ${!login ? '' : 'hide'}`}>
                <div className="information">
                    <div className="info-childs">
                        <h2>Bienvenido</h2>
                        <p>Para unirte a nuestra comunidad por favor Inicia Sesión con tus datos</p>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
                <div className="form-information">
                    <div className="form-information-childs">
                        <h2>Crear una Cuenta</h2>

                        <p>¿Que esperas para registrarte?</p>
                        <form onSubmit={handleSubmitRegister} autoComplete='off' className="form form-register" id="formRegister" >

                            <div>
                                <label>
                                    <i className='bx bx-user'></i>
                                    <input type="text" placeholder="Ingrese su nombre completo"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                        name="nombres" required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <i className='bx bx-id-card'></i>
                                    <select name="tipo_identidad" id=""
                                        value={tipo_identidad} onChange={(e) => setTipo_identidad(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona un tipo documento</option>
                                        <option value="CC">Cedula de ciudadania</option>
                                        <option value="CC DIG">Cédula digital</option>
                                        <option value="CEX">Cedula de extranjera</option>
                                        <option value="pasaporte">Pasaporte</option>
                                    </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                    <i className='bx bx-hash'></i>

                                    <input type="number" placeholder="Número de identificacion"
                                        value={numero_identidad} onChange={(e) => setNumero_identidad(e.target.value)}
                                        name="numero_identidad" required />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <i className='bx bx-envelope'></i>
                                    <input type="email" placeholder="Correo Electronico"
                                        required
                                        value={email} onChange={handleEmailChange}
                                        name="email" />
                                </label>
                            </div>
                            <div className="alerta-error-login">{emailError && <p className="text" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{emailError}</p>}</div>
                            <div>
                                <label>
                                    <i className='bx bx-lock-alt'></i>
                                    <input type="password" placeholder="Contraseña"
                                        required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        minLength={8}
                                        name="password" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <i className='bx bx-lock-alt'></i>
                                    <input type="password"
                                        required
                                        value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)}
                                        minLength={8}
                                        placeholder="Confirmar contraseña" name="password_confirmation" />
                                </label>
                            </div>

                            <div style={{ marginTop: "15px", color: "#000", padding: "10px 0" }}>
                                <label style={{ padding: "10px 0", fontSize: "13px !important", background: "transparent", border: "none", boxShadow: "none" }}>
                                    <input
                                        style={{ width: "auto", marginLeft: "15px", marginRight: "10px" }}
                                        type="checkbox"
                                        name="aceptoTerminos"
                                        required
                                        checked={check_terminos}
                                        onChange={(e) => setCheck_terminos(e.target.checked)}
                                    />
                                    Acepto los
                                    <a style={{ marginLeft: "5px" }} href="/terminos" target="_blank" rel="noopener noreferrer">
                                        Términos y Condiciones
                                    </a>
                                </label>

                            </div>

                            <div className='btns-form'>
                                <button type="submit" disabled={isSubming} className='btn-form-login' >Registrarse</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Login