const { Router } = require('express');

const tasksController = require('../controllers/tasksController');

const tasksRouter = Router();

tasksRouter.get('/', tasksController.index);
tasksRouter.get('/:task_id', tasksController.show);
tasksRouter.post('/', tasksController.create);
tasksRouter.patch('/:task_id', tasksController.update);
tasksRouter.delete('/:task_id', tasksController.destroy);

module.exports = tasksRouter;