import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarCategorias } from '../features/categoriasSlice';
import moment from 'moment';

import { toast } from 'react-toastify';
import { guardarEvento, setUltimo } from '../features/eventosSlice';
import { setAnteUltimoBiberon, setTiempoUltimoBiberon, setUltimosBiberones } from '../features/biberonSlice';
import { setTiempoUltimoPanial, setUltimosPanales } from '../features/panalSlice';

const Agregar = () => {

  const [categorias, setCategorias] = useState([])
  const eventos = useSelector(state => state.eventos.eventos)
  const biberonActual = useSelector(state => state.biberon.ultimoBiberon);

  const cat = useRef(null);
  const detalle = useRef(null);
  const fecha = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('datetime').setAttribute('max', today);
    
    fetch("https://babytracker.develotion.com/categorias.php", {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'apikey': localStorage.getItem('apikey'),
        'iduser': localStorage.getItem('id')
      }
    })
      .then(r => r.json())
      .then(datos => {
        setCategorias(datos.categorias);
      })
  }, []);
  
  const Agregar = () => {
    let fechaFiltrada;
    if (fecha.current.value === "") {
      // Sin fecha manual → usar momento actual
      fechaFiltrada = moment().format('YYYY-MM-DD HH:mm:ss');
    } else {
      // Con fecha del input type="date" → solo viene "YYYY-MM-DD"
      // Le agregamos la hora actual para que no quede como medianoche UTC
      const horaActual = moment().format('HH:mm:ss');
      fechaFiltrada = `${fecha.current.value} ${horaActual}`;
    }
    
    let datos = {
      "idCategoria": Number(cat.current.value),
      "idUsuario": Number(localStorage.getItem('id')),
      "detalle": detalle.current.value,
      "fecha": fechaFiltrada,
    }

    fetch("https://babytracker.develotion.com/eventos.php", {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'apikey': localStorage.getItem('apikey'),
        'iduser': localStorage.getItem('id')
      },
    })
      .then((response) => response.json())
      .then((json) => { 
        if (datos.idCategoria != 0) {
          datos.id = json.idEvento;
          dispatch(guardarEvento(datos));

          const fechaTraida = new Date(datos.fecha.replace(' ', 'T')).setHours(0, 0, 0, 0); 
          const diaActual = new Date().setHours(0, 0, 0, 0);

          if (datos.idCategoria == 35 && fechaTraida == diaActual) {   
            const tiempoActual = new Date().toISOString(); 
            if (biberonActual != null) {
              dispatch(setAnteUltimoBiberon(biberonActual));
            }
            if (biberonActual == null) {
              dispatch(setAnteUltimoBiberon(null));
            }
            dispatch(setUltimo(tiempoActual));
            dispatch(setTiempoUltimoBiberon(tiempoActual));
            dispatch(setUltimosBiberones(datos));
          }

          if (datos.idCategoria == 33) {
            const tiempoActual = new Date().toISOString();
            dispatch(setTiempoUltimoPanial(tiempoActual));
            dispatch(setUltimosPanales(datos));
          }

          toast.success('¡Evento agregado!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          fecha.current.value = "";
          detalle.current.value = "";
          cat.current.value = "";

        } else {
          toast.error("Debe seleccionar una categoría.", {
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
      })
  }

  return (
    <>
      <section className="row justify-content-center p-3 p-md-5 coso">
        <h2 className="text-center mb-3">
          Agregar <span>evento</span>
        </h2>
        <form action="#" className="">
          <label htmlFor="categoria">Categoría </label>
          <select className="form-select form-select-lg mb-3" id="categoria" ref={cat} aria-label="Large select example">
            <option value="">Seleccionar</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>
                {c.tipo}
              </option>
            ))}
          </select>

          <label htmlFor="datetime">Fecha y hora</label>
          <input
            type="date"
            placeholder="fecha y hora"
            required=""
            id="datetime"
            ref={fecha}
            className="w-100 p-2 mb-3"
          />
          <label htmlFor="detalles">Detalles</label>
          <input
            type="textarea"
            placeholder="Ingrese los detalles (Opcional)"
            required=""
            id="detalles"
            ref={detalle}
            className="w-100 p-2 mb-3"
          />
          <input type="button" defaultValue="Agregar" className="w-100 mb-3" onClick={Agregar} style={{ padding: '12px', background: 'linear-gradient(135deg, #e91e8c, #c2185b)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px', transition: 'opacity 0.2s' }}/>
        </form>
      </section>
    </>
  )
}

export default Agregar
