const { Router } = require('express');

const studySessionController = require('../controllers/studySessionController');

const studySessionRouter = Router();

studySessionRouter.post('/create', studySessionController.create);
// update admin by id using patch method
studySessionRouter.patch('/:study_session_id', studySessionController.update);
// delete admin by id using delete method
studySessionRouter.delete('/:study_session_id', studySessionController.destroy);
studySessionRouter.get('/index', studySessionController.index);
studySessionRouter.get('/:study_session_id', studySessionController.show);

module.exports = studySessionRouter;