import React, { createContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

const TasksContext = createContext();
// const serverUrl = "http://localhost:8000/api/v1";
const serverUrl = "https://taskify-jiuu.onrender.com/api/v1";

export const TasksProvider = ({ children }) => {
  const userId = useUserContext().user._id;
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };
  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
    // setTask({});
  };
  const openProfileModal = () => {
    setProfileModal(true);
  };
  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  // get tasks from server
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks: ", error);
    }
    setLoading(false);
  };

  // get task by id
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`, {
        withCredentials: true,
      });
      setTask(response.data);
    } catch (error) {
      console.log("Error getting task: ", error);
    }
    setLoading(false);
  };

  // create task
  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task, {
        withCredentials: true,
      });
      setTasks([...tasks, res.data]);
      toast.success("Task created successfully!");
      getTasks();
    } catch (error) {
      console.log("Error creating task: ", error);
    }
  };

  // update
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task, {
        withCredentials: true,
      });

      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });
      toast.success("Task updated successfully!");
      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task: ", error);
    }
  };

  // delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`, {
        withCredentials: true,
      });
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task: ", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  //get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  //get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    getTasks();
    getTask();
  }, [userId]);
  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        completedTasks,
        activeTasks,
        profileModal,
        openProfileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
