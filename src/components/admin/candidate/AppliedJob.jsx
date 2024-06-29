import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
import toast from "react-hot-toast";
import axios from "axios";

function AppliedJob({ job, jobs, setJobs }) {

    const {authCandidate, tokenC} = useAuthCandidate();


  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(job.createdAt);

  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);


  async function handleDelete(e) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenC}`,
      },
    };

    try {
      const applicacionDelete = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/applications/delete-application/${job._id}`,
        config
      );
      console.log(applicacionDelete)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setJobs(
      jobs.filter((j) => {
        if (j._id !== job._id) {
          return j;
        }
      })
    );

    toast.success("Job Deleted Succesfully");
  }

  return (
    <div className="grid grid-cols-[3fr,1fr,1fr,1fr] group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300">
      <div className="flex gap-[2rem] items-center">
        <img
          className="w-[6rem] h-[6rem] "
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
            job.job_id.employer_id.photo
          }`}
          alt="Img Job"
        />
        <div className="flex flex-col gap-[1rem]">
          <h3 className="text-[1.8rem] font-bold m-0 ">{job.job_id.title}</h3>
          <div className="flex gap-[1rem]">
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_ubicacion_gray.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {job.job_id.location_id.location}
              </span>
            </div>
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_lupa_black.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {job.job_id.industry_id.industry}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] ">{formattedDate}</p>
      </div>
      <div>
        <p
          className={`px-[2rem] py-[0.5rem] text-white text-[1.4rem] w-[10rem] text-center bg-blue-500 rounded-full `}
        >
          {job.state_id.state}
        </p>
      </div>

      <div className="flex gap-[2rem] ">
        <Link
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem] p-[1rem] "
          to={`/jobs/${job.job_id._id}`}
        >
          <img
            className="w-[2.5rem] h-[2.5rem]  "
            src="../../public/icons/icon_eye.png"
            alt="Icon Edit"
          />
        </Link>
        <button
          onClick={handleDelete}
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem]  p-[1rem]"
        >
          <img
            className="w-[2.5rem] h-[2.5rem] "
            src="../../public/icons/icon_delete.png"
            alt="Icon Delete"
          />
        </button>
      </div>
    </div>
  );
}

export default AppliedJob;
