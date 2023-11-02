const { Router } = require('express');

const classController = require('../controllers/classController');

const classRouter = Router();

classRouter.get('/', classController.index);
classRouter.get('/:class_id', classController.show);
classRouter.post('/', classController.create);
classRouter.patch('/:class_id', classController.update);
classRouter.delete('/:class_id', classController.destroy);
classRouter.get('/classname/:classname', classController.showByName);

module.exports = classRouter;
