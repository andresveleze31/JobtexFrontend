import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobInformation from "../components/jobs/JobInformation";
import JobAside from "../components/jobs/JobAside";
import EmployerAside from "../components/employers/EmployerAside";
import Map from "../components/Map";
import ContactFormEmployer from "../components/employers/ContactFormEmployer";
import axios from "axios";
import useAuthCandidate from "../hooks/useAuthCandidate";
import toast from "react-hot-toast";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [cargando, setCargando] = useState(true);
  const [employer, setEmployer] = useState({});
  const [networks, setNetworks] = useState([]);

  const { authCandidate, tokenC } = useAuthCandidate();

  useEffect(() => {
    async function getJob() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/get-general-job/${id}`
      );
      setJob(data);
      setCargando(false);
      console.log(data);

      try {


        const employer = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employers/get-employer/${
            data.employer_id._id
          }`
        );
        setEmployer(employer.data);

        const netw = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/network/get-employer-networks/${data.employer_id._id}`
        );
        setNetworks(netw.data);

      } catch (error) {
        console.log(error);
      }
    }
    getJob();
  }, []);

  async function handleApply(e) {
    e.preventDefault();

    if (!authCandidate._id) {
      return toast.error("Create a Candidate Account for applying");
    }

    //Si ya ha aplicado... No Permitir.

    try {
      console.log(job._id, authCandidate._id);
      const application = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/applications/get-application`,
        {
          params: {
            job_id: job._id,
            candidate_id: authCandidate._id,
          },
        }
      );
      console.log(application.data);
      if(application.data){
        return toast.success("You have already applied for this job");
      }
      
    } catch (error) {
      return toast.error(error.message);
    }

    //Crear Aplicacion
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenC}`,
        },
      };

      const application = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/applications/create-application`,
        {
          job_id: job._id,
          candidate_id: authCandidate._id,
        },
        config
      );
    } catch (error) {
      return toast.error(error.message);
    }

    return toast.success("Successful Application");
  }

  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(job.createdAt);

  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <main>
      <header className="hero_employer h-[40rem]"></header>

      <div className="my-[4rem] contenedor grid grid-cols-[2fr,1fr] gap-[7rem] ">
        <div>
          <div className="flex pb-[3rem]  border-b justify-between">
            <div className="flex  items-center gap-[2rem]">
              <img
                className="w-[10rem] h-[10rem] "
                src={
                  cargando
                    ? "No Image"
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        job.employer_id.photo
                      }`
                }
                alt="Logo Employer"
              />
              <div>
                <Link className="text-[1.4rem] text-primary hover:underline font-bold ">
                  {cargando ? "Jobtex Enterprise" : job.employer_id.fullname}
                </Link>
                <h3 className="font-bold mb-3">{job.title}</h3>
                <div className="flex mb-[1rem] gap-[1rem] ">
                  <div className="flex gap-[.5rem] items-center ">
                    <img
                      className="w-[2.3rem] h-[2.4rem] "
                      src="../public/icons/icon_ubicacion_gray.png"
                      alt="Icon Location"
                    />
                    <p className="text-[1.4rem] text-customGray">
                      {job.address}
                    </p>
                  </div>
                  <div className="flex gap-[.5rem] items-center ">
                    <img
                      className="w-[2.2rem] h-[2.2rem] "
                      src="../public/icons/icon_calendar_gray.png"
                      alt="Icon Location"
                    />
                    <p className="text-[1.4rem] text-customGray">
                      {formattedDate}
                    </p>
                  </div>
                </div>
                <Link className="bg-slate-200 hover:text-primary transition-all duration-300 rounded-full text-[1.2rem] px-[1rem] py-[0.5rem]  ">
                  {cargando ? "Fulltime" : job.type_id.type}
                </Link>
              </div>
            </div>

            <div>
              <div className="flex gap-[2rem]">
                <button className="border rounded-full py-[1rem] px-[1.2rem] ">
                  <img
                    className="filter opacity-25 grayscale w-[2rem] h-[2rem] "
                    src="../public/icons/icon_corazon.png"
                    alt="Icon Corazon"
                  />
                </button>
                <button
                  onClick={handleApply}
                  className="text-white font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
                >
                  Apply Now
                </button>
              </div>
              <p className="mt-[1rem] flex justify-end gap-[.5rem] text-[1.4rem] font-bold">
                <span className="text-red-600 font-normal">
                  Deadline Date:{" "}
                </span>{" "}
                {job.deadline}
              </p>
              <div className="flex justify-end mt-[1rem]">
                <img
                  className="w-[3rem] h-[3rem] "
                  src="../public/icons/icon_money.png"
                  alt="Icon Money"
                />
                <p className="font-bold">
                  ${job.minSalary} - ${job.maxSalary}{" "}
                  <span className="font-normal text-[1.4rem] text-customGray ">
                    / {cargando ? "money" : job.salaryType.salaryType}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <JobInformation job={job} />
        </div>
        <div className="flex flex-col gap-[3rem] ">
          {Object.keys(job).length > 0 && (
            <Map lat={Number(job.lat)} long={Number(job.long)} />
          )}
          <JobAside job={job} />
          <EmployerAside employer={employer} networks={networks} />
          <ContactFormEmployer />
        </div>
      </div>
    </main>
  );
}

export default JobDetails;
