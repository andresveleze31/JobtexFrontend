import React from "react";

function Error({ mensaje }) {
  return (
    <p className="text-[1.4rem] mt-[2rem] bg-red-100 font-bold rounded-xl text-red-500 border border-red-500 text-center py-[1rem] w-full ">
      {mensaje}
    </p>
  );
}

export default Error;
