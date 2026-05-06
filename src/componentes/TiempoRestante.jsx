import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUltimo } from '../features/eventosSlice';
import { parsearFecha } from '../utils/dateUtils';

const TiempoRestante = () => {
  const dispatch = useDispatch();
  const eventos = useSelector(state => state.eventos.eventos);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [estaPasado, setEstaPasado] = useState(false);

  const biberonesHoy = useMemo(() => {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    return eventos
      .filter(evt => evt.idCategoria == 35)
      .filter(evt => parsearFecha(evt.fecha) >= inicioDia);
  }, [eventos]); // Se recalcula cada vez que cambia eventos

  useEffect(() => {
    if (biberonesHoy.length > 0) {
      const ultimaFecha = biberonesHoy[biberonesHoy.length - 1].fecha;
      dispatch(setUltimo(ultimaFecha));

      const calcularTiempoRestante = () => {
        const ultimoTiempo = parsearFecha(ultimaFecha);
        const proximoBiberon = new Date(ultimoTiempo.getTime() + 4 * 60 * 60 * 1000);
        const diferenciaTiempo = proximoBiberon - new Date();

        setEstaPasado(diferenciaTiempo < 0);
        setTiempoRestante(Math.max(diferenciaTiempo, 0));
      };

      calcularTiempoRestante();
      const intervalId = setInterval(calcularTiempoRestante, 1000);
      return () => clearInterval(intervalId);

    } else {
      setEstaPasado(true);
      setTiempoRestante(null);
    }
  }, [biberonesHoy]); // Array completo, no .length

  const horas = tiempoRestante != null ? Math.floor(tiempoRestante / (1000 * 60 * 60)) : 0;
  const minutos = tiempoRestante != null ? Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)) : 0;
  const segundos = tiempoRestante != null ? Math.floor((tiempoRestante % (1000 * 60)) / 1000) : 0;

  const colorTexto = estaPasado ? 'red' : 'green';

  return (
    <div className='card zonaBiberon' style={{ width: "100%", height: "90%", color: colorTexto }}>
      <div className="card-body">
        <h3 className="card-text">
          <strong>
            {estaPasado
              ? '¡El bebé debería haber tomado su biberón!'
              : `Próximo biberón en ${horas} horas, ${minutos} minutos y ${segundos} segundos`}
          </strong>
        </h3>
      </div>
    </div>
  )
}

export default TiempoRestante
