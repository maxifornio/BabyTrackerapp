import React from 'react'
import GraficoCantidades from './GraficoCantidades'
import GraficoComidas from './GraficoComidas'
import TiempoRestante from './TiempoRestante'

const Analisis = () => {
  return (
    <div className='coso' style={{ width: '100%' }}>
      <h2 className='text-center'>Analisis</h2>
      <div className='row'>
        <TiempoRestante />
      </div>
      <div className='row'>
        <GraficoCantidades />
        <GraficoComidas />
      </div>
    </div>
  )
}

export default Analisis
