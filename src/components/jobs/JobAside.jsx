import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JobAside({job}) {
  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(job.createdAt);

  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);


  useEffect(()=> {
    setCargando(false);
  },[job] )

  const [cargando, setCargando] = useState(true);

  return (
    <div>
      <div>
        <div className="py-[2.5rem] border border-opacity-40 px-[3rem] bg-slate-100 rounded-2xl">
          <h3 className="font-bold">Job Information</h3>

          <div className="border-b flex justify-between pb-[1.5rem] ">
            <p className="text-customGray text-[1.6rem] ">Date Posted</p>
            <p className="text-[1.6rem] font-semibold text-primary">
              {formattedDate}
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Location</p>
            <p className="text-[1.6rem] font-semibold">
              {Object.keys(job).length > 0 && job.location_id.location}{" "}
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Category</p>
            <p className="text-[1.6rem] font-semibold">
              {Object.keys(job).length > 0 && job.categorie_id.categorie}
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Offered Salary</p>
            <p className="text-[1.6rem] font-semibold">
              ${job.minSalary} - ${job.maxSalary} / month
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Expiration date</p>
            <p className="text-[1.6rem] font-semibold">{job.deadline}</p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Experience</p>
            <p className="text-[1.6rem] font-semibold">
              {job.experiencetime} year(s)
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Industry</p>
            <p className="text-[1.6rem] font-semibold">
              {Object.keys(job).length > 0 && job.industry_id.industry}
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Qualification</p>
            <p className="text-[1.6rem] font-semibold">
              {Object.keys(job).length > 0 &&
                job.qualification_id.qualification}
            </p>
          </div>

          <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
            <p className="text-customGray text-[1.6rem] ">Career Level</p>
            <p className="text-[1.6rem] font-semibold">
              {Object.keys(job).length > 0 && job.level_id.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobAside;
