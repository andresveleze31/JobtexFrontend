import React from "react";
import NavBarAll from "../components/NavBarAll";
import SidebarEmployer from "../components/admin/employer/SidebarEmployer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MobileSidebarEmployer from "../components/admin/employer/MobileSidebarEmployer";


function EmployersLayout() {

  return (
    <div className="h-full">
      <NavBarAll />
      <div className="grid grid-cols-[1fr,5fr] xl:grid-cols-[1fr,6fr] md:grid-cols-1">
        <MobileSidebarEmployer />
        <Toaster duration={4000} position="bottom-center" />

        <div className="md:hidden">
          <SidebarEmployer />
        </div>
        <div className="bg-gray-100 h-[90vh] overflow-y-scroll px-[20rem] py-[2rem] md:px-[2rem]  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployersLayout;
