const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');
const { generateId } = require('./middlewares/uuid');
const { authenticateToken, isBar, isUser } = require('./middlewares/authentication');

const BarController = require('./controllers/BarController');
const validateBar = require('./validators/BarValidator');

const UserController = require('./controllers/UserController');
const validateUser = require('./validators/UserValidator');

const CategoryController = require('./controllers/CategoryController');
const validateCategory = require('./validators/CategoryValidator');

const ProductController = require('./controllers/ProductController');
const validadeProduct = require('./validators/ProductValidator');

//User
routes.post('/user', generateId, celebrate(validateUser.create), UserController.create);
routes.get('/user/:id', celebrate(validateUser.readOne), UserController.readOne);
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

//Category
routes.post('/category', generateId, celebrate(validateCategory.create), CategoryController.create);
routes.get('/category', CategoryController.index);
routes.get('/categories', CategoryController.getAll);
routes.get('/category/:id', celebrate(validateCategory.getOne), CategoryController.getOne);
routes.put('/category/:id', celebrate(validateCategory.categorize), CategoryController.categorise);
routes.delete('/category/:id', celebrate(validateCategory.delete), CategoryController.delete);

//Product
routes.post('/product', generateId, authenticateToken, isBar, celebrate(validadeProduct.create), ProductController.create);
routes.get('/menu/:bar_id', celebrate(validadeProduct.index), ProductController.index);
routes.put('/product/:id', authenticateToken, isBar, celebrate(validadeProduct.update), ProductController.update);
routes.delete('/product/:id',authenticateToken, isBar, celebrate(validadeProduct.delete), ProductController.delete);

//Token temporário
const jwt = require('jsonwebtoken');

routes.get('/token/bar', function (req, res) {
  const accessToken = jwt.sign({ type: 'bar', id: req.query.id }, process.env.ACCESS_TOKEN_SECRET);
  res.json({token: accessToken});
});

routes.get('/token/user', function (req, res) {
  const accessToken = jwt.sign({ type: 'user', id: req.query.id }, process.env.ACCESS_TOKEN_SECRET);
  res.json({token: accessToken});
});


module.exports = routes;