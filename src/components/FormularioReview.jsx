import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthEmployer from "../hooks/useAuthEmployer";
import axios from "axios";
import useAuthCandidate from "../hooks/useAuthCandidate";
function FormularioReview({ setComments, comments, candidate_id, employer_id, type }) {
  const [rating, setRating] = useState(null);
  const [commentData, setCommentData] = useState("");
  const [hover, setHover] = useState(null);
  const [candidateId, setCandidateId] = useState("");
  const [employerId, setEmployerId] = useState("");



  const { authEmployer } = useAuthEmployer();
  const {authCandidate} = useAuthCandidate();

    useEffect(() => {
      if (type === "candidate") {
        setEmployerId(authEmployer._id);
        setCandidateId(candidate_id);
      }

      if (type === "employer") {
        setEmployerId(employer_id);
        setCandidateId(authCandidate._id);
      }
    }, [] );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authEmployer._id) {
      return toast.error("Create an Employer Account");
    }

    if (rating === null || comment === "") {
      return toast.error("All Fields Required");
    }

    try {
      const comment = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/candidates/create-comment`,
        {
          rating,
          comment: commentData,
          candidate_id: candidateId,
          employer_id: employerId,
          type,
        }
      );
    } catch (error) {
      console.log(error)
    }

    return toast.success("Comment Added, Reload Page to See Comment");
  }

  return (
    <div className="p-[4rem] mt-[4rem] border rounded-xl ">
      <h3 className="font-bold">Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="text-[1.4rem] mr-[2rem] " htmlFor="">
            Your Rating
          </label>
          <>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label className="cursor-pointer">
                  <input
                    className="hidden"
                    onClick={() => setRating(currentRating)}
                    type="radio"
                    value={currentRating}
                  />
                  <FaStar
                    color={
                      currentRating <= (hover || rating) ? "yellow" : "#e5e5e5"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    key={index}
                    size={35}
                  />
                </label>
              );
            })}
          </>
        </div>
        <div className="mt-[2rem] flex flex-col ">
          <label
            className="text-[1.4rem] mb-[1rem]  mr-[2rem] "
            htmlFor="comment"
          >
            Your Comment
          </label>
          <textarea
          value={commentData}
            onChange={(e) => {
              setCommentData(e.target.value);
            }}
            className="bg-slate-100 border p-[2rem] "
            placeholder="Comment"
            id="comment"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <input
          className="text-white mt-[2rem] font-semibold bg-primary py-[1rem]  px-[3rem] rounded-lg cursor-pointer hover:bg-white hover:text-primary border border-primary transition-all duration-300 "
          type="submit"
          value={"Send Review"}
        />
      </form>
    </div>
  );
}

export default FormularioReview;
