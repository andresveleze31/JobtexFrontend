import React from "react";
import Education from "./Education";
import Experience from "./Experience";
import Video from "../Video";
import SectionComment from "../SectionComment";
import FormularioReview from "../FormularioReview";

function CandidateInformation({ candidate, educations, experiences, comments, setComments }) {
  return (
    <main>
      <div>
        <h3 className="font-bold">About Candidate</h3>
        {candidate.aboutme}
      </div>

      <div className="mt-[4rem] ">
        <h3 className="font-bold">Education</h3>
        {educations.length > 0 &&
          educations.map((edu) => {
            return <Education education={edu} />;
          })}
      </div>
      <div className="mt-[4rem] ">
        <h3 className="font-bold">Experience</h3>
        {experiences.length > 0 &&
          experiences.map((exp) => {
            return <Experience experience={exp} />;
          })}
      </div>
      <div className="mt-[4rem] ">
        <h3 className="font-bold">Video</h3>
        <Video url={candidate.video} />
      </div>
      <div className="mt-[4rem] ">
        <h3 className="font-bold">{comments.length} Comment(s)</h3>
        {comments.length > 0 && <SectionComment comments={comments} />}
        {candidate._id && (
          <FormularioReview
            setComments={setComments}
            comments={comments}
            candidate_id={candidate._id}
            type={"candidate"}
          />
        )}
      </div>
    </main>
  );
}

export default CandidateInformation;
