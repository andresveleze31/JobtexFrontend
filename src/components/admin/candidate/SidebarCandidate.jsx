import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

function SidebarCandidate() {
  return (
    <aside className="flex h-[calc(100vh-90px)] items-start flex-col gap-[1rem] px-[1.5rem] py-[3rem]   ">
      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"profile"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_profile.png"
          alt="Icon Profile"
        />
        Profile
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"resume"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_resume.png"
          alt="Icon jobs"
        />
        My Resume
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"my-applied"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_forms.png"
          alt="Icon Forms"
        />
        My Applied
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"favorites"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_favorites.png"
          alt="Icon Forms"
        />
        Favorites
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"messages"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_message.png"
          alt="Icon Forms"
        />
        Messages
      </Link>

      <Link
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"change-password"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_password.png"
          alt="Icon Forms"
        />
        Change Password
      </Link>

      <Link
        onClick={() => {
          localStorage.removeItem("tokenCandidate");
          toast.success("You Logout");
        }}
        className="flex w-full py-[1rem] px-[2rem]  hover:bg-gray-100 text-[1.4rem] transition-all duration-300 font-semibold items-center gap-[1rem] rounded-xl "
        to={"/"}
      >
        <img
          className="w-[2rem] h-[2rem] "
          src="../../public/admin/icon_logout.png"
          alt="Icon Forms"
        />
        Logout
      </Link>
    </aside>
  );
}

export default SidebarCandidate
