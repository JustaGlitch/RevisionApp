const { Router } = require('express');

const AdminController = require('../controllers/adminController');

const adminRouter = Router();

adminRouter.post('/register', AdminController.register);
adminRouter.post('/login', AdminController.login);
adminRouter.get('/profile', AdminController.profile);
adminRouter.get('/index', AdminController.index);
adminRouter.get('/:admin_id', AdminController.show);
adminRouter.post('/', AdminController.create);
adminRouter.patch('/:admin_id', AdminController.update);
adminRouter.delete('/:admin_id', AdminController.destroy);

module.exports = adminRouter;