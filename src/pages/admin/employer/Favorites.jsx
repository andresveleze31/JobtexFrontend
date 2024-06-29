import React, { useState, useEffect } from "react";
import useAuthEmployer from "../../../hooks/useAuthEmployer";
import axios from "axios";
import FavoriteCandidate from "../../../components/admin/employer/FavoriteCandidate";

function Favorites() {
  const { authEmployer, tokenE } = useAuthEmployer();

  const [candidates, setCandidates] = useState([]);

    const [modalMessage, setModalMessage] = useState(false);


  useEffect(() => {
    async function getCandidates() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenE}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/employers/get-favorites-candidate/${authEmployer._id}`,
          config
        );
        console.log(data);
        setCandidates(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCandidates();
  }, []);

  return (
    <main>
      <div className="mb-[5rem] ">
        <h2 className="font-bold text-[2.5rem] ">
          <span className="text-primary font-black pr-[1rem] ">|</span>Candidate
          Shortlist
        </h2>

        <div className="bg-white p-[3rem]">
          <div className="grid grid-cols-[3fr,1fr,1fr] border-b pb-[2rem] ">
            <span className="text-[1.4rem] font-bold uppercase text-customGray ">
              Job Title
            </span>
            <span className="text-[1.4rem] font-bold uppercase text-customGray ">
              Posted Date
            </span>

            <span className="text-[1.4rem] font-bold uppercase text-customGray ">
              ACTIONS
            </span>
          </div>

          <div>
            {candidates.map(candidate => {
              return <FavoriteCandidate candidate={candidate} candidates={candidates} setCandidates={setCandidates} modalMessage={modalMessage} setModalMessage={setModalMessage} />
            })}
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default Favorites;
