import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";

import { Bell, Cone, File, Home, LayoutDashboard, Menu, User, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import useJobtex from "../hooks/useJobtex";
import useAuthCandidate from "../hooks/useAuthCandidate";
import useAuthEmployer from "../hooks/useAuthEmployer";

const MobileNav = () => {
  const { setLogin } = useJobtex();
  const { authCandidate } = useAuthCandidate();
  const { authEmployer } = useAuthEmployer();

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
    <div className="hidden md:flex">
      <Box sx={{ display: "flex" }}>
        <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
          <Menu />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <nav className="flex flex-col text-[1.5rem] font-sans font-semibold gap-[2rem] p-[2rem] ">
            <Link
              to={"/"}
              className=" hover:underline transition-all flex gap-[1rem] items-center duration-300 ease-in-out"
            >
              <Home className="w-[2rem] " />
              Home
            </Link>
            <hr />
            <Link
              to={"/jobs"}
              className=" hover:underline flex gap-[1rem] items-center transition-all duration-300 ease-in-out"
            >
              <Wallet className="w-[2rem] " />
              Find Jobs
            </Link>
            <hr />
            <Link
              to={"/employers"}
              className=" hover:underline flex gap-[1rem] items-center transition-all duration-300 ease-in-out"
            >
              <File className="w-[2rem] " />
              Employers
            </Link>
            <hr />
            <Link
              to={"/candidates"}
              className=" hover:underline flex gap-[1rem] items-center transition-all duration-300 ease-in-out"
            >
              <Cone className="w-[2rem] " />
              Candidates
            </Link>
            <hr />
          </nav>

          <div className="flex flex-col gap-[2rem] font-sans text-[1.5rem] ">
            {authCandidate._id && (
              <div className="flex flex-col gap-[2rem] px-[2rem]">
                <Link
                  to={"/admin/candidate/profile"}
                  className="font-semibold flex gap-[1rem] items-center  text-primary text-[1.5rem]"
                >
                  <LayoutDashboard className="w-[2rem] " />
                  Go to Admin DashBoard
                </Link>

                <hr />

                <Link
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("tokenCandidate");
                    toast.success("You Logout");
                  }}
                  className="font-semibold border bg-primary text-[1.5rem] text-white border-primary py-[1rem] px-[4rem] hover:bg-white transition-all duration-300 rounded-lg hover:text-primary"
                >
                  Logout
                </Link>
              </div>
            )}

            {authEmployer._id && (
              <div className="flex flex-col gap-[2rem] text-[1.5rem] px-[2rem] font-sans  ">
                <Link
                  to={"/admin/employer/profile"}
                  className="font-semibold flex gap-[1rem] items-center text-primary "
                >
                  <LayoutDashboard className="w-[2rem] " />
                  Go to Admin DashBoard
                </Link>
                <hr />
                <Link
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("tokenEmployer");
                    toast.success("You Logout");
                  }}
                  className="font-semibold border bg-primary text-white border-primary py-[1rem] px-[4rem] hover:bg-white transition-all duration-300 rounded-lg hover:text-primary"
                >
                  Logout
                </Link>
              </div>
            )}
            <div className="flex gap-[2rem] items-center  ">
              {!authCandidate._id && !authEmployer._id && (
                <div className="flex flex-col  px-[2rem] gap-[2rem] mr-[3rem] w-full items-center ">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setLogin(true);
                    }}
                    className="flex gap-[1rem] w-full font-sans font-semibold bg-primary text-white px-[2rem] py-[1rem] rounded-lg text-[1.5rem] "
                  >
                    Login / Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </Box>
    </div>
  );
};

export default MobileNav;
