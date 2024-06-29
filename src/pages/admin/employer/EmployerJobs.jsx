import React, { useEffect, useState } from "react";
import JobEmployer from "../../../components/admin/employer/JobEmployer";
import axios from "axios";
import useAuthEmployer from "../../../hooks/useAuthEmployer";

function EmployerJobs() {

  const {authEmployer, tokenE} = useAuthEmployer();

  const [jobsArray, setJobsArray] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function getJobs(){
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenE}`,
        },
      };

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/jobs/jobs-employer/${authEmployer._id}`
        ,
        config
      );
      
      setJobsArray(data);
      setCargando(false)

    }
    getJobs();
  }, [])

  return (
    <main>
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Manage Jobs
      </h2>

      <div className="bg-white p-[3rem]">
        <div className="grid grid-cols-5 border-b pb-[2rem] ">
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            title
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            APPLICANTS
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            CREATED & EXPIRED
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            STATUS
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            ACTIONS
          </span>
        </div>

        {cargando ? (
          "Cargando..."
        ) : (
          <div>
            {jobsArray.map(job => {
              return <JobEmployer job={job} jobsArray={jobsArray} setJobsArray={setJobsArray} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default EmployerJobs;
