import React from "react";
import BannerNav from "../components/BannerNav";
import FormularioEmployers from "../components/employers/FormularioEmployers";
import Employer from "../components/Employer";
import useJobtex from "../hooks/useJobtex";

function Employers() {

  const {employers} = useJobtex();

  return (
    <main>
      <BannerNav namePage={"Employers"} />
      <FormularioEmployers />

      <div className="contenedor mb-[10rem] ">
        <div className="grid grid-cols-3 gap-[2rem] md:grid-cols-2 sm:grid-cols-1">
          {employers.map((emp) => {
            return <Employer employer={emp} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Employers;
