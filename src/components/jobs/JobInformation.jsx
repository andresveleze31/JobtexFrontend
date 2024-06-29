import React from "react";
import Video from "../Video";

function JobInformation({job}) {
  return (
    <div className="mt-[4rem]">
      <h3 className="font-bold">Job Description</h3>
      <div dangerouslySetInnerHTML={{__html: job.description}} className="mb-[4rem] ">
        
      </div>
      <div>
        <h3 className="font-bold">Video</h3>
        <Video url={job.video} />
      </div>
    </div>
  );
}

export default JobInformation;
