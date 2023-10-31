const { Router } = require('express');

const classController = require('../controllers/classController');

const classRouter = Router();

classRouter.post('/create', classController.createClass);
classRouter.get('/get', classController.getClass);
// update admin by id using patch method
classRouter.patch('/:class_id', classController.updateClass);
// delete admin by id using delete method
classRouter.delete('/:class_id', classController.destroyClass);
classRouter.get('/index', classController.index);
classRouter.get('/:class_id', classController.show);

module.exports = classRouter;