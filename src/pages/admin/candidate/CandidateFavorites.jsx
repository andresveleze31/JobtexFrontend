import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import axios from "axios";
import useJobtex from "../../../hooks/useJobtex";
import { toast } from "react-hot-toast";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
import AppliedJob from "../../../components/admin/candidate/AppliedJob";
import FavoriteJob from "../../../components/admin/candidate/FavoriteJob";

function CandidateFavorites() {
  const { authCandidate, tokenC } = useAuthCandidate();

  const [jobs, setJobs] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function getJobsApplied() {
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
          }/api/candidates/get-favorites-jobs/${authCandidate._id}`,
          config
        );
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    }
    getJobsApplied();
  }, []);

  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Jobs
        Shortlist
      </h2>

      <div className="bg-white p-[3rem]">
        <div className="grid grid-cols-[3fr,1fr,1fr] border-b pb-[2rem] ">
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Job Title
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Posted Date
          </span>

          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            ACTIONS
          </span>
        </div>

        <div>
          {jobs.map((job) => {
            return <FavoriteJob job={job} jobs={jobs} setJobs={setJobs} />
          })}
        </div>
      </div>
    </main>
  );
}

export default CandidateFavorites;
