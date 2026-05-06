import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { parsearFecha } from '../utils/dateUtils';

const Biberones = () => {
  const eventos = useSelector(state => state.eventos.eventos);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);
  const [tiempoUltimoBiberon, setTiempoUltimoBiberon] = useState(null);

  const biberonesHoy = useMemo(() => {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    return eventos
      .filter(evt => evt.idCategoria == 35)
      .filter(bib => parsearFecha(bib.fecha) >= inicioDia);
  }, [eventos]); // Se recalcula cada vez que cambia eventos

  useEffect(() => {
    if (biberonesHoy.length > 0) {
      const ultimoBiberonFecha = parsearFecha(biberonesHoy[biberonesHoy.length - 1].fecha);
      setTiempoUltimoBiberon(ultimoBiberonFecha);

      const actualizarTranscurrido = () => {
        const tiempoActual = new Date();
        setTiempoTranscurrido(tiempoActual - ultimoBiberonFecha);
      };

      actualizarTranscurrido();
      const intervalId = setInterval(actualizarTranscurrido, 1000);
      return () => clearInterval(intervalId);
    } else {
      setTiempoUltimoBiberon(null);
      setTiempoTranscurrido(null);
    }
  }, [biberonesHoy]); // Depende del array completo, no solo .length

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
      <h3>Biberones</h3>
      <div className="card" style={{ width: "100%", height: "90%" }}>
        <img src='../materiales/img/mamadera.jpg' className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">
            Total de biberones ingeridos hoy: {biberonesHoy.length}
          </p>
          {tiempoUltimoBiberon ? (
            <p className="card-text">
              <small>Tiempo desde el último biberón: {horasTranscurridas} horas y {minutosTranscurridos} minutos, {segundosTranscurridos} segundos</small>
            </p>
          ) : (
            <p>No se ha registrado ningún biberón hoy</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Biberones
