import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Comment({comment}) {
  console.log(comment);

  const [type, setType] = useState(false);
  //"#e5e5e5"
  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(comment.createdAt);
  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  useEffect(() => {
    if (comment.type === "candidate") {
      setType(true);
    }
  }, []);

  return (
    <div className="py-[4rem] border-b  ">
      <div className="flex justify-between">
        <div className="flex gap-[2rem] ">
          <img
            className="w-[6rem] h-[6rem] "
            src={
              type
                ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    comment.employer_id.photo
                  }`
                : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    comment.candidate_id.photo
                  }`
            }
            alt="Imagen Empresa"
          />
          <div>
            <h4 className="text-[1.8rem] font-bold">
              {type
                ? comment.employer_id.fullname
                : comment.candidate_id.fullname}
            </h4>
            <span className="text-customGray text-[1.4rem] ">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex gap-[.2rem] ">
          {Object.keys(comment).length > 0 && (
            <>
              {Array.from({ length: comment.rating }, (_, index) => (
                <FaStar key={index} color="yellow" size={17} />
              ))}
              {Array.from({ length: 5 - comment.rating }, (_, index) => (
                <FaStar key={index} color="#e5e5e5" size={17} />
              ))}
            </>
          )}
        </div>
      </div>

      <p className="text-[1.6rem] mt-[2rem]  text-customGray">
        {comment.comment}
      </p>
    </div>
  );
}

export default Comment;
