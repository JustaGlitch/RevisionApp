const { Router } = require('express');

const studentController = require('../controllers/studentController');

const studentRouter = Router();

studentRouter.post('/register', studentController.register);
studentRouter.post('/login', studentController.login);
studentRouter.get('/profile', studentController.profile);
studentRouter.post('/poke', studentController.poke);
studentRouter.get('/', studentController.index);
studentRouter.get('/:student_id', studentController.show);
studentRouter.post('/', studentController.create);
studentRouter.patch('/:student_id', studentController.update);
studentRouter.delete('/:student_id', studentController.destroy);

module.exports = studentRouter;