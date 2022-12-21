import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import './Header.css';
import HeaderPC from './pc/HeaderPC';
import HeaderMobile from './smartphone/HeaderMobile';
const Header = () => {

  const appear = useRef();
  const {pathname} = useLocation();

  useEffect(() => {
    appear.current.scrollIntoView();
  },[pathname]);
  return (
    <div ref={appear}  className='header-container'>
      <div className='grid wide'>
        <div className='row'>
          <div className='col c-0 m-0 l-12'>
            <HeaderPC />
          </div>
          <div className='col c-12 m-12 l-0'>
            <HeaderMobile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header