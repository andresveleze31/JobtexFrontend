import React from "react";
import { Link } from "react-router-dom";
import Employer from "../Employer";
import useJobtex from "../../hooks/useJobtex";
import { Forward, StepForward } from "lucide-react";
import Loader from "../Loader";

function TopEmployers() {

  const {employers} = useJobtex();

  if (employers.length == 0) {
    return <Loader />;
  }

  return (
    <div className="contenedor my-[10rem] ">
      <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-[1rem] ">
        <div>
          <h2 className="mb-0 font-bold">Top Employers</h2>
          <p className="text-customGray">
            Showing companies based on reviews and recent job openings
          </p>
        </div>
        <Link className="font-semibold  flex gap-[2rem] items-center " to={"/employers"}>
          All Employers{" "}
          <StepForward />
        </Link>
      </div>
      <div className="grid mt-[5rem] grid-cols-3 gap-[2rem] sm:grid-cols-1 md:grid-cols-2 ">
        {employers.map((emp) => {
          return <Employer employer={emp} />;
        })}
      </div>
    </div>
  );
}

export default TopEmployers;
