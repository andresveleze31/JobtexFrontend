import React from "react";

function CandidateAside({ candidate, networks }) {
  return (
    <div>
      <div className="py-[2.5rem] border border-opacity-40 px-[3rem] bg-slate-100 rounded-2xl mt-[-20rem] md:mt-0 ">
        <h3 className="font-bold">Information</h3>

        <div className="border-b flex justify-between pb-[1.5rem] ">
          <p className="text-customGray text-[1.6rem] ">Offered Salary</p>
          <p className="text-[1.6rem] font-semibold">
            ${Object.keys(candidate).length > 0 && candidate.salary} /{" "}
            {Object.keys(candidate).length > 0 &&
              candidate.salaryType.salaryType}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Experience Time</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 && candidate.experiencetime} Year
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Gender</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 && candidate.gender_id.gender}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Age</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 && candidate.age}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Qualification</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 &&
              candidate.qualification_id.qualification}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Languages</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 &&
              candidate.language_id.language}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Email</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 && candidate.email}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Phone Number</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(candidate).length > 0 && candidate.number}
          </p>
        </div>

        <div className=" mt-[1.5rem] flex justify-between items-center pb-[1.3rem] sm:hidden ">
          <p className="text-customGray text-[1.6rem] ">Socials</p>
          <div className="flex gap-[2rem] items-center">
            {networks.map((network) => (
              <a
                key={network._id}
                href={`${network.url}`} // URL a la que quieres redirigir
                target="_blank" // Abre en una nueva pestaña
                rel="noopener noreferrer"
              >
                <div className="p-[1rem] group cursor-pointer hover:bg-primary transition-all duration-300 rounded-full bg-gray-200">
                  <img
                    className="w-[2rem] group-hover:filter group-hover:invert transition-all duration-300 h-[2rem]"
                    src={`../../public/icons/icon_${network.social_id.social_name}.png`}
                    alt="Icon Social"
                  />
                </div>
              </a>
            ))}
          </div>{" "}
        </div>
        <a
          target="_blank"
          href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${candidate.cv}`}
        >
          <button className="bg-white group w-full mt-[2rem]  border p-[1.3rem] hover:bg-primary transition-all duration-300 rounded-xl flex justify-between">
            <div className="flex flex-col group-hover:text-white transition-all duration-300 gap-[.8rem] ">
              <p className="text-[1.2rem] uppercase text-left font-semibold">
                CV
              </p>
              <p className="text-[1.6rem] text-left font-bold ">PDF</p>
            </div>
            <img
              className="h-[5rem] w-[5rem] group-hover:filter group-hover:brightness-50 transition-all duration-300 group-hover:opacity-50"
              src="../../public/icons/icon_pdf.png"
              alt="Icon Pdf"
            />
          </button>
        </a>

        <a
          target="_blank"
          href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${candidate.cv}`}
        >
          <button className="text-white mt-[2rem] font-semibold bg-primary py-[1rem] w-full px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 ">
            Download CV
          </button>
        </a>
      </div>
    </div>
  );
}

export default CandidateAside;
