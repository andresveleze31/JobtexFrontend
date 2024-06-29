import React, { useEffect } from "react";
import NavBarHome from "../components/NavBarHome";
import { Link } from "react-router-dom";
import Categorias from "../components/home/Categorias";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Banner from "../components/home/Banner";
import TopEmployers from "../components/home/TopEmployers";
import ActiveSlider from "../components/home/ActiveSlider";
import Clients from "../components/home/Clients";
import Footer from "../components/home/Footer";
import useJobtex from "../hooks/useJobtex";
import ModalLogin from "../components/ModalLogin";
import { Toaster } from "react-hot-toast";
import ModalRegister from "../components/ModalRegister";

function Home() {

  const {login, categories, jobs, register} = useJobtex();
  console.log(jobs);

  return (
    <div>
      <Toaster duration={4000} position="bottom-center" />

      {login && <ModalLogin />}
      {register && <ModalRegister />}
      <header className="header  ">
        <NavBarHome />
        <div className="contenedor py-[15rem]">
          <div className="text-white w-1/2 flex flex-col items-start md:w-full ">
            <h1 className="font-bold">Find The Job That Fits Your Life</h1>
            <p className="md:w-full">
              Resume-Library is a true performance-based job board. Enjoy custom
              hiring products and access to up to 10,000 new resume
              registrations daily, with no subscriptions or user licences.
            </p>
          </div>

          <form className="bg-white w-4/6 mt-[4rem] sm:pt-[4rem] rounded-xl p-[2rem] flex md:flex-col gap-[5rem] md:w-full md:justify-center ">
            <div className="flex md:w-full gap-[1rem] md:gap-[2rem] items-center ">
              <img
                className="w-[3rem] h-[3rem] "
                src="../public/icons/icon_lupa_black.png"
                alt="Icono Lupa"
              />
              <input
                className="w-[26rem] md:w-full focus:outline-none"
                type="text"
                placeholder="Job Title, key words or company"
              />
            </div>
            <div className="flex gap-[2rem] md:w-full items-center ">
              <img
                className="w-[3rem] h-[3rem] "
                src="../public/icons/icon_ubicacion_black.png"
                alt="Icono Lupa"
              />
              <select
                className="w-[25rem] md:w-full  focus:outline-none"
                id="location"
              >
                <option disabled value="">
                  All Location
                </option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Italia">Italia</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <input
              className="text-white font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
              type="submit"
              value={"Find Jobs"}
            />
          </form>
          <div className="mt-[2rem] flex gap-[2rem] text-white text-[1.4rem] font-semibold ">
            <Link to={"#"}>Designer</Link>
            <Link to={"#"}>Developer</Link>
            <Link to={"#"}>Tester</Link>
            <Link to={"#"}>Writing</Link>
            <Link to={"#"}>Project Manager</Link>
          </div>
        </div>
      </header>
      <Categorias />
      <FeaturedJobs />
      <Banner />
      <TopEmployers />
      <ActiveSlider />
      <Clients />
      <Footer />
    </div>
  );
}

export default Home;
