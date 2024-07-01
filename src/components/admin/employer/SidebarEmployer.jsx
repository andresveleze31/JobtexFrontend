import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Briefcase, FileInput, FileText, Heart, Lock, LogOut, MessageCircle, User2 } from "lucide-react";

function SidebarEmployer() {

  return (
    <aside className="flex h-[calc(100vh-90px)] items-start flex-col gap-[2rem] px-[1.5rem] py-[3rem]  ">
      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"profile"}
      >
        <User2 />
        Profile
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"jobs"}
      >
        <Briefcase />
        Jobs
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"create-job"}
      >
        <FileInput />
        Submit Job
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"job-applicants"}
      >
        <FileText />
        Job Applicants
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"favorites"}
      >
        <Heart />
        Favorites
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"messages"}
      >
        <MessageCircle />
        Messages
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"change-password"}
      >
        <Lock />
        Change Password
      </Link>

      <Link
        onClick={() => {
          localStorage.removeItem("tokenEmployer");
          toast.success("You Logout");
        }}
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.6rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"/"}
      >
        <LogOut />
        Logout
      </Link>
    </aside>
  );
}

export default SidebarEmployer;
