import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, Signup } from './pages/public'
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
          <Route path={path.SIGNUP} element={<Signup />} />
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
