import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Evento from './Evento'
import { parsearFecha } from '../utils/dateUtils';

const ListadoDiario = () => {
  const eventos = useSelector(state => state.eventos.eventos)
  const [eventosActuales, setEventosActuales] = useState([])
  const diaActual = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    setEventosActuales(eventos
      .filter(evt => {
        const fechaEvento = parsearFecha(evt.fecha).setHours(0, 0, 0, 0);
        return fechaEvento === diaActual;
      })
      .sort((a, b) => parsearFecha(b.fecha) - parsearFecha(a.fecha))
    );
  }, [eventos])

  return (
    <div className='col-12 col-sm-6'>
      <h2>Listado Diario</h2>
      <ul className="list-group" style={{ maxHeight: '220px', overflowY: 'auto', overflowX: 'hidden' }}>
        {eventosActuales.map(evento => <Evento key={evento.id} {...evento} />)}
      </ul>
    </div>
  )
}

export default ListadoDiario
