import { useRef, useState } from "react"
import { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";

const Registro = () => {

   let navigate = useNavigate();
    if (localStorage.getItem("user") != null) {
        navigate('/dashboard');
    }

    const nombre = useRef(null);
    const contra = useRef(null);
    const ciudad = useRef(null);
    const departamento = useRef(null);
    const [depas, setDepas] = useState([]);
    const [laciudad, setCiudad] = useState([]);

    useEffect(() => {
        fetch("https://babytracker.develotion.com/departamentos.php")
            .then(r => r.json())
            .then(datos => {
              setDepas(datos.departamentos);            
                
            })

    }, []);

    const Ciudades = (evento) => {
        const departamentoId = evento.target.value;

        if (departamentoId != "") {
            fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${departamentoId}`)
                .then(r => r.json())
                .then(datos => {
                    setCiudad(datos.ciudades);
                })
                .catch(error => {
                    console.error("Error al obtener las ciudades:", error);
                });
        } else {
            setCiudad([]);
        }
    };


    const guardarUsuario = () => {
        let nombreusuario = nombre.current.value;
        let contrausuario = contra.current.value;
        let depausuario = departamento.current.value;
        let ciudadusuario = ciudad.current.value;
        if (depausuario != "" && ciudadusuario != ""){
            console.log(ciudadusuario, depausuario);

        let usuarionuevo = {
            usuario: nombreusuario,
            password: contrausuario,
            idDepartamento: depausuario,
            idCiudad: ciudadusuario
        }
        
            fetch('https://babytracker.develotion.com/usuarios.php', {
                method: 'POST',
                body: JSON.stringify(usuarionuevo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    usuarionuevo.id = json.id;
                    if (json.codigo == 200) {

                        let usuarioArmado = {
                            usuario: nombreusuario,
                            password: contrausuario
                        }
                
                        fetch('https://babytracker.develotion.com/login.php',{
                            method: 'POST',
                            body: JSON.stringify(usuarioArmado),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            if (json.codigo == 200) {
                                localStorage.setItem("user", nombreusuario);
                                localStorage.setItem("id", json.id);
                                localStorage.setItem("apikey", json.apiKey);                
                                navigate('/dashboard');
                            }
                        }
                        )}
                    
                    else {
                     toast.error(json.mensaje, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });

                        }
                    }
                
                )
                    

    } else {
        toast.error("No se pudo registrar, verifique su departamento o ciudad", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
}
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
                    letter-spacing: 1px;
                }
                .login-subtitle {
                    font-size: 14px;
                    color: #ad5b7a;
                    margin: 0 0 24px;
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
                .login-field input, .login-field select {
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
                .login-field input:focus, .login-field select:focus {
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
                .login-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
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
                    <h2 className="login-title">Crear cuenta</h2>
                    <p className="login-subtitle">Completá tus datos para registrarte</p>

                    <div className="login-field">
                        <label htmlFor="txtUsuario">Nombre de usuario</label>
                        <input type="text" id="txtUsuario" ref={nombre} placeholder="Tu nombre de usuario" />
                    </div>

                    <div className="login-field">
                        <label htmlFor="txtContra">Contraseña</label>
                        <input type="password" id="txtContra" ref={contra} placeholder="••••••••" />
                    </div>

                    <div className="login-field">
                        <label>Departamento</label>
                        <select ref={departamento} onChange={Ciudades}>
                            <option value="">Seleccione su Departamento</option>
                            {depas.map(dep => (
                                <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="login-field">
                        <label>Ciudad</label>
                        <select ref={ciudad} disabled={!laciudad.length}>
                            <option value="">Seleccione su Ciudad</option>
                            {laciudad.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <button className="login-btn" type="button" onClick={guardarUsuario}>
                        Registrarse
                    </button>

                    <Link className="login-register" to='/'>
                        ¿Ya tenés cuenta? Iniciá sesión
                    </Link>
                </div>
            </div>
        </>
    )
}


export default Registro


//                <ListarPaises />
//            <Link to='/'>Login</Link>


/*
function completarSelectDepartamentos(departamentos)
{
console.log("cosas", departamentos);
/*
    let select = dqs("Select-Departamento")

    for(let d of departamentos)
    departamento +=  `<option value="${d.id}">${d.nombre}</option>`
    ObtenerCiudades();
   
}

function completarSelectCiudades(ciudades)
{
    let select = dqs("Select-Ciudades")
    select.innerHTML = ""
    for(let c of ciudades)
    select.innerHTML +=  `<option value="${d.id}">${d.nombre}</option>`
}


function ObtenerCiudades(evt){
    let idDepartamento = evt.detail.value //el id del depto sleccionado
    console.log("departamento seleccionado "+idDepartamento)

    fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
        },
})
        .then(function (response) {
                console.log(response);
                return response.json();
        }).then(function (data) {
                console.log(data);
                completarSelectCiudades(data.ciudades)
        }
        )}
    
*/