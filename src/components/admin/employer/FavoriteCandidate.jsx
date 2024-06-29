import React from 'react'
import useAuthEmployer from '../../../hooks/useAuthEmployer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import ModalMessage from '../../ModalMessage';
import useJobtex from '../../../hooks/useJobtex';

function FavoriteCandidate({candidate, candidates, setCandidates, modalMessage, setModalMessage}) {
  // Crear un objeto Date con la fecha de MongoDB
  const dateObject = new Date(candidate.candidate_id.createdAt);

  const {authEmployer, tokenE } = useAuthEmployer();

    const { infoMessage, setInfoMessage } = useJobtex();


  // Configurar las opciones de formato
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Formatear la fecha según las opciones
  const formattedDate = dateObject.toLocaleDateString("en-US", options);



  async function handleDelete(e) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenE}`,
      },
    };

    try {
      const applicacionDelete = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/employers/delete-favorite-candidate/${candidate._id}`,
        config
      );
      console.log(applicacionDelete);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setCandidates(
      candidates.filter((j) => {
        if (j._id !== candidate._id) {
          return j;
        }
      })
    );

    toast.success("Candidate Deleted Succesfully");
  }

  return (
    <div className="grid grid-cols-[3fr,1fr,1fr] group border-b py-[2rem] px-[1rem] hover:bg-gray-100  items-center justify-center transition-all duration-300">
      {modalMessage && <ModalMessage setModalMessage={setModalMessage} />}
      <div className="flex gap-[2rem] items-center">
        <img
          className="w-[6rem] h-[6rem] "
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
            candidate.candidate_id.photo
          }`}
          alt="Img Job"
        />
        <div className="flex flex-col gap-[1rem]">
          <h3 className="text-[1.8rem] font-bold m-0 ">
            {candidate.candidate_id.fullname}
          </h3>
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
            <div className="flex gap-[.5rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] "
                src="../../public/icons/icon_lupa_black.png"
                alt="Icon Ubicacion"
              />
              <span className="text-customGray text-[1.4rem]">
                {candidate.candidate_id.jobtitle}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[1.4rem] ">{formattedDate}</p>
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
          onClick={handleDelete}
          className="bg-gray-100 group-hover:bg-white transition-all duration-300 w-[4.5rem]  p-[1rem]"
        >
          <img
            className="w-[2.5rem] h-[2.5rem] "
            src="../../public/icons/icon_delete.png"
            alt="Icon Delete"
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setInfoMessage({
              candidate_id: candidate.candidate_id._id,
              employer_id: authEmployer._id,
              name: candidate.candidate_id.fullname,
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

export default FavoriteCandidate
