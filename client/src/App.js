import Reac, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, DetailProduct, Products, Cart } from './pages/public'
import { AdmminLayout, Dashboard, ManageUser } from './pages/admin'
import { MemberLayout, Personal, Payment, Profile } from './pages/member'
import path from './ultils/path';
import { CartDrawer } from './components';
import { useSelector } from 'react-redux';
import { getCategories } from './store/app/asyncActions'
import { showCart } from './store/app/appSlice'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const { isShowCart } = useSelector(state => state.app)
  useEffect(() => {
    // console.log('getCategories')
    dispatch(getCategories())
  }, [])
  return (
    <div className=" min-h-screen font-main">
      {isShowCart &&
        <div onClick={() => dispatch(showCart())} className=' fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end'>
          <CartDrawer />
        </div>
      }
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.PRODUCTS_OPTION} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.PAYMENT} element={<Payment />} />
        </Route>
        <Route path={path.ADMIN} element={<AdmminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PROFILE} element={<Profile />} />
        </Route>
        <Route path={path.ALL} element={<Public />} />
      </Routes>
    </div>
  );
}

export default App;
