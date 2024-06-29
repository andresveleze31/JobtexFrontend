import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthCandidate from "../../../hooks/useAuthCandidate";
function CandidatePassword() {
  const { authCandidate, tokenC } = useAuthCandidate();

  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if ([prevPassword, newPassword, repeatPassword].includes("")) {
      return toast.error("All Fields Required");
    }

    if (newPassword !== repeatPassword) {
      return toast.error("The passwords are different");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenC}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/validate-password/${
          authCandidate._id
        }/${prevPassword}`
      );
      console.log(data);
      if (data === false) {
        return toast.error("Previous Password Incorrect");
      }

      const change = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/change-password/${
          authCandidate._id
        }/${newPassword}`
      );
    } catch (error) {
      console.log(error);
    }
    return toast.success("The password has been modified.");
  }

  return (
    <main>
      <div className="mb-[5rem] ">
        <h2 className="font-bold text-[2.5rem] ">
          <span className="text-primary font-black pr-[1rem] ">|</span>Change
          Password
        </h2>

        <div className="bg-white p-[3rem]">
          <form onSubmit={handleSubmit}>
            <div className="">
              <label className="text-[1.4rem] block font-bold " htmlFor="">
                Old password
              </label>
              <div className="">
                <input
                  value={prevPassword}
                  onChange={(e) => {
                    setPrevPassword(e.target.value);
                  }}
                  className="mt-[1rem] p-[1rem] w-[50rem] border rounded-lg bg-gray-100 "
                  type="password"
                />
              </div>
            </div>
            <div className="mt-[2rem] ">
              <label className="text-[1.4rem] block font-bold " htmlFor="">
                New password
              </label>
              <div className="">
                <input
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="mt-[1rem] p-[1rem] w-[50rem] border rounded-lg bg-gray-100 "
                  type="password"
                />
              </div>
            </div>
            <div className="mt-[2rem] ">
              <label className="text-[1.4rem] block font-bold " htmlFor="">
                Retype password
              </label>
              <div className="">
                <input
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                  className="mt-[1rem] p-[1rem] w-[50rem] border rounded-lg bg-gray-100 "
                  type="password"
                />
              </div>
            </div>

            <input
              className="text-white mt-[2rem] font-semibold bg-primary py-[1rem] px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
              type="submit"
              value={"Change Password"}
            />
          </form>
        </div>
      </div>
    </main>
  );
}

export default CandidatePassword;
