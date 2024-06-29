import React from 'react'
import { Link } from "react-router-dom";

function Employer({employer}) {
  console.log(employer)
  return (
    <div className="p-[2rem] border border-slate-200 border-opacity-50 hover:border-primary transition-all duration-300 flex justify-center">
      <div className='flex-col items-center'>
        <div className="flex gap-[2rem] items-center ">
          <img
            className="w-[6rem] h-[6rem] "
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              employer.photo
            }`}
            alt="Logo Employers"
          />
          <div className="flex flex-col gap-[.5rem] ">
            <Link className="text-[1.4rem] text-primary font-bold hover:underline">
              {employer.email > 0 && employer.categorie_id.categorie}
            </Link>
            <Link
              to={`/employers/${employer._id}`}
              className="text-[2rem]  font-bold hover:text-primary transition-all duration-300 "
            >
              {employer.fullname}
            </Link>
            <div className="flex gap-[1rem] ">
              <div className="flex gap-[.5rem] items-center ">
                <img
                  className="w-[2.3rem] h-[2.4rem] "
                  src="../public/icons/icon_ubicacion_gray.png"
                  alt="Icon Location"
                />
                <p className="text-[1.4rem] text-customGray">
                  {employer.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[2rem] mt-[2rem] justify-center items-center">
          <Link className="text-white font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 ">
            Open Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Employer
