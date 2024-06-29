import React from 'react'

function Education({education}) {
  return (
    <div className="pl-[3.5rem] border-l mt-[3rem] ">
      <p className="text-[1.4rem]">
        <span className="font-bold pr-[1.5rem] ">
          {Object.keys(education).length > 0 && education.title}
        </span>
        {Object.keys(education).length > 0 && education.years}{" "}
      </p>
      <h4 className="font-bold text-[1.6rem] mt-[1rem] ">
        {Object.keys(education).length > 0 && education.academy}
      </h4>
      <p className="mt-[1rem] text-[1.6rem] text-customGray">
        {Object.keys(education).length > 0 && education.description}
      </p>
    </div>
  );
}

export default Education
