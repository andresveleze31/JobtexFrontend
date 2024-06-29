import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useJobtex from "../hooks/useJobtex";

function ModalMessage({ setModalMessage }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const {infoMessage} = useJobtex();

  useEffect(() => {
    // Limpiar los campos cuando se abre el modal
    setSubject("");
    setMessage("");
  }, []);

  console.log(infoMessage);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(
        infoMessage.candidate_id,
        infoMessage.employer_id,
        subject,
        message
      );
      const mensaje = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/foreign/send-message`,
        {
          candidate_id: infoMessage.candidate_id,
          employer_id: infoMessage.employer_id,
          subject,
          message,
        }
      );
      console.log(mensaje);
    } catch (error) {
      console.log(error);
    }
    toast.success("Message Delivered");
    // Cerrar el modal después de enviar el mensaje
    setModalMessage(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="flex h-full justify-center items-center">
        <div className="bg-white p-[3rem] w-[60rem] rounded-2xl ">
          <div className="flex justify-between items-center">
            <h3 className="font-bold m-0">
              Send Message to {infoMessage.name}
            </h3>
            <button
              onClick={() => setModalMessage(false)}
              className="font-bold py-[1rem] px-[1.8rem] "
            >
              X
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-[3rem] ">
            <div>
              <label className="font-bold">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-100 py-[1rem] px-[2rem] border rounded-lg mt-[1rem] "
                placeholder="Enter Subject"
                type="text"
              />
            </div>
            <div className="mt-[1rem] ">
              <label className="font-bold">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-100 py-[1rem] px-[2rem] border rounded-lg mt-[1rem] "
                placeholder="Enter your Message"
                name=""
                id=""
                cols="30"
                rows="7"
              ></textarea>
            </div>

            <input
              className="text-center w-full py-[1rem] bg-primary mt-[2rem] cursor-pointer font-bold transition-all duration-300 hover:bg-opacity-85 rounded-xl text-white "
              type="submit"
              value={"Send Message"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalMessage;
