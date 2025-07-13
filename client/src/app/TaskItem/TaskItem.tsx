import React from "react";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import { getPriority } from "os";
import { edit, star, trash } from "@/utils/Icons";
import { useTasks } from "@/context/taskContext";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  console.log("task item: ", task);
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <div className="h-[16rem] w-full max-w-[300px] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white">
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-4 text-gray-400  text-[1.2rem]">
            <button className={`${true ? "text-yellow-400" : "text-gray-400"}`}>
              {star}
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button className="text-[#F65314]">{trash}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
