import { useState, useEffect, createContext } from "react";
import axios from "axios";

const JobtexContext = createContext();

const JobtexProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [idEditJob, setIdEditJob] = useState("");

  const [genders, setGenders] = useState([]);
  const [salaryTypes, setSalaryTypes] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [socials, setSocials] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [levels, setLeveles] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [charging, setCharging] = useState(true);
  const [infoMessage, setInfoMessage] = useState({});

  useEffect(() => {
    const urlGenders = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/genders`;

    const urlSalaryType = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/salaryType`;

    const urlQualification = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/qualification`;

    const urlCategories = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/categories`;

    const urlLanguages = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/languages`;

    const urlLocations = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/locations`;

    const urlSocials = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/socials`;

    const urlJobTypes = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/job-types`;

    const urlIndustries = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/foreign/industries`;

    const urlAllJobs = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/jobs/get-all-jobs`;

    const urlAllEmployers = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/employers/get-all-employers`;

    const urlAllCandidates = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/candidates/get-candidates`;

    const urlLeveles = `${import.meta.env.VITE_BACKEND_URL}/api/foreign/levels`;

    async function getForeign() {
      const [
        dataGenders,
        dataSalType,
        dataQualification,
        dataCat,
        dataLang,
        dataLoc,
        dataSocials,
        dataJobTypes,
        dataIndustries,
        dataLevels,
        dataJobs,
        dataEmployers,
        dataCandidates
      ] = await axios.all([
        axios.get(urlGenders),
        axios.get(urlSalaryType),
        axios.get(urlQualification),
        axios.get(urlCategories),
        axios.get(urlLanguages),
        axios.get(urlLocations),
        axios.get(urlSocials),
        axios.get(urlJobTypes),
        axios.get(urlIndustries),
        axios.get(urlLeveles),
        axios.get(urlAllJobs),
        axios.get(urlAllEmployers),
        axios.get(urlAllCandidates)
      ]);

      setGenders(dataGenders.data);
      setSalaryTypes(dataSalType.data);
      setQualifications(dataQualification.data);
      setCategories(dataCat.data);
      setLanguages(dataLang.data);
      setLocations(dataLoc.data);
      setCharging(false);
      setSocials(dataSocials.data);
      setJobTypes(dataJobTypes.data);
      setIndustries(dataIndustries.data);
      setLeveles(dataLevels.data);
      setJobs(dataJobs.data);
      setEmployers(dataEmployers.data);
      setCandidates(dataCandidates.data)
    }
    getForeign();
  }, []);

  async function getProfile() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <JobtexContext.Provider
      value={{
        register,
        setRegister,
        login,
        setLogin,
        genders,
        salaryTypes,
        qualifications,
        categories,
        languages,
        locations,
        charging,
        socials,
        levels,
        industries,
        jobTypes,
        idEditJob,
        setIdEditJob,
        jobs,
        employers,
        candidates,
        setInfoMessage,
        infoMessage,
        
      }}
    >
      {children}
    </JobtexContext.Provider>
  );
};

export { JobtexProvider };

export default JobtexContext;
