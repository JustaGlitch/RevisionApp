const { Router } = require('express');

const studySessionController = require('../controllers/studySessionController');

const studySessionRouter = Router();

studySessionRouter.get('/', studySessionController.index);
studySessionRouter.get('/:session_id', studySessionController.show);
studySessionRouter.post('/', studySessionController.create);
studySessionRouter.patch('/:session_id', studySessionController.update);
studySessionRouter.delete('/:session_id', studySessionController.destroy);

module.exports = studySessionRouter;