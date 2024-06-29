import React from "react";
import { Link } from "react-router-dom";

function HeroCandidate({candidate}) {
  return (
    <header className="py-[5rem]  hero_candidate">
      <div className="contenedor px-[2rem] md:flex md:flex-col md:items-center ">
        <div className="flex md:flex-col items-center gap-[2rem]">
          <img
            className="rounded-lg w-[12rem] h-[12rem] "
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              candidate.photo
            }`}
            alt="Candidate Photo"
          />
          <div className="md:text-center md:flex-col md:items-center">
            <p className="text-white mb-[.5rem] text-[1.4rem] font-bold">
              {Object.keys(candidate).length > 0 && candidate.jobtitle}
            </p>
            <h3 className="text-white font-bold mb-5">
              {" "}
              {Object.keys(candidate).length > 0 && candidate.fullname}
            </h3>
            <div className="flex gap-[1rem] items-center md:justify-center ">
              <img
                className="w-[2.3rem] h-[2.4rem] "
                src="../public/icons/icon_ubicacion_white.png"
                alt="Icon Location"
              />
              <p className="text-[1.4rem] text-white">
                {" "}
                {Object.keys(candidate).length > 0 && candidate.address}
              </p>
            </div>

            <div className="flex mt-[1.5rem] gap-[2rem]">
              <div className="flex gap-[1rem]">
                <Link
                  className="bg-white rounded-full hover:bg-opacity-100 hover:text-primary transition-all duration-300 px-[1.5rem] py-[.5rem]  bg-opacity-20 text-white text-[1.2rem] "
                  to={"#"}
                >
                  {Object.keys(candidate).length > 0 &&
                    candidate.categorie_id.categorie}
                </Link>
              </div>
              <div className="flex items-center">
                <img
                  className="w-[2.5rem] h-[2.5rem] filter invert "
                  src="../../public/icons/icon_money.png"
                  alt="Icon Money"
                />
                <p className="text-white text-[1.6rem] ">
                  $ {Object.keys(candidate).length > 0 && candidate.salary} /{" "}
                  {Object.keys(candidate).length > 0 &&
                    candidate.salaryType.salaryType}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="text-white mt-[2rem] hover:bg-white hover:text-primary transition-all duration-300 py-[1rem] font-bold px-[2rem] border border-white rounded-lg ">
          Add to ShortList
        </button>
      </div>
    </header>
  );
}

export default HeroCandidate;
