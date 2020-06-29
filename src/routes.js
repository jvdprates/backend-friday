const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = routes;