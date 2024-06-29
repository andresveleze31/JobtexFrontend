import React from "react";
import { Link } from "react-router-dom";
import ModalMessage from "../../ModalMessage";
import useJobtex from "../../../hooks/useJobtex";

function MessageCandidate({ message, setModalMessage, modalMessage }) {
  const dateObject = new Date(message.createdAt);
  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  const { infoMessage, setInfoMessage } = useJobtex();

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="grid grid-cols-[3fr,1fr,2fr,2fr,1fr] group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300 ">
      {modalMessage && <ModalMessage setModalMessage={setModalMessage} />}
      <div className="flex gap-[2rem] items-center">
        <img
          className="w-[6rem] h-[6rem] "
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
            message.candidate_id.photo
          }`}
          alt="Img Job"
        />
        <div className="flex flex-col gap-[1rem]">
          <h3 className="text-[1.8rem] font-bold m-0 ">
            {message.candidate_id.fullname}
          </h3>
          <div className="flex gap-[1rem]">
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_ubicacion_gray.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {message.candidate_id.location_id.location}
              </span>
            </div>
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_lupa_black.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {message.candidate_id.categorie_id.categorie}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] ">{formattedDate}</p>
      </div>
      <div>
        <p className="text-[1.4rem] ">{message.subject}</p>
      </div>
      <div>
        <p className="text-[1.4rem] ">{message.message}</p>
      </div>

      <div className="flex gap-[2rem] ">
        <Link
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem] p-[1rem] "
          to={`/employers/${message.employer_id._id}`}
        >
          <img
            className="w-[2.5rem] h-[2.5rem]  "
            src="../../public/icons/icon_eye.png"
            alt="Icon Edit"
          />
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            setInfoMessage({
              candidate_id: message.candidate_id._id,
              employer_id: message.employer_id._id,
              name: message.candidate_id.fullname,
            });
            setModalMessage(true);
          }}
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem]  p-[1rem]"
        >
          <img
            className="w-[2.5rem] h-[2.5rem] "
            src="../../public/admin/icon_message.png"
            alt="Icon Delete"
          />
        </button>
      </div>
    </div>
  );
}

export default MessageCandidate;
