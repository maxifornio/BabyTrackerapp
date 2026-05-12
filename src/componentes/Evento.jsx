import { useDispatch, useSelector } from "react-redux";
import { eliminarEvento, setUltimo } from "../features/eventosSlice";
import { useEffect, useState } from "react";
import { eliminarUltimoBiberon, setTiempoUltimoBiberon } from "../features/biberonSlice";
import { parsearFecha } from "../utils/dateUtils";

const Evento = ({id, detalle, idCategoria, fecha}) => {
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.categorias.categorias)
    const [img, setImg] = useState('');
    const anteUltimo = useSelector(state => state.biberon.anteUltimoBiberon);
    const eventos = useSelector(state => state.eventos.eventos);

    useEffect(() => {
        if(categorias != null){
            if(idCategoria != '' && idCategoria != null){
                const catEncontrada = categorias.find(c => c.id === idCategoria);   
                setImg(catEncontrada.imagen);
            }
        }
    }, [])

    const eventoPorId = (id) => {
        return eventos.find(evt => evt.id === id);
    };

    const eliminar = () => {    
            fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'apikey': localStorage.getItem('apikey'),
                    'iduser': localStorage.getItem('id')
                },
            })
            .then((response) => response.json())
            .then((json) => {
                const evento = eventoPorId(id);        
                if(evento.idCategoria == 35){
                    dispatch(setTiempoUltimoBiberon(anteUltimo))
                    dispatch(eliminarUltimoBiberon(id));
                }
                dispatch(eliminarEvento(id)); 
            });
    }


    const fechaObj = parsearFecha(fecha);
    const fechaFormateada = fechaObj
        ? (() => {
            const pad = n => String(n).padStart(2, '0');
            return `${pad(fechaObj.getDate())}/${pad(fechaObj.getMonth()+1)} ${pad(fechaObj.getHours())}:${pad(fechaObj.getMinutes())}`;
          })()
        : '';

    return (
        <li className="list-group-item list-group-item-info">
            <img className="m-2" src={`https://babytracker.develotion.com/imgs/${img}.png`}/>
            <div style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle' }}>
                {fechaFormateada && (
                    <span style={{ fontSize: '11px', color: '#C2185B', fontWeight: 600 }}>{fechaFormateada}</span>
                )}
                {detalle && <span>{detalle}</span>}
            </div>
            <button className="m-2" id="boton" onClick={eliminar}>Eliminar</button>
        </li>
    )
}

export default Evento