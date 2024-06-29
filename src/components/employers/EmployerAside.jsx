import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function EmployerAside({ employer, networks }) {
  useEffect(() => {
    async function getNetworksEmployer() {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/network/get-employer-networks/${employer._id}`
      );
      console.log(data);
    }
    getNetworksEmployer();
  }, [employer]);

  return (
    <div>
      <div className="py-[2.5rem] border border-opacity-40 px-[3rem] bg-slate-100 rounded-2xl">
        <h3 className="font-bold">Company Information</h3>

        <div className="border-b flex justify-between pb-[1.5rem] ">
          <p className="text-customGray text-[1.6rem] ">Categories</p>
          <p className="text-[1.6rem] font-semibold text-primary">
            {Object.keys(employer).length > 0 &&
              employer.categorie_id.categorie}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Founded Date</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(employer).length > 0 && employer.founded}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Company Size</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(employer).length > 0 && employer.size}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Location</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(employer).length > 0 && employer.location_id.location}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Email</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(employer).length > 0 && employer.email}
          </p>
        </div>

        <div className="border-b mt-[1.5rem] flex justify-between pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Phone Number</p>
          <p className="text-[1.6rem] font-semibold">
            {Object.keys(employer).length > 0 && employer.number}
          </p>
        </div>

        <div className=" mt-[1.5rem] flex justify-between items-center pb-[1.3rem] ">
          <p className="text-customGray text-[1.6rem] ">Socials</p>
          <div className="flex gap-[2rem] items-center">
            {networks.length > 0 && networks.map((network) => (
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

        <Link
          to={Object.keys(employer).length > 0 && employer.website}
          className="text-white block text-center w-full mt-[2rem] font-semibold bg-primary py-[1rem]  px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
        >
          Visit Us
        </Link>
      </div>
    </div>
  );
}

export default EmployerAside;
