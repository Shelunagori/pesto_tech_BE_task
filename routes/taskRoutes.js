const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validationMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const clsMiddleware = require("../middlewares/cls_hooked");
const logger = require("../utils/logger");

// GET all tasks
router.get("/", jwtMiddleware, clsMiddleware, async (req, res) => {
  logger.info(`traceId: ${req.traceID}, apiName: "GET ALL TASK",`);
  await taskController.getAllTasks(req, res);
});

// POST a new task with validation middleware
router.post('/', jwtMiddleware, validateTask, async (req, res) => {
  await taskController.createTask(req, res);
});

// PUT (update) a task with validation middleware
router.put('/:id', jwtMiddleware, validateTask, async (req, res) => {
  await taskController.updateTask(req, res);
});

// DELETE a task
router.delete('/:id', jwtMiddleware, async (req, res) => {
  await taskController.deleteTask(req, res);
});

module.exports = router;
