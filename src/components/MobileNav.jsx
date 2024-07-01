import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";

import { Bell, Menu, User } from "lucide-react";
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
          <nav className="flex flex-col text-[2rem] uppercase font-semibold gap-[2rem] p-[2rem] ">
            <Link
              to={"/"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
            <hr />
            <Link
              to={"/jobs"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Find Jobs
            </Link>
            <hr />
            <Link
              to={"/employers"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Employers
            </Link>
            <hr />
            <Link
              to={"/candidates"}
              className=" hover:underline transition-all duration-300 ease-in-out"
            >
              Candidates
            </Link>
            <hr />
          </nav>

          <div className="flex flex-col gap-[2rem] text-[2rem] ">
            {authCandidate._id && (
              <div className="flex flex-col gap-[2rem] px-[2rem] uppercase  ">
                <Link
                  to={"/admin/candidate/profile"}
                  className="font-semibold text-primary"
                >
                  Go to Admin DashBoard
                </Link>

                <hr />

                <Link
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("tokenCandidate");
                    toast.success("You Logout");
                  }}
                  className="font-semibold border bg-primary text-white border-primary py-[1rem] px-[4rem] hover:bg-white transition-all duration-300 rounded-lg hover:text-primary"
                >
                  Logout
                </Link>
              </div>
            )}

            {authEmployer._id && (
              <div className="flex flex-col gap-[2rem] text-[2rem] px-[2rem] uppercase ">
                <Link
                  to={"/admin/employer/profile"}
                  className="font-semibold text-primary "
                >
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
            <div className="flex gap-[2rem] items-center ">
              {!authCandidate._id && !authEmployer._id && (
                <div className="flex flex-col mt-[1rem] px-[2rem] gap-[2rem] mr-[3rem] items-center ">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setLogin(true);
                    }}
                    className="flex gap-[1rem]  uppercase font-semibold bg-primary text-white px-[2rem] py-[1rem] rounded-lg text-[2rem] "
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
