const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');
const CheckController = require('./controllers/CheckController');
const MenuController = require('./controllers/MenuController');
const OrderController = require('./controllers/OrderController');
const BarController = require('./controllers/BarController');
const validateBar = require('./validators/BarValidator');
const RatingController = require('./controllers/RatingController');
const UserController = require('./controllers/UserController');
const validateUser = require('./validators/UserValidator');

//User
routes.post('/user', celebrate(validateUser.create), UserController.create);
routes.get('/user/:id', celebrate(validateUser.readOne), UserController.readOne);
routes.put('/user/:id', celebrate(validateUser.update), UserController.update);
routes.delete('/user/:id', celebrate(validateUser.delete), UserController.delete);

//Bar
routes.post('/bar', celebrate(validateBar.create), BarController.create);
routes.get('/bar/:id', celebrate(validateBar.readOne), BarController.readOne);
routes.put('/bar/:id', celebrate(validateBar.update), BarController.update);
routes.delete('/bar/:id', celebrate(validateBar.delete), BarController.delete);

module.exports = routes;