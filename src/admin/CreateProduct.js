import React, { useEffect, useRef, useState } from 'react'
import './CreateProduct.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {isFailing, isLoading, isSuccess} from '../redux/slice/authSlice';
import {toast} from 'react-toastify';
const CreateProduct = ({cache}) => {

    const [image,setImage] = useState();
    const Image = useRef("");
    const title = useRef("");
    const origin = useRef("");
    const description = useRef("");
    const fragrant = useRef("");
    const born = useRef("");
    const volume = useRef("");
    const price = useRef(0);
    const reduce = useRef("");
    const reducePrice = useRef(0);
    const percent = useRef(0);
    const [reducepercent,setReducePercent] = useState(false);
    const concentration = useRef("");
    const timeuse = useRef("");
    const howtouse = useRef("");
    const bestSell = useRef("");
    const hot = useRef("");
    const kindman = useRef("");
    const kindboth = useRef("");
    const kindwoman = useRef("");
    const [brand,setBrand] = useState([]);
    const dispatch = useDispatch();
    const kindbrand = useRef("");
    const smallcontent = useRef("");
    const sold = useRef(0);
    
    const auth = useSelector(state => state.auth);


    const handleCreate = async () => {
        if(!Image.current || !title.current.value || !origin.current.value
            || !description.current.value || !fragrant.current.value || !born.current.value
            || !volume.current.value || !price.current.value || !concentration.current.value
            || !timeuse.current.value || !howtouse.current.value || !kindbrand.current.value
            || !smallcontent.current.value || !sold.current.value){
            return toast.error("Vui lòng điền hết thông tin.");
        }
        let kindOfProduct;
        if(kindman.current.checked){
            kindOfProduct = kindman.current.value;
        }
        if(kindwoman.current.checked){
            kindOfProduct = kindwoman.current.value;
        }
        if(kindboth.current.checked){
            kindOfProduct = kindboth.current.value;
        }
        const product = {
            image:Image.current,
            title:title.current.value,
            origin:origin.current.value,
            description:description.current.value,
            fragrant:fragrant.current.value,
            born:born.current.value,
            volume:volume.current.value,
            price:price.current.value,
            concentration:concentration.current.value,
            timeuse:timeuse.current.value,
            howtouse:howtouse.current.value,
            kindbrand:kindbrand.current.value,
            smallcontent:smallcontent.current.value,
            hot:hot.current.checked,
            bestSell:bestSell.current.checked,
            reduce:reduce.current.checked,
            reducePrice:reduce.current.checked ? reducePrice.current?.value || 0 : 0,
            percent:reduce.current.checked ? percent.current?.value || 0 : 0,
            categary:kindOfProduct,
            sold:sold.current.value
        }
        let avatar;
        const formData = new FormData();
        formData.append("file",Image.current);
        formData.append("upload_preset","cloudcuachihuyen");
        dispatch(isLoading());
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/cloudcuachihuyen/image/upload",formData);
            avatar = res.data.url;
            dispatch(isSuccess());
        }
        catch(err){
            dispatch(isFailing());
        }
        dispatch(isLoading());
        try{
            const res = await axios.post('/api/product/create',{
                title:product.title,
                image:avatar,
                categary:product.categary,
                sold:product.sold,
                origin:product.origin,
                description:product.description,
                fragrant:product.fragrant,
                born:product.born,
                volume:product.volume,
                price:product.price,
                percent:product.percent,
                reducePrice:product.reducePrice,
                reduce:product.reduce,
                smallcontent:product.smallcontent,
                concentration:product.concentration,
                brand:product.kindbrand,
                timeuse:product.timeuse,
                howtouse:product.howtouse,
                hot:product.hot,
                bestsell:product.bestSell
            },{
                headers:{
                    token:`Bearer ${auth.user?.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(isSuccess());
        }
        catch(err){
            toast.error(err.response?.data?.msg);
            dispatch(isFailing());
        }

        title.current.value = "";
        origin.current.value = "";
        description.current.value = "";
        fragrant.current.value = "";
        born.current.value = "";
        volume.current.value = "";
        price.current.value = "";
        concentration.current.value = "";
        timeuse.current.value = "";
        howtouse.current.value = "";
        kindbrand.current.value = "";
        smallcontent.current.value = "";
        sold.current.value = 0;
    }

    const handleImage =(e) => {
        Image.current = e;
        const url = URL.createObjectURL(e);
        setImage(url);
    }
    useEffect(() => {
        let here = true;
        const url = '/api/brand';
        if(cache.current[url]){
            return setBrand(cache.current[url]);
        }
        dispatch(isLoading());
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.brands;
                setBrand(res.data.brands);
                dispatch(isSuccess());
            })
            .catch(() => {
                dispatch(isFailing());
            })
        return () => {
            here = false;
        }
    },[]);


  return (
    <div className='grid wide'>
        <div className='product-create-container'>
            <div className='product-create-image'>
                <img className='product-create-image-detail' src={image} />
                <div className='product-create-image-add'>
                    <input onChange={(e) => handleImage(e.target.files[0])} id='image-product' type='file' hidden/>
                    <label htmlFor='image-product' className='product-create-image-add-detail'>
                        Thay Ảnh <FontAwesomeIcon style={{marginLeft:"0.5rem"}} icon={faImage} />
                    </label>
                </div>
            </div>
            <div className='product-create'>
                <span className='product-create-title'>Thêm Sản Phẩm Mới</span>
                <div className='product-create-form-general'>
                    <label className='product-create-form-add-more-infor'>Tên sản phẩm:</label>
                    <input defaultValue={title.current.value} ref={title} type='text' placeholder='Tên sản phẩm'/>
                </div>
                <div className='product-create-form-general'>
                    <label className='product-create-form-add-more-infor'>Nơi Sản Xuất:</label>
                    <input defaultValue={origin.current.value} ref={origin} type='text' placeholder='Nơi Sản Xuất'/>
                </div>
                <div className='product-create-form-textarea'>
                    <label className='product-create-form-add-more-infor-textarea'>Mô Tả Sản Phẩm:</label>
                    <textarea defaultValue={description.current.value} ref={description} type='text' placeholder='Mô Tả Sản Phẩm'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Nội Dung Nhỏ:</label>
                    <input defaultValue={smallcontent.current.value} ref={smallcontent} type='text' placeholder='Nội Dung Nhỏ'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Mùi Hương:</label>
                    <input defaultValue={fragrant.current.value} ref={fragrant} type='text' placeholder='Mùi Hương'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Born:</label>
                    <input defaultValue={born.current.value} ref={born} type='number' placeholder='Born'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Số Lượng:</label>
                    <input defaultValue={sold.current.value} ref={sold} type='number' placeholder='Số Lượng'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Thể Tích:</label>
                    <input defaultValue={volume.current.value} ref={volume} type='text' placeholder='Thể Tích'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Giá:</label>
                    <input defaultValue={price.current.value} ref={price} type='number' placeholder='Giá'/>
                </div>
                <div className='product-craete-form-checked'>
                    <label htmlFor='reduce'>Giảm Giá Hay Không ?</label>
                    <input ref={reduce} onChange={() => setReducePercent(!reducepercent)} id='reduce' type='checkbox' />
                </div>
                {reducepercent && 
                <>
                <div className='product-create-form-general-p2'>
                    <label>Giá Sau Khi Giảm:</label>
                    <input ref={reducePrice} type='text' placeholder='Giá Sau Khi Giảm'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Phần Trăm Giảm (%):</label>
                    <input ref={percent} type='number' placeholder='% Giảm Giá'/>
                </div>
                </>
                }
                <div className='product-create-form-general-p2'>
                    <label>Nồng Độ:</label>
                    <input defaultValue={concentration.current.value} ref={concentration} type='text' placeholder='Nồng Độ'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>Thời Giam Sử Dụng:</label>
                    <input defaultValue={timeuse.current.value} ref={timeuse} type='text' placeholder='Thời Gian Sử Dụng'/>
                </div>
                <div className='product-create-form-general-p2'>
                    <label>How To Sử Dụng:</label>
                    <input defaultValue={howtouse.current.value} ref={howtouse} type='text' placeholder='How To Sử Dụng'/>
                </div>
                <div className='product-craete-form-checked'>
                    <label htmlFor='hot'>Hot Hay Không ?</label>
                    <input ref={hot} id='hot' type='checkbox' />
                </div>
                <div className='product-craete-form-checked'>
                    <label htmlFor='bestsell'>Bán Chạy Hay Không ?</label>
                    <input ref={bestSell} id='bestsell' type='checkbox' />
                </div>
                <div className='product-create-form-kind'>
                    <span>Chọn Thể Loại:</span>
                </div>
                <div className='product-craete-form-checked-brand'>
                    <div className='product-craete-form-checked-brand-number'>
                        <label htmlFor='kindman'>Nước Hoa Nam ?</label>
                        <input ref={kindman} defaultChecked id='kindman' type='radio' name='kind' value="nuoc-hoa-nam"/>
                    </div>
                    <div className='product-craete-form-checked-brand-number'>
                        <label htmlFor='kindwoman'>Nước Hoa Nữ ?</label>
                        <input ref={kindwoman} id='kindwoman' type='radio' name='kind' value="nuoc-hoa-nu" />
                    </div>
                    <div className='product-craete-form-checked-brand-number'>
                        <label htmlFor='kindboth'>Nước Hoa Unisex ?</label>
                        <input ref={kindboth} id='kindboth' type='radio' name='kind' value="nuoc-hoa-unisex" />
                    </div>
                </div>
                <div className='product-create-form-kind'>
                </div>
                <div className='product-create-brand'>
                    <select ref={kindbrand}>
                        <option defaultChecked value="">Tên Hãng</option>
                        {brand?.map(item => (
                            <option key={item._id + "a"} value={item?.name}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <div className='product-create-button'>
                    <button onClick={handleCreate}>Tạo Sản Phẩm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateProduct