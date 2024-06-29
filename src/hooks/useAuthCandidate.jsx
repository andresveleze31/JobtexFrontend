import { useContext } from "react";
import AuthCandidateContext from "../context/AuthCandidateProvider";

const useAuthCandidate = () => {
  return useContext(AuthCandidateContext);
};

export default useAuthCandidate;
