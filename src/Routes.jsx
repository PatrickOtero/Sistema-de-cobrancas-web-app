import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from "react-router-dom";
import useData from "./hooks/useData";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registered from "./pages/Registered";
import Home from "./pages/Home/index";
import Charges from "./pages/Charges/index";
import CustomersDetails from "./pages/CustormersDetails";

function AuthenticatedRoutes() {
  const { token } = useData();
  if (!token) return <Navigate to="/" />;
  return <Outlet />;
}
export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastrar" element={<Register />} />
        <Route path="cadastrado" element={<Registered />} />
        <Route element={<AuthenticatedRoutes />}>
          <Route path="clientes" element={<Customers />} />
          <Route path="clientes/:id" element={<CustomersDetails />} />
          <Route path="cobrancas" element={<Charges />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
