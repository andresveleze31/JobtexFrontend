import React from 'react'

function Experience({experience}) {
  return (
    <div className="pl-[3.5rem] border-l mt-[3rem] ">
      <p className="text-[1.4rem]">
        <span className="font-bold pr-[1.5rem] ">
          {Object.keys(experience).length > 0 && experience.title}
        </span>
        {Object.keys(experience).length > 0 && experience.years}
      </p>
      <h4 className="font-bold text-[1.6rem] mt-[1rem] ">
        {" "}
        {Object.keys(experience).length > 0 && experience.company}
      </h4>
      <p className="mt-[1rem] text-[1.6rem] text-customGray">
        {Object.keys(experience).length > 0 && experience.description}
      </p>
    </div>
  );
}

export default Experience
