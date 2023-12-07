import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';

const Cargando = () => {
  return (
    <div className='flex justify-content-center align-items-center'>
      <div>
        <ProgressSpinner />
        <h5>Por favor espere...</h5>
      </div>
    </div>
  )
}

export default Cargando
