import { useEffect, useId } from 'react';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';

const Login = () => {

    let navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        if (localStorage.getItem("user") != null) {
            navigate('/dashboard');
        }
    }, []);

    const idUser = useId();
    const idPass = useId();
    const user = useRef(null);
    const pass = useRef(null);
    const [Deshabilitado, setHabilitar] = useState(true);

    const HabilitarBoton = () => {
        if (user.current.value === "" || pass.current.value === "") {
            setHabilitar(true);
        } else {
            setHabilitar(false);
        }
    };

    const ingresar = () => {
        fetch('https://babytracker.develotion.com/login.php', {
            method: 'POST',
            body: JSON.stringify({ usuario: user.current.value, password: pass.current.value }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then(r => r.json())
            .then(json => {
                if (json.codigo == 200) {
                    localStorage.setItem("user", user.current.value);
                    localStorage.setItem("id", json.id);
                    localStorage.setItem("apikey", json.apiKey);
                    navigate('/dashboard');
                } else {
                    toast.error("Usuario y/o contraseña incorrectos", {
                        position: "top-center", autoClose: 5000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: true, draggable: true,
                        theme: "colored", transition: Bounce,
                    });
                }
            });
    };

    return (
        <>
            <style>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Segoe UI', system-ui, sans-serif;
                }
                .login-card {
                    background: white;
                    border-radius: 24px;
                    padding: 48px 40px 36px;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 8px 48px rgba(194, 90, 130, 0.22);
                    text-align: center;
                }
                .login-icon {
                    width: 72px;
                    height: 72px;
                    background: #fce4ec;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 32px;
                }
                .login-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #880e4f;
                    margin: 0 0 6px;
                    font-family: Bebas, 'Segoe UI', sans-serif;
                    letter-spacing: 1px;
                }
                .login-subtitle {
                    font-size: 14px;
                    color: #ad5b7a;
                    margin: 0 0 32px;
                }
                .login-field {
                    margin-bottom: 16px;
                    text-align: left;
                }
                .login-field label {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #880e4f;
                    margin-bottom: 6px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .login-field input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1.5px solid #f8bbd0;
                    border-radius: 12px;
                    font-size: 15px;
                    color: #4a0030;
                    background: #fff9fb;
                    outline: none;
                    box-sizing: border-box;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .login-field input:focus {
                    border-color: #e91e8c;
                    box-shadow: 0 0 0 3px rgba(233, 30, 140, 0.1);
                }
                .login-btn {
                    width: 100%;
                    padding: 13px;
                    background: linear-gradient(135deg, #e91e8c, #c2185b);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 8px;
                    letter-spacing: 0.5px;
                    transition: opacity 0.2s, transform 0.1s;
                }
                .login-btn:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                .login-btn:disabled {
                    background: #f8bbd0;
                    color: #c48a9f;
                    cursor: not-allowed;
                }
                .login-hint {
                    margin-top: 20px;
                    padding: 12px 16px;
                    background: #fce4ec;
                    border-radius: 10px;
                    font-size: 13px;
                    color: #ad5b7a;
                    line-height: 1.6;
                }
                .login-register {
                    display: block;
                    margin-top: 20px;
                    font-size: 14px;
                    color: #e91e8c;
                    text-decoration: none;
                    font-weight: 500;
                }
                .login-register:hover { text-decoration: underline; }
            `}</style>

            <div className="login-page">
                <div className="login-card">
                    <div className="login-icon">👶</div>
                    <h2 className="login-title">Bienvenido</h2>
                    <p className="login-subtitle">Ingresá para continuar con el seguimiento</p>

                    <div className="login-field">
                        <label htmlFor={idUser}>Usuario</label>
                        <input type="text" id={idUser} ref={user} onChange={HabilitarBoton} placeholder="Tu nombre de usuario" />
                    </div>

                    <div className="login-field">
                        <label htmlFor={idPass}>Contraseña</label>
                        <input type="password" id={idPass} ref={pass} onChange={HabilitarBoton} placeholder="••••••••" />
                    </div>

                    <button className="login-btn" type="button" onClick={ingresar} disabled={Deshabilitado}>
                        Ingresar
                    </button>


                    <Link className="login-register" to='/registrar'>
                        ¿No tenés cuenta? Registrate acá
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
