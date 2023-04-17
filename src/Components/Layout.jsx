import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
export default function Layout({ userData, setuserData }) {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setuserData(null);
    navigate("/login");
  }
  return (
    <div>
      <Navbar userData={userData} logout={logout} />
      <div className="container pt-5 mt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
