import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, DetailProduct, Products, Blogs, BlogDetail } from "./pages/public";
import {
  AdminLayout,
  Dashboard,
  ManageUser,
  ManageOrder,
  AdminMessage,
  ManageProblemOrder,
  ManageClaimOrder,
  ManageBrand,
  ManageSentOrder,
  ManageRentingOrder,
  ManageCompletedOrder,
  ManageRevenue,
  ManageVoucher,
  ManageBlog,
  ManageProductCategory,
  ManageCancelledOrder,
  ManageProduct,
} from "./pages/admin";
import { MemberLayout, Ordered, Payment, Profile, Cart, Message } from "./pages/member";
import path from "./ultils/path";
import { CartDrawer, Modal } from "./components";
import { useSelector } from "react-redux";
import { getCategories } from "./store/app/asyncActions";
import { showCart } from "./store/app/appSlice";
import { useDispatch } from "react-redux";

import io from 'socket.io-client';
import { ToastContainer } from "react-toastify";

const socket = io('http://localhost:5000');

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  const { isShowCart } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className=" min-h-screen font-main">
      <ToastContainer />
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className=" fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
        >
          <CartDrawer />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.PRODUCTS_OPTION} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={`${path.BLOGS}/:id`} element={<BlogDetail />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.PROBLEM_ORDER} element={<ManageProblemOrder />} />
          <Route path={path.CLAIM_ORDER} element={<ManageClaimOrder />} />
          <Route path={path.ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.CHAT} element={<AdminMessage />} />
          <Route path={path.PRODUCT_CATEGORY} element={<ManageProductCategory />} />
          <Route path={path.BRAND} element={<ManageBrand />} />
          <Route path={path.SENT_ORDER} element={<ManageSentOrder />} />
          <Route path={path.RENTING_ORDER} element={<ManageRentingOrder />} />
          <Route path={path.COMPLETED_ORDER} element={<ManageCompletedOrder />} />
          <Route path={path.CANCELLED_ORDER} element={<ManageCancelledOrder />} />
          <Route path={path.REVENUE} element={<ManageRevenue />} />
          <Route path={path.VOUCHER} element={<ManageVoucher />} />
          <Route path={path.BLOG} element={<ManageBlog />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PAYMENT} element={<Payment />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.ORDERED} element={<Ordered />} />
          <Route path={path.CHAT} element={<Message />} />
        </Route>
        <Route path={path.ALL} element={<Public />} />
      </Routes>
    </div>
  );
}

export default App;
