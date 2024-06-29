import React, { useEffect, useState } from "react";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
import axios from "axios";
import MessageEmployer from "../../../components/admin/candidate/MessageEmployer";
function CandidateMessages() {
  const [messages, setMessages] = useState([]);
  const { authCandidate, tokenC } = useAuthCandidate();

  const [modalMessage, setModalMessage] = useState(false);

  useEffect(() => {
    async function getMessages() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenC}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/candidates/get-messages/${
            authCandidate._id
          }`,
          config
        );
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, []);

  return (
    <main className="mb-[5rem] ">
      <h2 className="font-bold text-[2.5rem] ">
        <span className="text-primary font-black pr-[1rem] ">|</span>Messages
      </h2>

      <div className="bg-white p-[3rem]">
        <div className="grid grid-cols-[3fr,1fr,2fr,2fr,1fr] border-b pb-[2rem]  ">
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Company
          </span>
          <span className="text-[1.4rem]  font-bold uppercase text-customGray ">
            Message Date
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Subject
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Message
          </span>
          <span className="text-[1.4rem] font-bold uppercase text-customGray ">
            Actions
          </span>
        </div>

        <div>
          {messages.map((message) => {
            return (
              <MessageEmployer
                message={message}
                setModalMessage={setModalMessage}
                modalMessage={modalMessage}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default CandidateMessages;
