import React, { useEffect, useState } from "react";
import useAuthEmployer from "../../../hooks/useAuthEmployer";
import axios from "axios";
import ApplicantCandidate from "../../../components/admin/employer/ApplicantCandidate";
import ModalMessage from "../../../components/ModalMessage";

function Applicants() {
  const { authEmployer, tokenE } = useAuthEmployer();

  const [applications, setApplications] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);

  useEffect(() => {
    async function getApplicantsJobs() {
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
          }/api/applications/get-applications-employer/${authEmployer._id}`,
          config
        );

        const appsArray = [];

        data.forEach((app) => {
          
          let found = false;

          for (let i = 0; i < appsArray.length; i++) {
            if (appsArray[i].job_id._id === app.job_id._id) {
              appsArray[i].candidates.push({
                candidate_id: app.candidate_id,
                state_id: app.state_id,
                date: app.createdAt,
                job_id: app.job_id._id,
              });
              found = true;
              break;
            }
          }

          if (!found) {
            appsArray.push({
              job_id: app.job_id,
              candidates: [
                {
                  candidate_id: app.candidate_id,
                  state_id: app.state_id,
                  date: app.createdAt,
                  job_id: app.job_id._id,
                },
              ],
            });
          }

        });
        console.log(appsArray);
        setApplications(appsArray);
      } catch (error) {
        console.log(error);
      }
    }
    getApplicantsJobs();
  }, []);

  return (
    <main className="mb-[5rem]">

      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>All
        Applicants
      </h2>

      <div className="bg-white p-[3rem]">
        {applications.map((app) => (
          <div
            className="border p-[2rem] rounded-xl mb-[2rem] "
            key={app.job_id._id}
          >
            <div className="flex justify-between items-center border-b">
              <h3 className="text-[2rem] font-bold ">{app.job_id.title}</h3>
              <div>
                <p className="bg-primary text-[1.4rem] rounded-t-xl text-white p-[1rem]">
                  Total(s): {app.candidates.length}{" "}
                </p>
              </div>
            </div>

            <div>
              {app.candidates.map((candidate) => {
                return <ApplicantCandidate candidate={candidate} modalMessage={modalMessage} setModalMessage={setModalMessage} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Applicants;
