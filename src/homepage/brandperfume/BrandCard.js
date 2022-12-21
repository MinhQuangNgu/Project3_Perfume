import React from 'react'
import { Link } from 'react-router-dom'
import './BrandCard.css';
const BrandCard = ({item}) => {
  return (
    <div className='col c-4 m-3 l-2'>
        <div className='home-brand_container-detail'>
            <Link to={`/brands/${item?.slug}`} className='Link-brand-card'>
                <img src={item?.image} />
            </Link>
        </div>
    </div>
  )
}

export default BrandCard