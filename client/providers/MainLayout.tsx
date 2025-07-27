"use client";
import { useTasks } from "@/context/taskContext";
import Modal from "@/src/app/Components/Modal/Modal";
import ProfileModal from "@/src/app/Components/Profile/ProfileModal";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isEditing, profileModal } = useTasks();
  return (
    <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white dark:border-[#F9F9F9]/10 rounded-[1.5rem]">
      {isEditing && <Modal />}
      {profileModal && <ProfileModal />}
      {children}
    </div>
  );
}

export default MainLayout;
