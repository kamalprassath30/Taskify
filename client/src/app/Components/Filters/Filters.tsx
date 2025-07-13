import { useTasks } from "@/context/taskContext";
import React from "react";

function Filters() {
  const { priority, setPriority } = useTasks();
  const priorities = ["All", "Low", "Medium", "High"];
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">
      <span
        className="absolute top-2 bottom-2 left-2 w-[calc(25%-0.5rem)] bg-[#EDEDED] rounded-md transition-transform duration-300 ease-[cubic-bezier(.95,.03,1,1)]"
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      ></span>
      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`relative px-1 z-10 font-medium text-sm ${
            activeIndex === index ? "text-[#3aafae]" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLocaleLowerCase());
          }}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}

export default Filters;
