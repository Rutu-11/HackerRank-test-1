import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000);
  const [slideShowActive, setSlideShowActive] = useState(false);

 useEffect(()=>{
  let timer;
  if(slideShowActive){
     timer = setInterval(()=>{
      nextImage();
    }, slideDuration);
    setSlideTimer(timer)
  }
  else{
    clearInterval(timer)
  }
    return ()=>{
      clearInterval()
    }
 },[slideShowActive, activeIndex])


 const nextImage = ()=>{
  setActiveIndex((prev)=>(prev === catalogs.length -1 ? 0: prev+1))
 }

 const prevImage = ()=>{
  setActiveIndex((prev)=>(prev === 0 ? catalogs.length -1: prev-1))
 }

 const handleThumbClick = (index)=>{
  setActiveIndex(index);
 }

 const handleSlideShowToggle = ()=>{
  setSlideShowActive((prev)=>!prev)
 }
  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={prevImage}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
                onThumbClick={handleThumbClick}
                data-testid = "thumb-buttons"
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={nextImage}
            >
              <i className="material-icons" >arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            onChange={handleSlideShowToggle}
            checked={slideShowActive}
            data-testid='toggle-slide-show-button'
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

