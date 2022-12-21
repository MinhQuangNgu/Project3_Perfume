import React from 'react'
import './CategaryPC.css';
import {Link} from 'react-router-dom';
import PerfumeNam from './PerfumeNam';
const CategaryPC = ({cache}) => {
  return (
    <div className='categary-pc-container'>
        <div className='row h_100'>
            <div className='col l-3'>
                <div className='categary-pc-brand'>
                    <Link to="/" className='Link'>
                      <h1 className='categary-pc-brand-h1'>SCO PERFUME</h1>
                      <p className='categary-pc-brand-p'>Bảo hành đến giọt cuối cùng</p>
                    </Link>
                </div>
            </div>
            <div className='col l-9'>
              <div className='categary-pc-kind'>
                <ul className='categary-pc-kind-ul'>
                  
                  <PerfumeNam cache={cache} infor={'Thương Hiệu'} />
                  <PerfumeNam cache={cache} infor={'Nước Hoa Nam'} kind={'nuoc-hoa-nam'}/>
                  <PerfumeNam cache={cache} infor={'Nước Hoa Nữ'} kind={'nuoc-hoa-nu'}/>

                  <li className='categary-pc-kind-li'>
                    <Link style={{color:"black"}} to='/nuoc-hoa-unisex' className='Link'>
                      NƯỚC HOA UNISEX
                    </Link>
                  </li>
                  <li className='categary-pc-kind-li'>
                    <Link style={{color:"black"}} to={`/nuoc-hoa/top`} className='Link'>
                      TOP 2022
                    </Link>
                    <div className='categary-pc-top-2022'>
                      HOT
                    </div>
                  </li>
                  <li className='categary-pc-kind-li'>
                    <Link style={{color:"black"}} to='/nuoc-hoa/sale' className='Link'>
                      SALE OFF
                    </Link>
                    <div className='categary-pc-sale'>
                      SALE
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CategaryPC