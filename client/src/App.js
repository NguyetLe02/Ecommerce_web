import Reac, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, DetailProduct, Products } from './pages/public'
import { AdmminLayout, Dashboard, ManageUser, MangeClaimOrder, ManageOrder } from './pages/admin'
import { MemberLayout, Ordered, Payment, Profile, Cart } from './pages/member'
import path from './ultils/path';
import { CartDrawer, Modal } from './components';
import { useSelector } from 'react-redux';
import { getCategories } from './store/app/asyncActions'
import { showCart } from './store/app/appSlice'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector(state => state.app)
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
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.PRODUCTS_OPTION} element={<Products />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.PAYMENT} element={<Payment />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
        </Route>
        <Route path={path.ADMIN} element={<AdmminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_CLAIM} element={<MangeClaimOrder />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.ORDERED} element={<Ordered />} />
        </Route>
        <Route path={path.ALL} element={<Public />} />
      </Routes>
    </div>
  );
}

export default App;
