import React from 'react'
import { Link } from 'react-router-dom'

const CategaryFindCart = ({item}) => {
  return (
    <li className='categary-mobile-find-li'>
        <Link to={`/san-pham/${item?.slug}`} className='categary-mobile-find-link'>
        <div className='categary-mobile-find-img'>
            <img src={item?.image} />
        </div>
        <div className='categary-mobile-find-detail'>
            <div className='categary-mobile-find-title'>
                <span>{item?.title}</span>
            </div>
            <div className='catargary-mobile-find-kind'>
                <span>Loại : {item?.categary === 'nuoc-hoa-nam' ? "Nước Hoa Nam" :
                item?.categary === 'nuoc-hoa-nu' ? "Nước Hoa Nữ" : 'Nước Hoa Unisex'}</span>
                </div>
                <div className='categary-mobile-find-number'>
                    <span>Số Lượng: {item?.sold} chai</span>
                </div>
                {item?.reduce ? 
                <div className='categary-mobile-find-price'>
                <span>{item?.price} đ</span>
                <span>{item?.reducePrice} đ</span>
            </div>:
                <div className='categary-mobile-find-oldprice'>
                    <span>{item?.price} đ</span>
                </div>
            }
        </div>
        </Link>
    </li>
  )
}

export default CategaryFindCart