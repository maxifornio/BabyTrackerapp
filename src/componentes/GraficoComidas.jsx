import React, { useEffect, useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { parsearFecha } from '../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Comidas / Dia' },
  },
};

const GraficoComidas = () => {
  const eventos = useSelector(state => state.eventos.eventos);

  // Genera los últimos 7 días como strings "lun 27", "mar 28", etc.
  const ultimos7Dias = useMemo(() => {
    const hoy = new Date();
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() - i);
      dia.setHours(0, 0, 0, 0);
      dias.push(dia);
    }
    return dias;
  }, []);

  // Etiquetas para el gráfico
  const labels = ultimos7Dias.map(d =>
    d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
  );

  // Cuenta comidas por día usando parsearFecha para manejar cualquier formato
  const cantidadComidas = useMemo(() => {
    return ultimos7Dias.map(dia => {
      const siguiente = new Date(dia);
      siguiente.setDate(dia.getDate() + 1);

      return eventos.filter(evt => {
        if (evt.idCategoria != 31) return false;
        const fechaEvento = parsearFecha(evt.fecha);
        return fechaEvento >= dia && fechaEvento < siguiente;
      }).length;
    });
  }, [eventos, ultimos7Dias]);

  return (
    <div className='col-6 white cantidades'>
      <section className="justify-content-center">
        <h2 className="text-center mb-3">
          Grafico de <span>Comidas</span>
        </h2>
        <Bar className="m-2" options={options} data={{
          labels,
          datasets: [{
            label: 'Cantidad de comidas',
            data: cantidadComidas,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }]
        }} />
      </section>
    </div>
  )
}

export default GraficoComidas
