import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
import axios from "axios";

function CandidateResume() {
  const { authCandidate, tokenC } = useAuthCandidate();

  const [file, setFile] = useState();
  const [cvURL, setCvURL] = useState("");
  const [educationNumber, setEducationNumber] = useState(0);
  const [experienceNumber, setExperienceNumber] = useState(0);

  const [educationArray, setEducationArray] = useState([]);
  const [experienceArray, setExperienceArray] = useState([]);

  useEffect(() => {
    async function getResume() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/get-education/${
          authCandidate._id
        }`
      );

      const experiences = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/get-experience/${
          authCandidate._id
        }`
      );
      setEducationNumber(data.length);
      setEducationArray(data);

      setExperienceNumber(experiences.data.length);
      setExperienceArray(experiences.data);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenC}`,
        },
      };

      const profile = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/get-profile/${
          authCandidate._id
        }`,
        config
      );

      setCvURL(profile.data.cv);

    }
    getResume();

    setTimeout(() => {
      console.log(educationArray);
    }, 3000);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (file === undefined && !cvURL) {
      return toast.error("You Havent Upload a CV");
    }

    if (educationArray.length === 0 || experienceArray.length === 0) {
      return toast.error("Education and Experience is Required");
    }

    educationArray.forEach((edu, index) => {
      if ([edu.title, edu.academy, edu.years, edu.description].includes("")) {
        return toast.error(
          "All Fields In Education " + (index + 1) + " are Required"
        );
      }
    });

    experienceArray.forEach((exp, index) => {
      if ([exp.title, exp.company, exp.years, exp.description].includes("")) {
        return toast.error(
          "All Fields In Experience " + (index + 1) + " are Required"
        );
      }
    });

    //Subir Imagen

    try {
      //Guardar Imagen.
      if( (file === undefined) && !cvURL){
        const formdata = new FormData();
        formdata.append("file", file);
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/foreign/upload`,
          formdata
        );
        setCvURL(res.data);
      }
      

      if (cvURL) {
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
            cv: cvURL,
          },
          config
        );
      }

      //Cada Education. //Actualizacion o creacion

      educationArray.forEach(async (edu) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenC}`,
          },
        };

        if (edu._id) {
          const education = await axios.put(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/candidates/update-education/${edu._id}`,
            {
              title: edu.title,
              academy: edu.academy,
              years: edu.years,
              description: edu.description,
            },
            config
          );
        } else {
          const education = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/candidates/create-education/${authCandidate._id}`,
            {
              title: edu.title,
              academy: edu.academy,
              year: edu.years,
              description: edu.description,
            },
            config
          );
        }
      });

      //Cada Experiencia. //Actualizacion o creacion.
      experienceArray.forEach( async(exp) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenC}`,
          },
        };

        if(exp._id){
          const experience = await axios.put(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/candidates/update-experience/${exp._id}`,
            {
              title: exp.title,
              company: exp.company,
              years: exp.years,
              description: exp.description,
            },
            config
          );
        }else{
          const experience = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/candidates/create-experience/${authCandidate._id}`,
            {
              title: exp.title,
              company: exp.company,
              year: exp.years,
              description: exp.description,
            },
            config
          );
          console.log(experience);
        }

      })

      toast.success("Your resume was updated successfully.");


    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <main>
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Edit Resume
      </h2>

      <div className="bg-white p-[3rem]">
        <h3 className="font-bold">CV File</h3>

        <form onSubmit={handleSubmit}>
          <div className="border-b pb-[4rem] mb-[2rem] border-b-gray-300 ">
            <p className="font-semibold mb-[2rem] text-[1.4rem] " htmlFor="cv">
              CV Attachment
            </p>

            <label
              className="py-[1rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
              htmlFor="cv"
            >
              Browse
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              name="cv"
              className="hidden"
              type="file"
              id="cv"
            />
          </div>

          <h3 className="font-bold">Education</h3>

          <div className="border-b pb-[4rem] mb-[2rem] border-b-gray-300 ">
            {Array.from({ length: educationNumber }, (_, index) => (
              <div key={index}>
                <details className=" mt-[2rem] w-full    rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white">
                  <summary className="bg-gray-100 py-[1.3rem] border rounded-xl px-[2rem]">
                    Education {index + 1}{" "}
                  </summary>
                  <div className="w-full  py-[1.3rem] ">
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        value={educationArray[index].title}
                        onChange={(e) => {
                          setEducationArray((prevEducationArray) => {
                            const newEducationArray = [...prevEducationArray];
                            newEducationArray[index].title = e.target.value;
                            return newEducationArray;
                          });
                          console.log(educationArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Write the Title"
                        type="text"
                        id="title"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="academy"
                      >
                        Academy
                      </label>
                      <input
                        value={educationArray[index].academy}
                        onChange={(e) => {
                          setEducationArray((prevEducationArray) => {
                            const newEducationArray = [...prevEducationArray];
                            newEducationArray[index].academy = e.target.value;
                            return newEducationArray;
                          });
                          console.log(educationArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Your Academy"
                        type="text"
                        id="academy"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-start">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="year"
                      >
                        Year
                      </label>
                      <input
                        value={educationArray[index].years}
                        onChange={(e) => {
                          setEducationArray((prevEducationArray) => {
                            const newEducationArray = [...prevEducationArray];
                            newEducationArray[index].years = e.target.value;
                            return newEducationArray;
                          });
                          console.log(educationArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="2015-2017"
                        type="text"
                        id="year"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-start">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="year"
                      >
                        Description
                      </label>
                      <textarea
                        value={educationArray[index].description}
                        onChange={(e) => {
                          setEducationArray((prevEducationArray) => {
                            const newEducationArray = [...prevEducationArray];
                            newEducationArray[index].description =
                              e.target.value;
                            return newEducationArray;
                          });
                          console.log(educationArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </details>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                setEducationNumber(educationNumber + 1);
                const newEducation = {
                  title: "",
                  academy: "",
                  years: "",
                  description: "",
                  _id: "",
                };
                educationArray[educationNumber] = newEducation;
                console.log(educationArray);
              }}
              className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            >
              Add Education
            </button>
          </div>

          <h3 className="font-bold mt-[2rem] ">Experience</h3>

          <div>
            {Array.from({ length: experienceNumber }, (_, index) => (
              <div key={index}>
                <details className=" mt-[2rem] w-full    rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white">
                  <summary className="bg-gray-100 py-[1.3rem] border rounded-xl px-[2rem]">
                    Experience {index + 1}{" "}
                  </summary>
                  <div className="w-full  py-[1.3rem] ">
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        value={experienceArray[index].title}
                        onChange={(e) => {
                          setExperienceArray((prevExperienceArray) => {
                            const newExperienceArray = [...prevExperienceArray];
                            newExperienceArray[index].title = e.target.value;
                            return newExperienceArray;
                          });
                          console.log(experienceArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Write the Title"
                        type="text"
                        id="title"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-center">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <input
                        value={experienceArray[index].company}
                        onChange={(e) => {
                          setExperienceArray((prevExperienceArray) => {
                            const newExperienceArray = [...prevExperienceArray];
                            newExperienceArray[index].company = e.target.value;
                            return newExperienceArray;
                          });
                          console.log(experienceArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="Name of the Company"
                        type="text"
                        id="company"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-start">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="year"
                      >
                        Year
                      </label>
                      <input
                        value={experienceArray[index].years}
                        onChange={(e) => {
                          setExperienceArray((prevExperienceArray) => {
                            const newExperienceArray = [...prevExperienceArray];
                            newExperienceArray[index].years = e.target.value;
                            return newExperienceArray;
                          });
                          console.log(experienceArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        placeholder="2015-2017"
                        type="text"
                        id="year"
                      />
                    </div>
                    <div className="grid grid-cols-[1fr,9fr] gap-[5rem]  bg-white mt-[2rem] items-start">
                      <label
                        className="font-semibold m-0 text-[1.4rem]"
                        htmlFor="year"
                      >
                        Description
                      </label>
                      <textarea
                        value={experienceArray[index].description}
                        onChange={(e) => {
                          setExperienceArray((prevExperienceArray) => {
                            const newExperienceArray = [...prevExperienceArray];
                            newExperienceArray[index].description =
                              e.target.value;
                            return newExperienceArray;
                          });
                          console.log(experienceArray);
                        }}
                        className="bg-gray-100  py-[1.3rem] px-[2rem] border rounded-lg focus:outline-primary  transition-all duration-300 focus:bg-white"
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </details>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                setExperienceNumber(experienceNumber + 1);
                const experienceObj = {
                  title: "",
                  company: "",
                  years: "",
                  description: "",
                  _id: "",
                };
                experienceArray[experienceNumber] = experienceObj;
                console.log(experienceArray);
              }}
              className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            >
              Add Experience
            </button>
          </div>

          <input
            className="py-[1rem] mt-[2rem]  px-[2rem] border bg-primary text-white font-bold transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-primary rounded-xl cursor-pointer"
            type="submit"
            value={"Save Resume"}
          />
        </form>
      </div>
    </main>
  );
}

export default CandidateResume;
