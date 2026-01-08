import Task from "../models/Task.js";
import Organization from "../models/Organization.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { organizationId, userId } = req.user;

  const org = await Organization.findById(organizationId);

  const taskCount = await Task.countDocuments({ organizationId });

  if (org.plan === "FREE" && taskCount >= org.taskLimit) {
    return res.status(403).json({
      message: "Task limit reached. Upgrade to Pro plan.",
    });
  }

  const task = await Task.create({
    title,
    description,
    organizationId,
    createdBy: userId,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const { organizationId } = req.user;

  const tasks = await Task.find({ organizationId });

  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const { organizationId } = req.user;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, organizationId },
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { organizationId } = req.user;

  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    organizationId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};
