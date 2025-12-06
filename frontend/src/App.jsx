import { Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";

import Tables from "./pages/waiter/Tables";
import Order from "./pages/waiter/Order";

import TablesAdmin from "./pages/admin/Tables";
import Products from "./pages/admin/Products";
import Staff from "./pages/admin/Staff";
import Report from "./pages/admin/Report";
import Settings from "./pages/admin/Settings";
import TeNgrohta from "./pages/admin/TeNgrohta";
import TeFtohta from "./pages/admin/TeFtohta";
import Kuzhina from "./pages/admin/Kuzhina";
import Promocionale from "./pages/admin/Promocionale";

const RequireAuth = () => {
  const token = localStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/products' element={<Products />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/report' element={<Report />} />
          <Route path='/tablesadmin' element={<TablesAdmin />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/tengrohta' element={<TeNgrohta />} />
          <Route path='/teftohta' element={<TeFtohta />} />
          <Route path='/kuzhina' element={<Kuzhina />} />
          <Route path='/promocionale' element={<Promocionale />} />
        </Route>

        <Route path='/waiter/tables' element={<Tables />} />
        <Route path='/waiter/order' element={<Order />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
