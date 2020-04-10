const express = require('express');

const UserController = require('../src/controllers/UserController');
const AdsController = require('../src/controllers/AdsController');
const ProfileController = require('../src/controllers/ProfileController');
const SessionController = require('../src/controllers/SessionController');

const routes = express.Router();

//users routes
routes.get('/users', UserController.list);
routes.post('/users', UserController.create);

//login
routes.post('/sessions', SessionController.get);

//ads per user
routes.get('/profile', ProfileController.list);

//ads routes
routes.get('/ads', AdsController.list);
routes.post('/ads', AdsController.create);
routes.delete('/ads/:id', AdsController.delete);

module.exports = routes;