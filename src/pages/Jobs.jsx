import React from "react";
import BannerNav from "../components/BannerNav";
import Job from "../components/Job";
import FormularioJobs from "../components/jobs/FormularioJobs";
import useJobtex from "../hooks/useJobtex";

function Jobs() {

  const {jobs} = useJobtex();

  return (
    <main>
      <BannerNav namePage={"Jobs"} />

      <div className="contenedor my-[5rem] grid grid-cols-[1fr,2fr] gap-[3rem] md:grid-cols-1 ">
        <FormularioJobs />
        <div className="grid grid-cols-2 gap-[2rem] md:grid-cols-1  ">
          {jobs.map((job) => {
            return <Job job={job} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Jobs;
