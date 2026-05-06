import React from 'react'
import Biberones from './Biberones'
import Panales from './Panales'

const InformeEventos = () => {
  return (
    <>
    <div className='coso' style={{ width: '100%' }}>
      <h2 className='text-center'>Informe de Eventos</h2>
      <div className='row'>
        <Biberones />
        <Panales />
      </div>
    </div>
   
    </>
  )
}

export default InformeEventos