import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, DetailProduct, Products, Cart } from './pages/public'
import { AdmminLayout, Dashboard, ManageUser } from './pages/admin'
import { MemberLayout, Personal } from './pages/member'
import path from './ultils/path';

function App() {
  return (
    <div className=" min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.PRODUCTS_OPTION} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
        </Route>
        <Route path={path.ADMIN} element={<AdmminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        <Route path={path.ALL} element={<Public />} />
      </Routes>
    </div>
  );
}

export default App;
