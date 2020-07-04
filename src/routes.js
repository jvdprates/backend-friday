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

const EventController = require('./controllers/EventController');
const validateEvent = require('./validators/EventValidator');

const CommentController = require('./controllers/CommentController');
const validateComment = require('./validators/CommentValidator');

//User
routes.post('/user', generateId, celebrate(validateUser.create), UserController.create);
routes.get('/user/:id', celebrate(validateUser.getOne), UserController.getOne);
routes.put('/user/:id', celebrate(validateUser.update), UserController.update);
routes.delete('/user/:id', celebrate(validateUser.delete), UserController.delete);

//card
routes.post('/card/:user_id', generateId, celebrate(validateUser.newCard), UserController.newCard);
routes.delete('/card/:id', celebrate(validateUser.deleteCard), UserController.deleteCard)

//Bar
routes.post('/bar', generateId, celebrate(validateBar.create), BarController.create);
routes.get('/bar', BarController.getAll);
routes.get('/bar/:id', celebrate(validateBar.getOne), BarController.getOne);
routes.put('/bar/:id', celebrate(validateBar.update), BarController.update);
routes.delete('/bar/:id', celebrate(validateBar.delete), BarController.delete);

//Event
routes.post('/event', celebrate(validateEvent.create), EventController.create);
routes.get('/event', EventController.getAll);
routes.get('/event/:id', celebrate(validateEvent.getOne), EventController.getOne);
routes.put('/event/:id', celebrate(validateEvent.update), EventController.update);
routes.delete('/event/:id', celebrate(validateEvent.delete), EventController.delete);

//Comment
routes.post('/comment', celebrate(validateComment.create), CommentController.create);
routes.get('/comment', CommentController.index);
routes.put('/comment/:id', celebrate(validateComment.update), CommentController.update);
routes.delete('/comment/:id', celebrate(validateComment.delete), CommentController.delete);

//Category
routes.post('/category', generateId, celebrate(validateCategory.create), CategoryController.create);
routes.get('/category', CategoryController.index);
routes.get('/categories', CategoryController.getAll);
routes.get('/category/:id', celebrate(validateCategory.getOne), CategoryController.getOne);
routes.put('/category/:id', celebrate(validateCategory.categorize), CategoryController.categorise);
routes.delete('/category/:id', celebrate(validateCategory.delete), CategoryController.delete);

module.exports = routes;