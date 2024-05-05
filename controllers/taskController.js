// controllers/taskController.js

const taskService = require('../services/taskService');
const HTTP_STATUS = require('../utils/httpStatus');

class TaskController {
  async getAllTasks(req, res) {
    try {
      console.log("req.traceID from controller", req.traceID)
      const { page, limit, status } = req.query;
      const parsedPage = parseInt(page) || 1; 
      const parsedLimit = parseInt(limit) || 10;
      const whereClause = {};
      if(status) {
        whereClause.status = status;
      }
      if(!req.user.isAdmin) {
        whereClause.createdBy = req.user.id;
      }

      const tasksData = await taskService.getAllTasks(parsedPage, parsedLimit, whereClause);
      const { tasks, totalCount } = tasksData;
      const totalPages = Math.ceil(totalCount / parsedLimit);
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        data: tasks,
        pagination: {
          total: totalCount,
          totalPages,
          currentPage: parsedPage,
          limit: parsedLimit
        }
      });
    } catch (err) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: err.message,
        traceID: req.traceID,
      });
    }
  }

  async createTask(req, res) {
    try {
      const data = req.body;
      data.createdBy = req.user.id;
      data.updatedBy = req.user.id;
      const newTask = await taskService.createTask(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        status: 'success',
        data: newTask
      });
    } catch (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        status: 'error',
        message: err.message 
      });
    }
  }

  async updateTask(req, res) {
    try {
      const data = req.body;
      data.updatedBy = req.user.id;
      const updatedTask = await taskService.updateTask(req.params.id, data);
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        data: updatedTask
      });
    } catch (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        status: 'error',
        message: err.message 
      });
    }
  }

  async deleteTask(req, res) {
    try {
      await taskService.deleteTask(req.params.id);
      res.status(HTTP_STATUS.OK).json({
        status: 'success',
        message: 'Task deleted'
      });
    } catch (err) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
        status: 'error',
        message: err.message 
      });
    }
  }
}

module.exports = new TaskController();
