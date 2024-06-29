import React from "react";

function Clients() {
  return (
    <div className="bg-secondary py-[5rem]">
      <div className="contenedor">
        <h3 className="text-center font-bold text-white mb-[4rem]">
          Over 100,000 recruiters use Jobtex to modernize their hiring
        </h3>

        <div className="grid grid-cols-6 gap-[4rem] sm:grid-cols-2 md:p-[1rem] md:grid-cols-3 md:items-center md:justify-center  ">
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_1.png" alt="Imagen Brand" />
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_2.png" alt="Imagen Brand" />
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_3.png" alt="Imagen Brand" />
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_4.png" alt="Imagen Brand" />
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_5.png" alt="Imagen Brand" />
            <img className="opacity-50 hover:opacity-100 transition-all duration-300" src="../../public/images/brand_6.png" alt="Imagen Brand" />
        </div>
      </div>
    </div>
  );
}

export default Clients;
