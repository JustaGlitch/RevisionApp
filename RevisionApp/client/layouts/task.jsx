import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';
import bg1 from '../assets/img/b1.jpg'
import bg2 from '../assets/img/b2.jpg'
import bg3 from '../assets/img/b3.jpg'
import bg4 from '../assets/img/b4.jpg'
import bg5 from '../assets/img/b5.jpg'
import bg6 from '../assets/img/b6.jpg'

function index() {
  const bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
  const [background, setBackground] = useState(bg1)
  useEffect(() => {
  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * bgs.length);
    setBackground(bgs[randomIndex]);
  }, 5000);
  return () => {
    clearInterval(intervalId);
  };
}, []);
  const bgColor = '#5db470'
  const textColor = 'white'
  return (
    <>
      <Header/>
        <div className='task-page h-100'  style={{background: `url(${background}) center/cover no-repeat`}}>
          <div className='container h-100'>
            <div className='row my-5'>
              <Outlet/>
            </div>
          </div>
        </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
