import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import axios from "axios";
import useJobtex from "../../../hooks/useJobtex";
import { toast } from "react-hot-toast";
import useAuthCandidate from "../../../hooks/useAuthCandidate";

function CandidateProfile() {
  const { authCandidate, tokenC } = useAuthCandidate();

  const [networksNumber, setNetworksNumber] = useState(0);

  const [file, setFile] = useState(); //photo
  const [imageURL, setImageURL] = useState(""); //URL Image
  const [fullName, setFullname] = useState(""); //fullname
  const [birth, setBirth] = useState(0); //birth
  const [number, setNumber] = useState(0); //number
  const [genderId, setGenderId] = useState(""); //Gender -- id???
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [salaryTypeId, setSalaryTypeId] = useState(""); //--id??
  const [qualificationId, setQualificationId] = useState(""); //--id??
  const [experience, setExperience] = useState(0);
  const [categorieId, setCategorieId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [locationId, setLocationId] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const [emailId, setEmailId] = useState("");

  const [cargando, setCargando] = useState(true);

  const [networksArray, setNetworksArray] = useState([
    { social: "", url: "" },
    { social: "", url: "" },
    { social: "", url: "" },
    { social: "", url: "" },
    { social: "", url: "" },
  ]);

  //Llenar los campos...
  async function getProfile() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenC}`,
      },
    };

    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/candidates/get-profile/${
        authCandidate._id
      }`,
      config
    );

    //Set Normal Data
    setFullname(data.fullname);
    setBirth(data.birth);
    setNumber(data.number);
    setEmailId(data.email);
    setGenderId(data.gender_id);
    setAge(data.age);
    setSalary(data.salary);
    setSalaryTypeId(data.salaryType);
    setQualificationId(data.qualification_id);
    setExperience(data.experiencetime);
    setCategorieId(data.categorie_id);
    setLanguageId(data.language_id);
    setJobtitle(data.jobtitle);
    setAboutMe(data.aboutme);
    setAddress(data.address);
    setVideoURL(data.video);
    setLocationId(data.location_id);
    setLatitude(data.lat);
    setLongitude(data.long);
    setImageURL(data.photo);

    //Set the array,
    ///get-candidate-networks/:id
    const candidateNet = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/network//get-candidate-networks/${authCandidate._id}`
    );
    setNetworksNumber(candidateNet.data.length);
    setNetworksArray(candidateNet.data);

    console.log(data.lat);
    if(data.lat !== undefined){
      setCargando(false);
    }

    console.log(data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  function handleSelectSocial(index, e) {
    setNetworksArray((prevState) => {
      const updatedNetworksArray = [...prevState];
      updatedNetworksArray[index] = {
        ...updatedNetworksArray[index],
        social: e.target.value,
      };
      console.log(updatedNetworksArray);
      return updatedNetworksArray;
    });
  }

  function handleInputSocial(index, e) {
    setNetworksArray((prevState) => {
      const updatedNetworksArray = [...prevState];
      updatedNetworksArray[index] = {
        ...updatedNetworksArray[index],
        url: e.target.value,
      };
      console.log(updatedNetworksArray);
      return updatedNetworksArray;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(authCandidate);

    

    if (
      [
        file,
        fullName,
        birth,
        number,
        genderId,
        age,
        salary,
        salaryTypeId,
        qualificationId,
        experience,
        categorieId,
        languageId,
        jobtitle,
        address,
        locationId,
        longitude,
        latitude,
        videoURL,
        emailId,
        aboutme,
      ].includes("")
    ) {
      return toast.error("All Fields are Required");
    }

    if (!file.name) {
      return toast.error("Image Not Found");
    }

    console.log(networksArray.length);

    let networksIncomplete = false;

    networksArray.forEach((net) => {
      if (networksNumber >= 1 && (!net.social || !net.url)) {
        networksIncomplete = true;
      }
    });

    try {
      //Guardar Imagen.
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/foreign/upload`,
        formdata
      );

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenC}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/profile-update/${
          authCandidate._id
        }`,
        {
          photo: res.data,
          fullname: fullName,
          birth,
          number,
          gender_id: genderId,
          age,
          salary,
          salaryType: salaryTypeId,
          qualification_id: qualificationId,
          experiencetime: experience,
          categorie_id: categorieId,
          language_id: languageId,
          jobtitle,
          aboutme,
          address,
          location_id: locationId,
          long: longitude,
          lat: latitude,
          video: videoURL,
          email: emailId,
        },
        config
      );

      console.log(networksNumber);

      if (networksNumber >= 1) {
        networksArray.forEach(async (net) => {
          const networkExist = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/network/get-network`,
            {
              params: {
                social_id: net.social,
                candidate_id: authCandidate._id,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenC}`,
              },
            }
          );

          if (networkExist.data.length > 0) {
            console.log("Actualizando...");

            const { data } = await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/network/update-network/${
                networkExist.data[0]._id
              }`,
              {
                url: net.url, // Include the updated data in the request body
              },
              config
            );
            console.log(data);
          } else {
            console.log("Creando...");

            const { data } = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/network/create-network`,
              {
                social_id: net.social,
                url: net.url,
                candidate_id: authCandidate._id,
              },
              config
            );
            console.log(data);
          }
        });
      }

      console.log(data);
    } catch (error) {
      return toast.error(error.message);
    }

    toast.success("Profile Successfully Updated");
    getProfile();
    window.scrollTo(0, 0);
  }

  const {
    genders,
    salaryTypes,
    qualifications,
    categories,
    languages,
    locations,
    charging,
    socials,
  } = useJobtex();

  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Profile
      </h2>

      <div className="bg-white p-[3rem]">
        <h3 className="font-bold">General</h3>

        <form onSubmit={handleSubmit}>
          <div className="border-b pb-[4rem] mb-[2rem] border-b-gray-300 ">
            <p
              className="font-semibold mb-[2rem] text-[1.4rem] "
              htmlFor="image"
            >
              Featured Image
            </p>

            <img
              className="mb-[2rem] w-[15rem] h-[15rem] "
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${imageURL}`}
              alt="Upload Your Image"
            />
            <label
              className="py-[1rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
              htmlFor="image"
            >
              Browse
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              name="photo"
              className="hidden"
              type="file"
              id="image"
            />
          </div>

          <h3 className="font-bold">Information</h3>

          <div className="grid grid-cols-2 gap-[3rem] border-b pb-[4rem] border-b-gray-300">
            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="fullname"
              >
                Fullname
              </label>
              <input
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={fullName}
                placeholder="Your Full Name"
                id="fullname"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="date"
              >
                Date of Birth
              </label>
              <input
                onChange={(e) => {
                  setBirth(Number(e.target.value));
                }}
                value={birth}
                placeholder="Your Birth Year"
                id="date"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="number"
              >
                Phone Number
              </label>
              <input
                onChange={(e) => {
                  setNumber(Number(e.target.value));
                }}
                value={number}
                id="number"
                placeholder="Enter Your Phone Number"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                value={emailId}
                placeholder="Enter Your Email"
                id="email"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="email"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                onChange={(e) => {
                  setGenderId(e.target.value);
                }}
                value={genderId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="gender"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Your Gender--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Your Gender--
                    </option>
                    {genders.map((gender) => (
                      <option key={gender._id} value={gender._id}>
                        {gender.gender}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="age"
              >
                Age
              </label>
              <input
                onChange={(e) => {
                  setAge(Number(e.target.value));
                }}
                value={age}
                id="age"
                placeholder="Enter Your Age"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                onChange={(e) => {
                  setSalary(Number(e.target.value));
                }}
                value={salary}
                id="salary"
                placeholder="Enter Your Salary"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="salarytype"
              >
                Salary Type
              </label>
              <select
                onChange={(e) => {
                  setSalaryTypeId(e.target.value);
                }}
                value={salaryTypeId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="salarytype"
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
                    {salaryTypes.map((salary) => (
                      <option key={salary._id} value={salary._id}>
                        {salary.salaryType}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="qualification"
              >
                Qualification
              </label>
              <select
                onChange={(e) => {
                  setQualificationId(e.target.value);
                }}
                value={qualificationId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="qualification"
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
                htmlFor="experience"
              >
                Experience Time
              </label>
              <input
                onChange={(e) => {
                  setExperience(Number(e.target.value));
                }}
                value={experience}
                id="experience"
                placeholder="Enter Your Years Of Experience"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="number"
              />
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
                value={categorieId}
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
                    {categories.map((cate) => (
                      <option key={cate._id} value={cate._id}>
                        {cate.categorie}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold mb-[1rem] text-[1.4rem]"
                htmlFor="language"
              >
                Language
              </label>
              <select
                onChange={(e) => {
                  setLanguageId(e.target.value);
                }}
                value={languageId}
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                id="language"
              >
                {charging ? (
                  <option disabled selected value="">
                    --Select Language--
                  </option>
                ) : (
                  <>
                    <option disabled selected value="">
                      --Select Language--
                    </option>
                    {languages.map((lang) => (
                      <option key={lang._id} value={lang._id}>
                        {lang.language}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col ">
              <label
                className="font-semibold m-0 mb-[1rem] text-[1.4rem]"
                htmlFor="jobtitle"
              >
                Job Title
              </label>
              <input
                onChange={(e) => {
                  setJobtitle(e.target.value);
                }}
                value={jobtitle}
                placeholder="Your Job Title"
                id="jobtitle"
                className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                type="text"
              />
            </div>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">About Me</h3>
            <textarea
              onChange={(e) => {
                setAboutMe(e.target.value);
              }}
              value={aboutme}
              placeholder="Give a resume about you"
              className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="mt-[2rem] border-b pb-[4rem] border-b-gray-300">
            <h3 className="font-bold">Social Network</h3>

            {Array.from({ length: networksNumber }, (_, index) => (
              <div key={index}>
                <details className="bg-gray-100 mt-[2rem] w-full py-[1.3rem] px-[2rem]  rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white">
                  <summary>Network {index + 1} </summary>
                  <div>
                    <div className="flex gap-[5rem] mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="network"
                      >
                        Network
                      </label>
                      <select
                        value={networksArray[index].social_id}
                        onChange={(e) => {
                          handleSelectSocial(index, e);
                        }}
                        className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        id="language"
                      >
                        {charging ? (
                          <option disabled selected value="">
                            --Select Network--
                          </option>
                        ) : (
                          <>
                            <option disabled selected value="">
                              --Select Network--
                            </option>
                            {socials.map((social) => (
                              <option key={social._id} value={social._id}>
                                {social.social_name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <input
                        value={networksArray[index].url}
                        onChange={(e) => {
                          handleInputSocial(index, e);
                        }}
                        className="bg-gray-100 w-full py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Write the link"
                        type="text"
                      />
                    </div>
                  </div>
                </details>
              </div>
            ))}

            <button
              onClick={(e) => {
                e.preventDefault();
                setNetworksNumber(networksNumber + 1);
              }}
              className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            >
              Add Network
            </button>
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
            value={"Save Profile"}
          />
        </form>
      </div>
    </main>
  );
}

export default CandidateProfile;
