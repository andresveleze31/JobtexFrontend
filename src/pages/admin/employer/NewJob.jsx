import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import axios from "axios";
import useJobtex from "../../../hooks/useJobtex";
import { toast } from "react-hot-toast";
import useAuthEmployer from "../../../hooks/useAuthEmployer";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

function NewJob() {

  const navigate = useNavigate();

  const { authEmployer, tokenE } = useAuthEmployer();

  const [title, setTitle] = useState(""); 
  const [value, setValue] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [type_id, setTypeId] = useState("");
  const [deadline, setDeadLine] = useState(""); //fullname
  const [salaryType, setSalaryType] = useState(""); //founder date
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [industry_id, setIndustryId] = useState("");
  const [qualification_id, setQualificationId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [experiencetime, setExperience] = useState(0);
  const [address, setAddress] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [videoURL, setVideoURL] = useState("");

  const [cargando, setCargando] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      [
        title,
        value,
        type_id,
        deadline,
        salaryType,
        minSalary,
        maxSalary,
        industry_id,
        qualification_id,
        level_id,
        experiencetime,
        address,
        locationId,
        longitude,
        latitude,
        videoURL
      ].includes("")
    ) {
      return toast.error("All Fields are Required");
    }

    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenE}`,
        },
      };

      const newJob = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/create-job`,
        {
          title,
          description: value,
          employer_id: authEmployer._id,
          categorie_id,
          type_id,
          deadline,
          salaryType,
          minSalary,
          maxSalary,
          industry_id,
          qualification_id,
          level_id,
          experiencetime,
          address,
          location_id: locationId,
          long: longitude,
          lat: latitude,
          video: videoURL,
        },
        config
      );
    } catch (error) {
      return toast.error(error.message);
    }

    toast.success("Job Created Successfully");
    navigate("/admin/employer/jobs");
    //getProfile();
    window.scrollTo(0, 0);
  }

  const {
    categories,
    locations,
    charging,
    jobTypes,
    industries,
    levels,
    salaryTypes,
    qualifications
  } = useJobtex();


  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Submit a
        Job
      </h2>

      <div className="bg-white p-[3rem]">
        <h3 className="font-bold">General</h3>

        <form onSubmit={handleSubmit}>
          <div className="border-b pb-[4rem] border-b-gray-300 mb-[4rem] ">
            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="fullname"
              >
                Job Title
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                placeholder="Your Full Name"
                id="fullname"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="description"
              >
                Description
              </label>
              <ReactQuill
                id="description"
                className="h-[30rem] "
                theme="snow"
                value={value}
                onChange={setValue}
              />
              ;
            </div>
          </div>

          <h3 className="font-bold">Information</h3>

          <div className="grid grid-cols-2 gap-[3rem] border-b pb-[4rem] border-b-gray-300">
            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="fullname"
              >
                Application Deadline Date
              </label>
              <input
                onChange={(e) => {
                  setDeadLine(e.target.value);
                }}
                value={deadline}
                placeholder="Your Full Name"
                id="fullname"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="number"
              >
                Max Salary
              </label>
              <input
                onChange={(e) => {
                  setMaxSalary(Number(e.target.value));
                }}
                value={maxSalary}
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="number"
              >
                Min Salary
              </label>
              <input
                onChange={(e) => {
                  setMinSalary(Number(e.target.value));
                }}
                value={minSalary}
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="number"
              >
                Experience
              </label>
              <input
                onChange={(e) => {
                  setExperience(Number(e.target.value));
                }}
                value={experiencetime}
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Type of Job
              </label>
              <select
                onChange={(e) => {
                  setTypeId(e.target.value);
                }}
                value={type_id}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Type Of Job--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Type Of Job--
                    </option>
                    {jobTypes.map((job) => (
                      <option key={job._id} value={job._id}>
                        {job.type}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Salary Type
              </label>
              <select
                onChange={(e) => {
                  setSalaryType(e.target.value);
                }}
                value={salaryType}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Salary Type--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Salary Type--
                    </option>
                    {salaryTypes.map((sal) => (
                      <option key={sal._id} value={sal._id}>
                        {sal.salaryType}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Industry
              </label>
              <select
                onChange={(e) => {
                  setIndustryId(e.target.value);
                }}
                value={industry_id}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Industry--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Industry--
                    </option>
                    {industries.map((ind) => (
                      <option key={ind._id} value={ind._id}>
                        {ind.industry}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Qualification
              </label>
              <select
                onChange={(e) => {
                  setQualificationId(e.target.value);
                }}
                value={qualification_id}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Qualification--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Qualification--
                    </option>
                    {qualifications.map((qua) => (
                      <option key={qua._id} value={qua._id}>
                        {qua.qualification}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Career Level
              </label>
              <select
                onChange={(e) => {
                  setLevelId(e.target.value);
                }}
                value={level_id}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Level--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Level--
                    </option>
                    {levels.map((lvl) => (
                      <option key={lvl._id} value={lvl._id}>
                        {lvl.level}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="categorie"
              >
                Categorie
              </label>
              <select
                onChange={(e) => {
                  setCategorieId(e.target.value);
                }}
                value={categorie_id}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="categorie"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Categorie--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Categorie--
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categorie}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">Contact Information</h3>

            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="address"
              >
                Friendly Address
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                placeholder="Give An Address"
                id="address"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="video"
              >
                Introduction Video URL
              </label>
              <input
                onChange={(e) => {
                  setVideoURL(e.target.value);
                }}
                value={videoURL}
                placeholder="Youtube Link"
                id="video"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="location"
              >
                Location
              </label>
              <select
                onChange={(e) => {
                  setLocationId(e.target.value);
                }}
                value={locationId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="location"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Location--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Location--
                    </option>
                    {locations.map((loca) => (
                      <option key={loca._id} value={loca._id}>
                        {loca.location}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col mt-[2rem] ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="map"
              >
                Map
              </label>

              {cargando ? (
                <p className="text-primary font-bold">Write your Coords</p>
              ) : (
                <Map lat={Number(latitude)} long={Number(longitude)} />
              )}
            </div>

            <div className="grid grid-cols-2 mt-[2rem] gap-[3rem] ">
              <div>
                <label
                  className="font-semibold mb-[1rem] text-[1.4rem]"
                  htmlFor="latitude"
                >
                  Latitude
                </label>

                <input
                  onChange={(e) => {
                    setLatitude(Number(e.target.value));
                  }}
                  value={latitude}
                  placeholder="Latitude"
                  id="latitude"
                  className="bg-gray-100 mt-[1rem] w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                  type="number"
                />
              </div>
              <div>
                <label
                  className="font-semibold mb-[1rem] text-[1.4rem]"
                  htmlFor="longitude"
                >
                  Longitude
                </label>

                <input
                  onChange={(e) => {
                    setLongitude(Number(e.target.value));
                  }}
                  value={longitude}
                  placeholder="Longitude"
                  id="longitude"
                  className="bg-gray-100 mt-[1rem] w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                  type="number"
                />
              </div>
            </div>
          </div>

          <input
            className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            type="submit"
            value={"Submit Job"}
          />
        </form>
      </div>
    </main>
  );
}

export default NewJob;
