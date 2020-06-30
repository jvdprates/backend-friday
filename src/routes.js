const express = require('express');
const routes = express.Router();
const CheckController = require('./controllers/CheckController');
const MenuController = require('./controllers/MenuController');
const OrderController = require('./controllers/OrderController');
const PubController = require('./controllers/PubController');
const RatingController = require('./controllers/RatingController');
const UserController = require('./controllers/UserController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = routes;