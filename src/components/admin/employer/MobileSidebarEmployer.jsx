import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import {
  Briefcase,
  FileInput,
  FileText,
  Heart,
  Lock,
  LogOut,
  MessageCircle,
  User2,
  Menu
} from "lucide-react";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const MobileSidebarEmployer = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };
  return (
    <div className="hidden md:flex p-[2rem] bg-slate-100 ">
      <Box sx={{ display: "flex" }}>
        <Button
          variant="outlined"
          color="neutral"
          className="flex gap-[2rem] "
          onClick={toggleDrawer(true)}
        >
          <Menu />
          <p>Employer Menu</p>
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className="flex flex-col gap-[2rem] mt-[4rem] ">
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
          </div>
        </Drawer>
      </Box>
    </div>
  );
};

export default MobileSidebarEmployer;
