import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroCandidate from "../components/candidates/HeroCandidate";
import CandidateInformation from "../components/candidates/CandidateInformation";
import CandidateAside from "../components/candidates/CandidateAside";
import ContactFormCandidate from "../components/candidates/ContactFormCandidate";
import axios from "axios";

function CandidateDetail() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState({});
  const [educations, setEducations] = useState({});
  const [experiences, setExperiences] = useState({});
  const [networks, setNetworks] = useState([]);
  const [comments, setComments] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {

    async function getCandidate(){
      try {

        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/candidates/get-candidate/${id}`
        );
        setCandidate(data);

        const edus = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/candidates/get-education/${id}`
        );
        setEducations(edus.data);

        const exps = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/candidates/get-experience/${id}`
        );
        setExperiences(exps.data);

        //get-candidate-networks/:id
        const netw = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/network/get-candidate-networks/${id}`
        );
        setNetworks(netw.data);

        const comms = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/candidates/get-comments/${id}/candidate`
        );
        setComments(comms.data);
        setCargado(true)
        
      } catch (error) {
        console.log(error);
      }
    }
    getCandidate();

  }, [])

  return (
    <div>
      <HeroCandidate candidate={candidate} />
      <div className=" my-[4rem] contenedor grid grid-cols-[2fr,1fr] gap-[7rem] md:grid-cols-1 ">
        {cargado> 0 && (
          <CandidateInformation
            candidate={candidate}
            comments={comments}
            setComments={setComments}
            educations={educations}
            experiences={experiences}
          />
        )}
        <div className="flex flex-col gap-[3rem] ">
          <CandidateAside candidate={candidate} networks={networks} />
          <ContactFormCandidate candidate_id={id} />
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail;
