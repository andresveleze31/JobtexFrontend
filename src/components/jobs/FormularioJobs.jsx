import { MapPin, Search } from "lucide-react";
import React from "react";
import useJobtex from "../../hooks/useJobtex";

function FormularioJobs() {

  
  const {
    categories,
    jobTypes,
    industries,
    locations,
    levels,
    qualifications,
  } = useJobtex();

  const filterJobs = (event) => {
    event.preventDefault();

    
    
  }

  return (
    <aside className=" ">
      <form onSubmit={filterJobs} className="bg-slate-100 p-[3rem] rounded-xl ">
        <div>
          <label className="block font-bold mb-[1rem] ">Job Title</label>
          <div className="bg-white rounded-xl border p-[1rem] flex gap-[2rem]">
            <Search />
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
            <MapPin />
            <select className="w-full  focus:outline-none" id="location">
              <option disabled selected value="">
                All Location
              </option>
              {locations?.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.location}
                </option>
              ))}
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
              {categories?.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.categorie}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Job Types</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">
            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
                Job Types{" "}
              </option>
              {jobTypes.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Industry</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">
            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
                Industry{" "}
              </option>
              {industries.map((ind) => (
                <option key={ind._id} value={ind._id}>
                  {ind.industry}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Career Level</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">
            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
                Career Level{" "}
              </option>
              {levels.map((lvl) => (
                <option key={lvl._id} value={lvl._id}>
                  {lvl.level}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-[2rem] ">
          <label className="block font-bold mb-[1rem] ">Experience</label>
          <div className="bg-white rounded-xl border p-[1.4rem] flex gap-[2rem]">
            <select className="w-full focus:outline-none" id="location">
              <option disabled selected value="">
                Experience{" "}
              </option>
              {qualifications.map((qua) => (
                <option key={qua._id} value={qua._id}>
                  {qua.qualification}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          className="text-white mt-[4rem] font-semibold bg-primary py-[1rem] w-full px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
          type="submit"
          value={"Find Jobs"}
        />
      </form>
    </aside>
  );
}

export default FormularioJobs;
