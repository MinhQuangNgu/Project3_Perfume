import React, { useEffect, useState } from 'react'
import AddToCart from '../homepage/homegeneral/AddToCart';
import ProductAddToCart from './ProductAddToCart';
const CardDetail = ({product}) => {


    const [stringPrice,setStringPrice] = useState("0");
    const [reducePrice,setReducePrice] = useState("0");

    useEffect(() => {
        if(product){
            let str = "";
            let num = 0;
            for (let i = product?.price.toString().length - 1; i >= 0; i--){
                if(num === 3){
                   str = str + '.';
                   num = 0;
                }
                str = str + product?.price.toString().charAt(i);
                num++;
             }
             let str2 = '';
             for (let i = str.length - 1; i>=0 ;i--){
                str2 = str2 + str.charAt(i);
             }
             setStringPrice(str2);
        }
    },[product]);

    useEffect(() => {
        if(product && product?.reduce){
            let str = "";
            let num = 0;
            for (let i = product?.reducePrice.toString().length - 1; i >= 0; i--){
                if(num === 3){
                   str = str + '.';
                   num = 0;
                }
                str = str + product?.reducePrice.toString().charAt(i);
                num++;
             }
             let str2 = '';
             for (let i = str.length - 1; i>=0 ;i--){
                str2 = str2 + str.charAt(i);
             }
             setReducePrice(str2);
        }
    },[product]);
  return (
    <div className='card_detail-infor'>
        <div className='row'>
            <div className='col c-10 c-o-1 m-10 m-o-1 l-5'>
                <div className='image_detail-container'>
                    <img className='image-detail-container-image' src={product?.image} />
                </div>
            </div>
            <div className='col c-10 c-o-1 m-10 m-o-1 l-7'>
                <div className='flower-water-detail'>
                    <div className='name-flower-water-detail'>
                        <span>{product?.title} 
                            <div className='hot-best-sell-container'>
                                {product?.hot && 
                                <div className='perfume-hot'>
                                    HOT
                                </div>}
                                {product?.bestsell && 
                                <div className='perfume-best-sell'>
                                    BÁN CHẠY
                                </div>}
                                {product?.reduce && 
                                <div className='perfume-sale'>
                                    SALE
                                </div>}
                            </div>
                        </span>
                    </div>
                    <div className='natural'>
                        <span>Xuất Xứ: {product?.origin}</span>
                        <span>Số Lượng: {product?.sold} chai</span>
                        <span>Loại: {product?.categary === 'nuoc-hoa-nam' ? 'Nước Hoa Nam':
                        product?.categary === 'nuoc-hoa-nu' ? 'Nước Hoa Nữ' :
                        product?.categary === 'nuoc-hoa-unisex' && 'Nước Hoa Unisex'}</span>
                    </div>
                    {product?.reduce ? (
                        <div className='reducer_price'>
                        <span className='root-price'>{stringPrice} đ</span>
                        <span className='new-price'>{reducePrice} đ</span>
                        <div className='percent'>
                            {product?.percent}% GIẢM
                        </div>
                    </div>
                    ):
                    <div className='no-reduce-price'>
                        <span>{stringPrice} đ</span>
                    </div>}
                    <div className='year-born'>
                        <span>Năm phát hành: {product?.born}</span>
                    </div>
                    <div className='gender'>
                        <span>Giới Tính: {product?.categary === 'nuoc-hoa-nam' ? 'Nam':
                        product?.categary === 'nuoc-hoa-nu' ? 'Nữ' :
                        product?.categary === 'nuoc-hoa-unisex' && 'Unisex'}</span>
                    </div>
                    <div className='the-tich'>
                        <span>Thể Tích: {product?.volume}</span>
                    </div>
                    <div className='add-to-cart-container'>
                        <ProductAddToCart id={product?._id}/>
                        <div className='contact-to-user'>
                            <a style={{textDecoration:"none",color:"white"}} href="/">Liên Hệ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetail