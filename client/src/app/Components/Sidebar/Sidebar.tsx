import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";

function Sidebar() {
  return (
    <div className="w-[20rem] h-full bg-[#f9f9f9] flex flex-col">
      <Profile />
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>
    </div>
  );
}

export default Sidebar;
