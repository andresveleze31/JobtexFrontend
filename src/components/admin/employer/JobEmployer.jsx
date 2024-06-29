import React from "react";
import { Link } from "react-router-dom";
import useJobtex from "../../../hooks/useJobtex";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthEmployer from "../../../hooks/useAuthEmployer";

function JobEmployer({ job, jobsArray, setJobsArray }) {
  const { idEditJob, setIdEditJob } = useJobtex();
  const {tokenE} = useAuthEmployer();

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
        Authorization: `Bearer ${tokenE}`,
      },
    };

    try {

      const deleteApplications = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/applications/delete-application-jobs/${job._id}`,
        config
      );

      const jobDelete = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/delete-job/${job._id}`,
        config
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setJobsArray(
      jobsArray.filter((j) => {
        if (j._id !== job._id) {
          return j;
        }
      })
    );

    toast.success("Job Deleted Succesfully");
  }

  return (
    <div className="grid grid-cols-5 group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300">
      <div className="flex flex-col gap-[.5rem]">
        <h3 className="font-bold m-0">{job.title}</h3>

        <div className="flex gap-[.5rem] items-center ">
          <img
            className="w-[2.2rem] h-[2.2rem] "
            src="../../public/icons/icon_ubicacion_gray.png"
            alt="Icon Location"
          />
          <p className="text-[1.4rem] text-customGray">
            {job.location_id.location}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] ">0 applicant(s)</p>
      </div>

      <div className="flex flex-col gap-[1rem]">
        <p className="text-[1.4rem] ">Created: {formattedDate}</p>
        <p className="text-[1.4rem] ">
          Expiry Date: <span className="text-red-600">{job.deadline}</span>
        </p>
      </div>

      <div>
        <p className="bg-primary px-[1rem] py-[0.5rem] rounded-full text-white font-bold text-center text-[1.4rem] w-[10rem]  ">
          Published
        </p>
      </div>

      <div className="flex gap-[2rem] ">
        <Link
          onClick={() => {
            setIdEditJob(job._id);
          }}
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem] p-[1rem] "
          to={"/admin/employer/edit-job"}
        >
          <img
            className="w-[2.5rem] h-[2.5rem]  "
            src="../../public/icons/icon_edit.png"
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

export default JobEmployer;
