import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useJobtex from "../hooks/useJobtex";
import useAuthCandidate from "../hooks/useAuthCandidate";
import useAuthEmployer from "../hooks/useAuthEmployer";
import axios from "axios";
import { Bell, LayoutDashboard, User } from "lucide-react";
import MobileNav from "./MobileNav";

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
              <LayoutDashboard />
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
                <Bell />
                <button
                  onClick={() => setLogin(true)}
                  className="flex font-semibold gap-[1rem] text-[1.4rem] "
                >
                  <User />
                  Login / Register
                </button>
              </div>
            )}

            <button className=" font-semibold border border-primary py-[1rem] px-[4rem] hover:bg-primary transition-all duration-300 rounded-lg hover:text-white ">
              Post Job
            </button>

            
          </div>

          <MobileNav  />

        </div>
      </div>
    </div>
  );
}

export default NavBarAll;
