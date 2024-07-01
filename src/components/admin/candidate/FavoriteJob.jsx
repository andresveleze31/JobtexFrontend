import React from 'react'
import { Link } from 'react-router-dom';
import useAuthCandidate from '../../../hooks/useAuthCandidate';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Eye, MapPin, Search, Trash } from 'lucide-react';

function FavoriteJob({job, jobs, setJobs}) {
  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(job.job_id.createdAt);

  const {tokenC} = useAuthCandidate();

  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  async function handleDelete(e){
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
        }/api/candidates/delete-favorite-job/${job._id}`,
        config
      );
      console.log(applicacionDelete);
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
    <div className="grid grid-cols-[3fr,1fr,1fr] group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300">
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
              <MapPin className="text-customGray w-[2rem] h-[2rem] " />

              <span className="text-customGray text-[1.4rem]">
                {job.job_id.location_id.location}
              </span>
            </div>
            <div className="flex gap-[.5rem] items-center">
              <Search className="text-customGray w-[2rem] h-[2rem] "/>
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

      <div className="flex gap-[2rem] ">
        <Link
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem] p-[1rem] "
          to={`/jobs/${job.job_id._id}`}
        >
          <Eye />
        </Link>
        <button
          onClick={handleDelete}
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem]  p-[1rem]"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default FavoriteJob
