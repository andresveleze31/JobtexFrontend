import React from "react";
import NavBarAll from "../components/NavBarAll";
import SidebarEmployer from "../components/admin/employer/SidebarEmployer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function EmployersLayout() {

  return (
    <div className="h-full">
      <NavBarAll />
      <div className="grid grid-cols-[1fr,5fr] xl:grid-cols-[1fr,6fr]">
        <Toaster duration={4000} position="bottom-center" />

        <SidebarEmployer />
        <div className="bg-gray-100 h-[90vh] overflow-y-scroll px-[20rem] py-[2rem]  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployersLayout;
