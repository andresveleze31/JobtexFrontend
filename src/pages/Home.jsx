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
import { LocateIcon, Search } from "lucide-react";
import NavBarAll from "../components/NavBarAll";
import Loader from "../components/Loader";

function Home() {
  const { login, categories, jobs, register } = useJobtex();
  console.log(jobs);

  return (
    <div>
      <Toaster duration={4000} position="bottom-center" />

      {login && <ModalLogin />}
      {register && <ModalRegister />}
      <header className="header  ">
        <div className="md:hidden">
          <NavBarHome />
        </div>
        <div className="hidden md:block bg-white">
          <NavBarAll />
        </div>
        <div className="contenedor py-[15rem]">
          <div className="text-white w-1/2 flex flex-col items-start md:w-full ">
            <h1 className="font-bold">Find The Job That Fits Your Life</h1>
            <p className="md:w-full">
              Resume-Library is a true performance-based job board. Enjoy custom
              hiring products and access to up to 10,000 new resume
              registrations daily, with no subscriptions or user licences.
            </p>
          </div>

          <form className="bg-white w-4/6 mt-[4rem] sm:pt-[4rem] rounded-xl p-[2rem] grid grid-cols-3   md:flex md:flex-col gap-[5rem] md:w-full md:justify-center ">
            <div className="flex md:w-full gap-[1rem] md:gap-[2rem] items-center ">
              <Search />
              <input
                className="w-full md:w-full focus:outline-none"
                type="text"
                placeholder="Job Title, key words or company"
              />
            </div>
            <div className="flex gap-[2rem] md:w-full items-center ">
              <LocateIcon />
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
            <Link to={"/jobs"} className="text-white w-full text-center font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 ">
              Find Jobs
            </Link>
          </form>
          <div className="mt-[2rem] md:hidden flex gap-[2rem] text-white text-[1.4rem] font-semibold ">
            <Link to={"/jobs"}>Designer</Link>
            <Link to={"/jobs"}>Developer</Link>
            <Link to={"/jobs"}>Tester</Link>
            <Link to={"/jobs"}>Writing</Link>
            <Link to={"/jobs"}>Project Manager</Link>
          </div>
        </div>
      </header>
      <Categorias />
      <FeaturedJobs />
      <Banner />
      <TopEmployers />
      <Clients />
      <Footer />
    </div>
  );
}

export default Home;
