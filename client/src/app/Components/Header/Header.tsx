"use client";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { name } = user;
  const userId = user._id;
  console.log("user: ", user);
  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}` : `Welcome to Taskify`}
        </h1>
        <p>
          {userId ? (
            <>
              You have <span className="font-bold text-[#3aafae]">5</span>{" "}
              active tasks
            </>
          ) : (
            "Please login or register to view you tasks!"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white tranition-all duration-200 ease-in-out">
          Create a new task
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          href="https://github.com/kamalprassath30?tab=repositories"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
        >
          {github}
        </Link>
        <Link
          href="https://github.com/kamalprassath30?tab=repositories"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
        >
          {moon}
        </Link>
        <Link
          href="https://github.com/kamalprassath30?tab=repositories"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
        >
          {profile}
        </Link>
      </div>
    </header>
  );
}

export default Header;
