const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');
const { generateId } = require('./middlewares/uuid');
const { authenticateToken, isBar, isUser } = require('./middlewares/authentication');

const AvaliationController = require('./controllers/AvaliationController');
const validadeAvaliation = require('./validators/AvalitationValidator');

const BarController = require('./controllers/BarController');
const validateBar = require('./validators/BarValidator');

const CardController = require('./controllers/CardController');
const validateCard = require('./validators/CardValidator')

const CategoryController = require('./controllers/CategoryController');
const validateCategory = require('./validators/CategoryValidator');

const CommentController = require('./controllers/CommentController');
const validateComment = require('./validators/CommentValidator');

const EventController = require('./controllers/EventController');
const validateEvent = require('./validators/EventValidator');

const OrderSheetsController = require('./controllers/OrderSheetsController');
const validateOrderSheets = require('./validators/OrderSheetsValidator');

const ProductController = require('./controllers/ProductController');
const validadeProduct = require('./validators/ProductValidator');

const SessionController = require('./controllers/SessionController');
const validateSession = require('./validators/SessionValidator')

const TableController = require('./controllers/TableController');
const validadeTable = require('./validators/TableValidator');

const UserController = require('./controllers/UserController');
const validateUser = require('./validators/UserValidator');

const OrderController = require('./controllers/OrderController');
const validadeOrder = require('./validators/OrderValidator');

//User
routes.post('/user', generateId, celebrate(validateUser.create), UserController.create);
routes.get('/user/:id', celebrate(validateUser.getOne), UserController.getOne);
routes.put('/user/:id', celebrate(validateUser.update), UserController.update);
routes.delete('/user/:id', celebrate(validateUser.delete), UserController.delete);

//Avaliation
routes.post('/avaliation', authenticateToken, isUser, celebrate(validadeAvaliation.create), AvaliationController.create);
routes.get('/avaliation/:bar_id', celebrate(validadeAvaliation.index), AvaliationController.index);
routes.put('/avaliation/:id', authenticateToken, isUser, celebrate(validadeAvaliation.update), AvaliationController.update);
routes.delete('/avaliation/:id',authenticateToken, isUser, celebrate(validadeAvaliation.delete), AvaliationController.delete);

//Bar
routes.post('/bar', generateId, celebrate(validateBar.create), BarController.create);
routes.get('/bar', BarController.getAll);
routes.get('/bar/:id', celebrate(validateBar.getOne), BarController.getOne);
routes.put('/bar/:id', celebrate(validateBar.update), BarController.update);
routes.delete('/bar/:id', celebrate(validateBar.delete), BarController.delete);

//card
routes.post('/card', authenticateToken, isUser, generateId, celebrate(validateCard.newCard), CardController.newCard);
routes.delete('/card', authenticateToken, isUser, CardController.deleteCard)

//Category
routes.post('/category', generateId, celebrate(validateCategory.create), CategoryController.create);
routes.get('/category', CategoryController.index);
routes.get('/categories', CategoryController.getAll);
routes.get('/category/:id', celebrate(validateCategory.getOne), CategoryController.getOne);
routes.put('/category/:id', celebrate(validateCategory.categorize), CategoryController.categorise);
routes.delete('/category/:id', celebrate(validateCategory.delete), CategoryController.delete);

//Comment
routes.post('/comment', celebrate(validateComment.create), CommentController.create);
routes.get('/comment', CommentController.index);
routes.put('/comment/:id', celebrate(validateComment.update), CommentController.update);
routes.delete('/comment/:id', celebrate(validateComment.delete), CommentController.delete);

//Event
routes.post('/event', celebrate(validateEvent.create), EventController.create);
routes.get('/event', EventController.getAll);
routes.get('/event/:id', celebrate(validateEvent.getOne), EventController.getOne);
routes.put('/event/:id', celebrate(validateEvent.update), EventController.update);
routes.delete('/event/:id', celebrate(validateEvent.delete), EventController.delete);

//Order_Sheets
routes.post('/order_sheets', authenticateToken, isUser, generateId, celebrate(validateOrderSheets.create), OrderSheetsController.create);
routes.get('/order_sheets', authenticateToken, isBar, OrderSheetsController.index);
routes.get('/order_sheets/:user_id', authenticateToken, celebrate(validateOrderSheets.getByUser), OrderSheetsController.getByUser);
routes.put('/order_sheets/:id', authenticateToken, isUser, celebrate(validateOrderSheets.update), OrderSheetsController.update);
routes.delete('/order_sheets/:id',authenticateToken, isBar, celebrate(validateOrderSheets.delete), OrderSheetsController.delete);

//Product
routes.post('/product', authenticateToken, isBar,generateId, celebrate(validadeProduct.create), ProductController.create);
routes.get('/menu/:bar_id', celebrate(validadeProduct.index), ProductController.index);
routes.put('/product/:id', authenticateToken, isBar, celebrate(validadeProduct.update), ProductController.update);
routes.delete('/product/:id',authenticateToken, isBar, celebrate(validadeProduct.delete), ProductController.delete);

//Session
routes.post('/session', celebrate(validateSession.create), SessionController.signin);

//Table
routes.post('/table', authenticateToken, isBar, celebrate(validadeTable.create), TableController.create);
routes.get('/tables/:bar_id', celebrate(validadeTable.index), TableController.index);
routes.put('/table/:id', authenticateToken, isBar, celebrate(validadeTable.update), TableController.update);
routes.delete('/table/:id',authenticateToken, isBar, celebrate(validadeTable.delete), TableController.delete);

//User
routes.post('/user', generateId, celebrate(validateUser.create), UserController.create);
routes.put('/user', authenticateToken, celebrate(validateUser.update), UserController.update);
routes.delete('/user', authenticateToken, UserController.delete);

//Order
routes.post('/order', authenticateToken, isUser, generateId,celebrate(validadeOrder.create), OrderController.create);
routes.get('/orders/fromSheet/:order_sheet_id', authenticateToken, celebrate(validadeOrder.indexSheet), OrderController.indexSheet);
routes.get('/orders/fromBar/:bar_id', authenticateToken, isBar, celebrate(validadeOrder.indexBar), OrderController.indexBar);
routes.put('/order/:id', authenticateToken, celebrate(validadeOrder.update), OrderController.update);
routes.delete('/order/:id',authenticateToken, celebrate(validadeOrder.delete), OrderController.delete);


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