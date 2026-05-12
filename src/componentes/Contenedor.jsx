import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Contenedor = () => {
  const location = useLocation();
  const esAuthPage = location.pathname === '/' || location.pathname === '/registrar';

  return (
    <div className={esAuthPage ? '' : 'container'}>
      <main className={esAuthPage ? '' : 'row'}>
        <Outlet />
      </main>
    </div>
  )
}

export default Contenedor
