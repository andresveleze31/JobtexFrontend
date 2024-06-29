import React from "react";

function FormularioEmployers() {
  return (
    <div className="contenedor p-[2rem]  grid grid-cols-4 gap-[2rem] rounded-xl items-center py-[1rem] my-[5rem] border sm:grid-cols-1 md:grid-cols-2 md:gap-[3rem] md:py-[3rem] ">
      <div className="bg-white border-r sm:border-none  flex gap-[2rem]">
        <img
          className="w-[3rem] h-[3rem] "
          src="../../public/icons/icon_lupa_black.png"
          alt="Icon Lupa"
        />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Company title, keywords..."
        />
      </div>
      <div className="bg-white  flex gap-[2rem]">
        <select className="w-full  focus:outline-none" id="location">
          <option disabled selected value="">
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
      <div className=" flex gap-[2rem] pl-[1rem] border-l md:p-0 md:border-none ">
        <select className="w-full focus:outline-none" id="location">
          <option disabled selected value="">
            All Categories
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
        className="text-white font-semibold bg-primary py-[1rem] w-full px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
        type="submit"
        value={"Find Employers"}
      />
    </div>
  );
}

export default FormularioEmployers;
