import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import axios from "axios";
import useJobtex from "../../../hooks/useJobtex";
import { toast } from "react-hot-toast";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
import AppliedJob from "../../../components/admin/candidate/AppliedJob";

function CandidateJobs() {
  const { authCandidate, tokenC } = useAuthCandidate();

  const [jobs, setJobs] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    async function getJobsApplied(){

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenC}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/applications/get-application/${authCandidate._id}`,
          config
        );
        console.log(data);
        setJobs(data);
        
      } catch (error) {
        console.log(error);        
      }
    }
    getJobsApplied();

  }, [] )

  

  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Applied
        Jobs
      </h2>

      <div className="bg-white p-[3rem]">
        <div className="grid grid-cols-[3fr,1fr,1fr,1fr] border-b pb-[2rem] ">
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Job Title
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Date Applied
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            STATUS
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            ACTIONS
          </span>
        </div>

        <div>
          {jobs.map(job => {
            return <AppliedJob job={job} jobs={jobs} setJobs={setJobs} />
          })}
        </div>

        
      </div>
    </main>
  );
}

export default CandidateJobs;
