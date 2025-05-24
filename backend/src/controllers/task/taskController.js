import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/taskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  // res.status(200).json({ message: "create task" });
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title || title.trim() === "") {
      res.status(400).json({ message: "Title is required!" });
      return;
    }
    if (!description || description.trim() === "") {
      res.status(400).json({ message: "description is required!" });
      return;
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    console.log("Error creating task: ", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found" });
    }

    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({
      "tasks Len": tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error fetching tasks: ", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    if (!id) {
      res.status(400).json({ message: "Task id not found" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "User not authorized!" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error fetching task: ", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Task Id not found!" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "User not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log("Error fetching tasks: ", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Task Id not found!" });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "USer not authorized" });
    }

    await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task: ", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
});
