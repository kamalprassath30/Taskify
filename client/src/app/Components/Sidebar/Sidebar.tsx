import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";

function Sidebar() {
  return (
    <div className="w-[20rem] h-full bg-[#f9f9f9] flex flex-col gap-4">
      <Profile />
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>
      <button className="mt-auto mx-6 px-8 py-4 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out">
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
