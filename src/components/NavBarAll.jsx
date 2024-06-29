import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useJobtex from "../hooks/useJobtex";
import useAuthCandidate from "../hooks/useAuthCandidate";
import useAuthEmployer from "../hooks/useAuthEmployer";
import axios from "axios";

function NavBarAll() {
  const { setLogin } = useJobtex();
  const { authCandidate } = useAuthCandidate();
  const { authEmployer } = useAuthEmployer();

  return (
    <div className="border-b ">
      <div className=" border-b border-slate-100 border-opacity-15 py-[2rem]">
        <div className="contenedor flex items-center  justify-between">
          <div className="flex gap-[4rem] items-center  ">
            <img src="../../public/images/logo_black.svg" alt="Logo Jobtex" />
            <button className="flex gap-[1rem] md:hidden  ">
              <img
                className="w-[2.2rem] filter invert "
                src="../../public/icons/icon_categoria_white.png"
                alt="Icono Categorias"
              />{" "}
              Categories
            </button>
          </div>
          <nav className="flex gap-[2rem] md:hidden">
            <Link
              to={"/"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              to={"/jobs"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Find Jobs
            </Link>
            <Link
              to={"/employers"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Employers
            </Link>
            <Link
              to={"/candidates"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Candidates
            </Link>
          </nav>
          {authCandidate._id && (
            <div className="flex gap-[2rem] items-center md:hidden ">
              <Link
                to={"/admin/candidate/profile"}
                className="font-semibold text-primary"
              >
                Go to Admin DashBoard
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  localStorage.removeItem("tokenCandidate");
                  toast.success("You Logout");
                }}
                className="font-semibold border bg-primary text-white border-primary py-[1rem] px-[4rem] hover:bg-white transition-all duration-300 rounded-lg hover:text-primary"
              >
                Logout
              </Link>
            </div>
          )}

          {authEmployer._id && (
            <div className="flex gap-[2rem] items-center md:hidden">
              <Link
                to={"/admin/employer/profile"}
                className="font-semibold text-primary"
              >
                Go to Admin DashBoard
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  localStorage.removeItem("tokenEmployer");
                  toast.success("You Logout");
                }}
                className="font-semibold border bg-primary text-white border-primary py-[1rem] px-[4rem] hover:bg-white transition-all duration-300 rounded-lg hover:text-primary"
              >
                Logout
              </Link>
            </div>
          )}
          <div className="flex gap-[2rem] items-center md:hidden">
            {!authCandidate._id && !authEmployer._id && (
              <div className="flex gap-[2rem] mr-[3rem] items-center ">
                <img
                  className="w-[3rem] filter invert "
                  src="../../public/icons/icon_notificacion_white.png"
                  alt="Icon Notification"
                />
                <button
                  onClick={() => setLogin(true)}
                  className="flex font-semibold gap-[1rem] text-[1.4rem] "
                >
                  <img
                    className="w-[2.5rem] filter invert"
                    src="../../public/icons/icon_user_white.png"
                    alt="Icono Usuario"
                  />
                  Login / Register
                </button>
              </div>
            )}

            <button className=" font-semibold border border-primary py-[1rem] px-[4rem] hover:bg-primary transition-all duration-300 rounded-lg hover:text-white ">
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarAll;
