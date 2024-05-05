// services/taskService.js
const Task = require('../models/Task');
class TaskService {
  async getAllTasks(page = 1, limit = 10, query = {}) {
    const tasks = await Task.find(query)
      .populate({
        path: "createdBy",
        select: "username  -_id",
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCount = await Task.countDocuments(query);

    return {
      tasks,
      totalCount,
    };
  }

  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async updateTask(id, updatedTaskData) {
    return await Task.findByIdAndUpdate(id, updatedTaskData, { new: true });
  }

  async deleteTask(id) {
    return await Task.findByIdAndRemove(id);
  }
}

module.exports = new TaskService();
