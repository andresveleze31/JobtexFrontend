import React from "react";
import { Link } from 'react-router-dom'

function BannerNav({namePage}) {
  return (
    <div className="bg-slate-100 py-[2rem]">
      <div className="contenedor">
        <p className=" flex gap-[1rem] text-customGray ">
          <Link to={"/"}>Home</Link><li>{namePage}</li>
        </p>
      </div>
    </div>
  );
}

export default BannerNav;
