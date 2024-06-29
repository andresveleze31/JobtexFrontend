import React from "react";
import Job from "../Job";
import { Link } from "react-router-dom";
import useJobtex from "../../hooks/useJobtex";

function FeaturedJobs() {

  const {jobs} = useJobtex();

  

  return (
    <main className="contenedor mt-[7rem] ">
      <div className="text-center">
        <h2 className="mb-0 font-bold">Featured Jobs</h2>
        <p className="text-customGray">
          Find the job that’s perfect for you. about 800+ new jobs everyday
        </p>
      </div>

      <div className="mt-[5rem] grid grid-cols-2 gap-[4rem] sm:grid-cols-1">
        {jobs.map(job => {
          return <Job job={job} />
        })}

      </div>

      <div className="flex justify-center mt-[5rem] ">
      <Link className="text-white font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 ">See More Jobs {">"} </Link>

      </div>
    </main>
  );
}

export default FeaturedJobs;
