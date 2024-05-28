const Task = require("../models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

/**
 * Getting the all tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Json}.
 */
const allTasks = asyncWrapper(async (req, res) => {
  const perPage = 6;
  const page = 1;
  const skip = Math.max(0, req.query.page) * perPage;
  const countTask = await Task.countDocuments();
  const totalPage = Math.ceil(countTask / perPage);
  const tasks = await Task.find({}).skip(skip).limit(perPage);
  res.status(200).json({ tasks, totalPage });
});

/**
 * Create a new task.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Json}.
 */
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

/**
 * To get a task form the tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {String} _id
 * @returns {Json}.
 */
const getTask = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id;
  const task = await Task.findOne({ _id });
  if (!task) {
    return next(createCustomError(`no record found with this ${_id}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`no record found with this ${_id}`, 404));
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return next(createCustomError(`no record found with this ${_id}`, 404));
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
module.exports = { allTasks, createTask, getTask, updateTask, deleteTask };
