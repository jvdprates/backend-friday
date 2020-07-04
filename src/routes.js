const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');
const { generateId } = require('./middlewares/uuid');

const BarController = require('./controllers/BarController');
const validateBar = require('./validators/BarValidator');

const UserController = require('./controllers/UserController');
const validateUser = require('./validators/UserValidator');

const CategoryController = require('./controllers/CategoryController');
const validateCategory = require('./validators/CategoryValidator');

//User
routes.post('/user', generateId, celebrate(validateUser.create), UserController.create);
routes.get('/user/:id', celebrate(validateUser.readOne), UserController.readOne);
routes.put('/user/:id', celebrate(validateUser.update), UserController.update);
routes.delete('/user/:id', celebrate(validateUser.delete), UserController.delete);

//Bar
routes.post('/bar', generateId, celebrate(validateBar.create), BarController.create);
routes.get('/bar', BarController.getAll);
routes.get('/bar/:id', celebrate(validateBar.getOne), BarController.getOne);
routes.put('/bar/:id', celebrate(validateBar.update), BarController.update);
routes.delete('/bar/:id', celebrate(validateBar.delete), BarController.delete);

//Category
routes.post('/category', generateId, celebrate(validateCategory.create), CategoryController.create);
routes.get('/category', CategoryController.index);
routes.get('/categories', CategoryController.getAll);
routes.get('/category/:id', celebrate(validateCategory.getOne), CategoryController.getOne);
routes.put('/category/:id', celebrate(validateCategory.categorize), CategoryController.categorise);
routes.delete('/category/:id', celebrate(validateCategory.delete), CategoryController.delete);

module.exports = routes;