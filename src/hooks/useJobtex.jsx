import { useContext } from "react";
import JobtexContext from "../context/JobtexProvider";

const useJobtex = () => {
  return useContext(JobtexContext);
};

export default useJobtex;
