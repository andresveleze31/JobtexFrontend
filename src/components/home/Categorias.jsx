import React, { useEffect } from "react";
import Categoria from "./Categoria";
import { Link } from "react-router-dom";
import useJobtex from "../../hooks/useJobtex";
import { StepForward } from "lucide-react";
import Loader from "../Loader";

function Categorias() {
  const { categories } = useJobtex();

  if (categories.length == 0) {
    return(
      <Loader />
    )
  }

  return (
    <div className="contenedor mt-[5rem] ">
      <div className="flex justify-between sm:flex-col sm:items-start sm:gap-[1rem] items-center">
        <div>
          <h2 className="mb-0 font-bold">Browse By Category</h2>
          <p className="text-customGray">
            Recruitment Made Easy in 100 seconds
          </p>
        </div>
        <Link className="font-semibold  flex gap-[2rem] items-center " to={"#"}>
          All Categories <StepForward />
        </Link>
      </div>

      <div className="grid  mt-[5rem] grid-cols-5 gap-[2rem] sm:grid-cols-1 md:grid-cols-2">
        {categories.map((categorie) => {
          return <Categoria key={categorie._id} categoria={categorie} />;
        })}
      </div>
    </div>
  );
}

export default Categorias;
