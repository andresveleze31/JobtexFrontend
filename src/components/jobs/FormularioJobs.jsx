import React from "react";

function FormularioJobs() {
  return (
    <aside className=" ">
      <form className="bg-slate-100 p-[3rem] rounded-xl ">
        <div>
          <label className="block font-bold mb-[1rem] ">Job Title</label>
          <div className="bg-white rounded-xl border p-[1rem] flex gap-[2rem]">
            <img
              className="w-[3rem] h-[3rem] "
              src="../../public/icons/icon_lupa_black.png"
              alt="Icon Lupa"
            />
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Job Title, key words or company"
            />
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">List Location</label>
          <div className="bg-white rounded-xl border p-[1rem] flex gap-[2rem]">
            <img
              className="w-[3rem] h-[3rem] "
              src="../../public/icons/icon_ubicacion_black.png"
              alt="Icon Lupa"
            />
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
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Categories</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">

            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
                All Categories
              </option>
              <option  value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italia">Italia</option>
              <option value="United States">United States</option>
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Job Types</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">

            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
              Job Types              </option>
              <option  value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italia">Italia</option>
              <option value="United States">United States</option>
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Industry</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">

            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
              Industry             </option>
              <option  value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italia">Italia</option>
              <option value="United States">United States</option>
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Career Level</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">

            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
              Career Level             </option>
              <option  value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italia">Italia</option>
              <option value="United States">United States</option>
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Experience</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">

            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
              Experience             </option>
              <option  value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italia">Italia</option>
              <option value="United States">United States</option>
            </select>
          </div>
        </div>
        <input className="text-white mt-[4rem] font-semibold bg-primary py-[1rem] w-full px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 " type="submit" value={"Find Jobs"}  />
      </form>
    </aside>
  );
}

export default FormularioJobs;
