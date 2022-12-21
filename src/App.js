import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Register from './auth/Register';
import Categary from './general/Categary';
import Header from './general/Header';
import Home from './homepage/Home';
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { isLogout, isSuccess } from './redux/slice/authSlice';
import CreateProduct from './admin/CreateProduct';
import ProductDetail from './productDetail/ProductDetail';
import decodeJwt from 'jwt-decode';
import EditProduct from './admin/EditProduct';
import HotAndSale from './hotandsale/HotAndSale';
import KindBrand from './kind/KindBrand';
import Brand from './brands/Brand';
import UserManager from './usermanaget/UserManager';
import UserInfor from './userInfor/UserInfor';
import ChangePassWord from './auth/ChangePassWord';
import GetPassword from './admin/GetPassword';
function App() {


  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const cache = useRef({});
  useEffect(() => {
    let date = new Date();
    if(auth.user?.accessToken){
      const decoded = decodeJwt(auth.user?.accessToken);
      if(decoded.exp < date.getTime() / 1000){
        dispatch(isLogout());
      }
    }
  },[]);


  return (
    <Router>
    <div className="App">
      <Header />
      <Categary cache={cache}/>
      <Routes>
        <Route path='/login' exact element={<Login />}/>
        <Route path='/register' exact element={<Register />}/>
        <Route path='/nuoc-hoa/:slug' element={<HotAndSale cache={cache}/>}/>
        <Route path='/brands/:slug' element={<Brand cache={cache}/>}/>
        <Route path='/san-pham/:slug' element={<ProductDetail cache={cache}/>}/>
        {auth.user && <Route path='/user/infor/:id' element={<UserInfor cache={cache}/>}/>}
        {auth.user && <Route path='/user/change_password' element={<ChangePassWord />}/>}
        {auth.user?.rule === 'admin' && <Route path='/mananger/user/password' exact element={<GetPassword />}/>}
        {auth.user?.rule === 'admin' && <Route path='/manager/user' exact element={<UserManager cache={cache}/>}/>}
        {auth.user?.rule === 'admin' && <Route path='/product/create' exact element={<CreateProduct cache={cache}/>} />}
        {auth.user?.rule === 'admin' && <Route path='/product/edit/:slug' element={<EditProduct cache={cache} />} />}
        <Route path='/:slug' exact element={<KindBrand cache={cache}/>}/>
        <Route path='/' exact element={<Home cache={cache}/>}/>
      </Routes>
      <ToastContainer autoClose={1000} style={{fontSize:"1.5rem"}}/>
      {auth.loading && <Loading />}
    </div>
    </Router>
  );
}

export default App;
