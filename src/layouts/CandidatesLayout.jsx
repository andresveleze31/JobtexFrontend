import React from 'react'
import NavBarAll from '../components/NavBarAll'
import SidebarCandidate from '../components/admin/candidate/SidebarCandidate'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import MobileSidebarCandidate from '../components/admin/candidate/MobileSidebarCandidate';

function CandidatesLayout() {
  return (
    <div className="h-full">
      <NavBarAll />

      <div className="grid grid-cols-[1fr,5fr] xl:grid-cols-[1fr,6fr] md:grid-cols-1 ">
        <MobileSidebarCandidate />
        <Toaster duration={4000} position="bottom-center" />
        <div className="md:hidden">
          <SidebarCandidate />
        </div>
        <div className="bg-gray-100 h-[90vh] overflow-y-scroll px-[20rem] py-[2rem] md:px-[2rem]  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CandidatesLayout
