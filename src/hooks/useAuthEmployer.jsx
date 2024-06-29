import { useContext } from "react";
import AuthEmployerContext  from "../context/AuthEmployerProvider";

const useAuthEmployer = () => {
  return useContext(AuthEmployerContext);
};

export default useAuthEmployer;
