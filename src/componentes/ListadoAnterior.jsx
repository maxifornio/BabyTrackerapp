import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Evento from './Evento';
import { parsearFecha } from '../utils/dateUtils';

const ListadoAnterior = () => {
  const eventos = useSelector(state => state.eventos.eventos)
  const [eventosViejos, setEventosViejos] = useState([])
  const diaActual = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    setEventosViejos(eventos.filter(evt => {
      const fechaEvento = parsearFecha(evt.fecha).setHours(0, 0, 0, 0); // parsearFecha maneja cualquier formato
      return fechaEvento < diaActual;
    }));
  }, [eventos])

  return (
    <div className='col-12 col-sm-6'>
      <h2>Listado Anterior</h2>
      <ul className="list-group" style={{ maxHeight: '220px', overflowY: 'auto', overflowX: 'hidden' }}>
        {eventosViejos.map(evento => <Evento key={evento.id} {...evento} />)}
      </ul>
    </div>
  )
}

export default ListadoAnterior
