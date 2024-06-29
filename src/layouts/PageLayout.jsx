import React from "react";
import { Outlet } from "react-router-dom";
import NavBarAll from "../components/NavBarAll";
import Footer from "../components/home/Footer";
import useJobtex from "../hooks/useJobtex";
import ModalLogin from "../components/ModalLogin";
import { Toaster } from "react-hot-toast";
import ModalRegister from "../components/ModalRegister";

function PageLayout() {
  const { login, register } = useJobtex();

  return (
    <div>
      {login && <ModalLogin />}
      {register && <ModalRegister />}

      <NavBarAll />
      <Toaster duration={4000} position="bottom-center" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PageLayout;
