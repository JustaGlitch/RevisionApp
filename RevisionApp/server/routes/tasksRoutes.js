const { Router } = require('express');

const tasksController = require('../controllers/tasksController');

const tasksRouter = Router();

tasksRouter.get('/:student_id', tasksController.index);
tasksRouter.get('/:student_id/:task_id', tasksController.show);
tasksRouter.post('/', tasksController.create);
tasksRouter.patch('/:task_id', tasksController.update);
tasksRouter.delete('/:task_id', tasksController.destroy);

module.exports = tasksRouter;