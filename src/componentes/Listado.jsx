import React from 'react'
import ListadoAnterior from './ListadoAnterior'
import ListadoDiario from './ListadoDiario'

const Listado = () => {
  return (
    <>
      <div className='row justify-content-center px-2 pb-2 coso' style={{ overflowX: 'hidden', paddingTop: '48px' }}>
        <ListadoAnterior />
        <ListadoDiario />
      </div>
    </>
  )
}

export default Listado
