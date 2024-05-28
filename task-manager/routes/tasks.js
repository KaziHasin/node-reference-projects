const express = require("express");
const router = express.Router();
const {
  allTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// router.get('/',allTasks);
// router.post('/',createTask);
// router.get('/:id',getTask);
// router.patch('/:id',updateTask);
// router.delete('/:id',deleteTask);

router.route("/").get(allTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
