import React from 'react'
import { Link } from 'react-router-dom'

function Categoria({categoria}) {
  return (
    <Link
      to={"#"}
      className="bg-slate-100 hover:bg-secondary rounded-xl p-[3rem] hover:text-white transition-all duration-300 group "
    >
      <h3 className="text-[2rem] m-0 font-bold">{categoria.categorie}</h3>
      <p className="text-[1.4rem] mb-[1rem] ">Jobs avalaible</p>
      <span className="text-[1.4rem] group-hover:text-white transition-all duration-300  text-primary ">
        Explore Jobs {" >"}{" "}
      </span>
    </Link>
  );
}

export default Categoria
