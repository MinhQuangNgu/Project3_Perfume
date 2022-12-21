import React from 'react'
import { Link } from 'react-router-dom'

const ProductSearch = ({item,setProductFind}) => {
  return (
    <li className='header-pc-find-product-container-li'> 
        <Link onClick={() => setProductFind([])} className='header-pc-find-link' to={`/san-pham/${item?.slug}`}>
            <div className='header-pc-find-product-image'>
                <img src={item?.image} />
            </div>
            <div className='header-pc-find-product-detail'>
                <div className='header-pc-find-title-container'>
                    <span className='header-pc-find-title'>{item?.title}</span>
                </div>
                <div className='header-pc-find-product-kind'>
                    <span>Loại: {item?.categary === 'nuuoc-hoa-nam' ? 'Nước Hoa Nam' : item?.categary === 'nuoc-hoa-nu' ?
                    "Nước Hoa Nữ" : "Nước Hoa Unisex"}</span>
                </div>
                <div className='header-pc-product-remain'>
                    <span>Số Lượng : {item?.sold} chai</span>
                </div>
                {item?.reduce ?
                <div className='header-pc-product-price'>
                    <span className='header-pc-product-oldprice'>{item?.price}đ</span>
                    <span className='header-pc-product-reduceprice'>{item?.reducePrice}đ</span>
                </div>:
                <div className='header-pc-product-price'>
                    <span className='header-pc-product-realprice'>{item?.price}đ</span>
                </div> }
            </div>
        </Link>
    </li>
  )
}

export default ProductSearch