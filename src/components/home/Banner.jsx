import React from "react";

function Banner() {
  return (
    <div className="bg-slate-100 mt-[10rem] py-[10rem] ">
      <div className="contenedor">
        <h2 className="mb-0 font-bold sm:text-center">
          What can I do with Jobtex?
        </h2>
        <p className="text-customGray sm:text-center">
          Streamline your hiring process with strategic channels to reach
          qualified candidates
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-1 gap-[2rem]  mt-[4rem] ">
          <div className="flex flex-col gap-[1rem] sm:items-center ">
            <img
              className="w-[5rem] h-[5rem] "
              src="../../public/icons/icon_hiring.png"
              alt="Icon Hiring"
            />
            <h3 className="m-0 font-bold">Reduce Hiring bias</h3>
            <p className="text-customGray sm:text-center">
              Structured digital interviews increase the predictive validity of
              your hires by 65%.
            </p>
          </div>
          <div className="flex  flex-col gap-[1rem]  sm:items-center ">
            <img
              className="w-[5rem] h-[5rem] "
              src="../../public/icons/icon_save_time.png"
              alt="Icon Hiring"
            />
            <h3 className="m-0 font-bold">Save time & headspace</h3>
            <p className="text-customGray sm:text-center">
              Reduce your time-to-hire by up to 75% and free up headspace for
              other HR
            </p>
          </div>
          <div className="flex  flex-col gap-[1rem] sm:items-center ">
            <img
              className="w-[5rem] h-[5rem] "
              src="../../public/icons/icon_ambiente.png"
              alt="Icon Hiring"
            />
            <h3 className="m-0 font-bold">Minimize Environmental Impact</h3>
            <p className="text-customGray sm:text-center">
              Did you know? U.S. office workers use ~10,000 sheets of paper
              every year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
