import React from 'react'
import './Categary.css';
import CategaryPC from './pc/CategaryPC';
import CategaryMobile from './smartphone/CategaryMobile';
const Categary = ({cache}) => {
  return (
    <div className='categary-container'>
      <div className='grid wide'>
        <div className='row'>
          <div className='col c-0 m-0 l-12'>
            <CategaryPC cache={cache}/>
          </div>
          <div className='col c-12 m-12 l-0'>
            <CategaryMobile cache={cache}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categary