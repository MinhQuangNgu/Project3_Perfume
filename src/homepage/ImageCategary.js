import React from 'react'
import {useNavigate} from 'react-router-dom';
const ImageCategary = ({image,slug}) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/san-pham/${slug}`);
  }
  return (
    <img onClick={handleNavigate} src={image} className='home-categary-image'/>
  )
}

export default ImageCategary