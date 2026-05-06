import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { parsearFecha } from '../utils/dateUtils';

const Panales = () => {
  const eventos = useSelector(state => state.eventos.eventos);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);
  const [tiempoUltimoPanal, setTiempoUltimoPanal] = useState(null);

  const panalesHoy = useMemo(() => {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    return eventos
      .filter(evt => evt.idCategoria == 33)
      .filter(pan => parsearFecha(pan.fecha) >= inicioDia);
  }, [eventos]); // Se recalcula cada vez que cambia eventos

  useEffect(() => {
    if (panalesHoy.length > 0) {
      const ultimoPanialFecha = parsearFecha(panalesHoy[panalesHoy.length - 1].fecha);
      setTiempoUltimoPanal(ultimoPanialFecha);

      const actualizarTranscurrido = () => {
        const tiempoActual = new Date();
        setTiempoTranscurrido(tiempoActual - ultimoPanialFecha);
      };

      actualizarTranscurrido();
      const intervalId = setInterval(actualizarTranscurrido, 1000);
      return () => clearInterval(intervalId);
    } else {
      setTiempoUltimoPanal(null);
      setTiempoTranscurrido(null);
    }
  }, [panalesHoy]); // Depende del array completo, no solo .length

  let horasTranscurridas = 0;
  let minutosTranscurridos = 0;
  let segundosTranscurridos = 0;

  if (tiempoTranscurrido != null) {
    horasTranscurridas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
    minutosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));
    segundosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60)) / 1000);
  }

  return (
    <div className='col coso'>
      <h3>Pañales</h3>
      <div className="card" style={{ width: "100%", height: "90%" }}>
        <img src='../materiales/img/panal.jpg' className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">
            Total de pañales cambiados en el dia: {panalesHoy.length}
          </p>
          <div className="card-text">
            {tiempoUltimoPanal ? (
              <p className="card-text">
                <small>Tiempo desde el último cambio: {horasTranscurridas} horas y {minutosTranscurridos} minutos, {segundosTranscurridos} segundos</small>
              </p>
            ) : (
              <p>No se ha registrado ningún cambio de pañal hoy</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panales
