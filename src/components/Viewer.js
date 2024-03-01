import React from 'react'

function Viewer({ catalogImage, ...props }) {
  return (
    <div className='layout-row justify-content-center'>
      <img 
        alt='catalog-view' 
        className='w-75' 
        src={catalogImage}
        data-testid='catalog-view' 
        {...props}
      />
    </div>
  )
}

export default Viewer

