import React, { useState } from "react";
import useJobtex from "../hooks/useJobtex";
import Error from "./Error";
import axios from "axios";
import useAuthCandidate from "../hooks/useAuthCandidate";
import useAuthEmployer from "../hooks/useAuthEmployer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ModalLogin() {
  const { setLogin, setRegister } = useJobtex();
  const { setAuthCandidate } = useAuthCandidate();
  const { setAuthEmployer } = useAuthEmployer();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();

  function handleOptionChange(e) {
    setSelected(e.target.value);
    console.log(selected);

    setTimeout(() => {
      console.log(selected);
    }, 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if ([email, password, selected].includes("")) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (selected === "candidate") {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/candidates/login`,
          {
            email,
            password,
          }
        );
        setAuthCandidate(data);
        localStorage.setItem("tokenCandidate", data.token);

        setTimeout(() => {
          navigate("/admin/candidate/profile");
        }, 5000);
        toast.success("You will be redirected");
      } catch (error) {
        console.log(error);
      }
    }

    if (selected === "employer") {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/employers/login`,
          {
            email,
            password,
          }
        );

        setAuthEmployer(data);
        localStorage.setItem("tokenEmployer", data.token);
        setTimeout(() => {
          navigate("/admin/employer/profile");
        }, 5000);
        toast.success("You will be redirected");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="flex h-full justify-center items-center">
        <div className="bg-white p-[3rem] rounded-2xl ">
          <div className="flex justify-between items-center">
            <h3 className="font-bold m-0">Login to Jobtex</h3>
            <button
              onClick={() => setLogin(false)}
              className="font-bold py-[1rem] px-[1.8rem] "
            >
              X
            </button>
          </div>
          <div className="bg-sky-200 mt-[2rem] w-[40rem] px-[2rem] py-[1rem] rounded-xl ">
            <p className="text-[1.4rem] text-customGray">
              Username: <span className="text-sky-600">candidate</span> or{" "}
              <span className="text-sky-600">employer</span>
            </p>
            <p className="text-[1.4rem] text-customGray">
              Password: <span className="text-sky-600">demo</span>{" "}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-[3rem] ">
            <div className="grid grid-cols-2 gap-[2rem] mb-[2rem] font-bold">
              <label
                className={
                  selected === "candidate"
                    ? "py-[1rem] bg-green-100 text-center rounded-xl cursor-pointer text-primary"
                    : "py-[1rem] bg-gray-100 text-center rounded-xl cursor-pointer "
                }
              >
                <input
                  type="radio"
                  onChange={handleOptionChange}
                  name="option"
                  value={"candidate"}
                  hidden
                />
                Candidate
              </label>
              <label
                className={
                  selected === "employer"
                    ? "py-[1rem] bg-green-100 text-center rounded-xl cursor-pointer text-primary"
                    : "py-[1rem] bg-gray-100 text-center rounded-xl cursor-pointer "
                }
              >
                <input
                  onChange={handleOptionChange}
                  type="radio"
                  name="option"
                  value={"employer"}
                  hidden
                />
                Employer{" "}
              </label>
            </div>
            <div>
              <label className="font-bold">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 py-[1rem] px-[2rem] border rounded-lg mt-[1rem] "
                placeholder="Enter your email"
                type="text"
              />
            </div>
            <div className="mt-[1rem] ">
              <label className="font-bold">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 py-[1rem] px-[2rem] border rounded-lg mt-[1rem] "
                placeholder="Enter your password"
                type="password"
              />
            </div>

            <input
              className="text-center w-full py-[1rem] bg-primary mt-[2rem] cursor-pointer font-bold transition-all duration-300 hover:bg-opacity-85 rounded-xl text-white "
              type="submit"
              value={"Login"}
            />

            {error && <Error mensaje={error} />}
          </form>
          <p className="text-center mt-[1rem] text-customGray text-[1.6rem] ">
            Don't you have an account?{" "}
            <button
              onClick={() => {
                setLogin(false);
                setRegister(true);
              }}
              className="text-primary hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
