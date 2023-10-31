const { Router } = require('express');

const studentsController = require('../controllers/studentsController');

const studentsRouter = Router();

studentsRouter.get('/', studentsController.index);
studentsRouter.get('/:student_id', studentsController.show);
studentsRouter.post('/', studentsController.create);
studentsRouter.patch('/:student_id', studentsController.update);
studentsRouter.delete('/:student_id', studentsController.destroy);

module.exports = studentsRouter;