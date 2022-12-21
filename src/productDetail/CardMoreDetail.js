import React from 'react'

const CardMoreDetail = ({product}) => {
  return (
    <div className='more-detail-navbar'>
        <div className='more-detail-detail-navbar'>
            <span>Chi Tiết Sản Phẩm</span>
        </div>
        <div className='more-detail-detail-infor'>
            <ul>
                <li><span>Tên Nước Hoa: </span>{product?.title}</li>
                <li><span>Hãng Nước Hoa: </span>{product?.brand}</li>
                <li><span>Số Lượng: </span>{product?.sold} chai</li>
                <li><span>Thể Tích: </span>{product?.volume}</li>
                <li><span>Mùi Hương: </span>{product?.fragrant}</li>
                <li><span>Nồng Độ: </span>{product?.concentration}</li>
                <li><span>Năm Sản Xuất: </span>{product?.born}</li>
                <li><span>Loại: </span>{product?.categary === 'nuoc-hoa-nam' ? 'Nước Hoa Nam':
                    product?.categary === 'nuoc-hoa-nu' ? 'Nước Hoa Nữ' :
                    product?.categary === 'nuoc-hoa-unisex' && 'Nước Hoa Unisex'}</li>
                <li><span>Xuất Xứ: </span>{product?.origin}</li>
                <li><span>Thời Điểm Dùng: </span>{product?.timeuse}</li>
            </ul>
        </div>
        <div className='more-detail-detail-navbar'>
            <span>Mô Tả Sản Phẩm</span>
        </div>
        <div className='more-detail-detail-description'>
            <p>{product?.description}</p>
        </div>
        <div className='more-detail-detail-navbar'>
            <span>Cách Dùng</span>
        </div>
        <div className='more-detail-detail-working'>
            <p>{product?.howtouse}</p>
        </div>
    </div>
  )
}

export default CardMoreDetail