import React, { useState } from "react";
import useAuthCandidate from "../../hooks/useAuthCandidate";
import toast from "react-hot-toast";
import axios from "axios";

function ContactFormEmployer({ employer_id }) {

  const {authCandidate} = useAuthCandidate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

    if(!authCandidate._id){
      return toast.error("Create Candidate Account");
    }

    if([subject, message].includes("")){
      return toast.error("All Fields Required")
    }

    try {
      const mensaje = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/foreign/send-message`,
        {
          candidate_id: authCandidate._id,
          employer_id: employer_id,
          subject,
          message,
        }
      );
    } catch (error) {
      console.log(error.message);

      
    }
    return toast.success("Message Delivered");



  }

  return (
    <div>
      <div className="py-[2.5rem] border border-opacity-40 px-[3rem] bg-slate-100 rounded-2xl">
        <h3 className="font-bold">Contact Employer</h3>

        <form onSubmit={handleSubmit}>
          <div className="my-[2rem] ">
            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="bg-white p-[1.2rem] w-full rounded-xl border "
              type="text"
              placeholder="Subject"
            />
          </div>
          <div className="my-[2rem] ">
            <input
              className="bg-white p-[1.2rem] w-full rounded-xl border "
              type="email"
              placeholder="candidate@apus.com"
            />
          </div>
          <div className="my-[2rem] ">
            <input
              className="bg-white p-[1.2rem] w-full rounded-xl border "
              type="number"
              placeholder="(+88)123-456-789"
            />
          </div>
          <div className="mt-[2rem] ">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="bg-white p-[1.2rem] w-full rounded-xl border "
              placeholder="Message"
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <input
            className="text-white mt-[2rem] font-semibold bg-primary py-[1rem] w-full px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
            type="submit"
            value={"Send Message"}
          />
        </form>
      </div>
    </div>
  );
}

export default ContactFormEmployer;
