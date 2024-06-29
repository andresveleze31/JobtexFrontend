import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthEmployer from "../../../hooks/useAuthEmployer";
import toast from "react-hot-toast";
import axios from "axios";
import ModalMessage from "../../ModalMessage";
import useJobtex from "../../../hooks/useJobtex";

function ApplicantCandidate({ candidate, modalMessage, setModalMessage }) {
  const [estado, setEstado] = useState("");

  const {infoMessage, setInfoMessage} = useJobtex();

  const { authEmployer, tokenE } = useAuthEmployer();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenE}`,
    },
  };

  useEffect(() => {
    setEstado(candidate.state_id.state);
  }, []);

  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(candidate.date);

  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  async function handlePending(e) {
    e.preventDefault();

    try {
      const state = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/applications/update-state/${
          candidate.candidate_id._id
        }/${candidate.job_id}`,
        {
          state_id: "65a480a91228156ecfc6ec33",
        },
        config
      );
    } catch (error) {
      console.log(error);
    }

    setEstado("Pending");
    toast.success("State Changed Succesfuly");
  }

  async function handleApproved(e) {
    e.preventDefault();

    try {
      const state = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/applications/update-state/${
          candidate.candidate_id._id
        }/${candidate.job_id}`,
        {
          state_id: "65a480a91228156ecfc6ec34",
        },
        config
      );
      setEstado("Approved");
      toast.success("State Changed Succesfuly");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRejected(e) {
    e.preventDefault();

    try {
      const state = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/applications/update-state/${
          candidate.candidate_id._id
        }/${candidate.job_id}`,
        {
          state_id: "65a480a91228156ecfc6ec35",
        },
        config
      );
      setEstado("Rejected");
      toast.success("State Changed Succesfuly");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="grid grid-cols-[3fr,1fr,1fr,1fr,1fr] group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300">
      {modalMessage && (
        <ModalMessage
          setModalMessage={setModalMessage}
        />
      )}
      <div className="flex gap-[2rem] items-center">
        <img
          className="w-[6rem] h-[6rem] rounded-full "
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
            candidate.candidate_id.photo
          }`}
          alt="Img Job"
        />
        <div className="flex flex-col gap-[.5rem]">
          <h3 className="text-[1.8rem] font-bold m-0 ">
            {candidate.candidate_id.fullname}
          </h3>
          <p className="text-[1.6rem] font-bold text-primary ">
            {candidate.candidate_id.jobtitle}{" "}
          </p>
          <div className="flex gap-[1rem]">
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_ubicacion_gray.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {candidate.candidate_id.location_id.location}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] ">{formattedDate}</p>
      </div>
      <div>
        <p
          className={`px-[2rem] py-[0.5rem] text-white text-[1.4rem] w-[10rem] text-center bg-blue-500 rounded-full `}
        >
          {estado && estado}
        </p>
      </div>

      <div className="flex flex-col gap-[1rem] mr-[3rem] ">
        <button
          onClick={handlePending}
          className="border border-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 py-[.5rem] "
        >
          Pending
        </button>
        <button
          onClick={handleApproved}
          className="border border-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 py-[.5rem] "
        >
          Approved
        </button>
        <button
          onClick={handleRejected}
          className="border border-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 py-[.5rem] "
        >
          Rejected
        </button>
      </div>

      <div className="flex gap-[2rem] ">
        <Link
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem] p-[1rem] "
          to={`/candidates/${candidate.candidate_id._id}`}
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
              candidate_id: candidate.candidate_id._id,
              employer_id: authEmployer._id,
              name: candidate.candidate_id.fullname
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

export default ApplicantCandidate;
