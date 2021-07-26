const routes = require('express').Router();

//Controllers
const { ListUsers } = require('./controllers/UserControllers');

//CRUD
routes.get("/user", ListUsers);

module.exports = routes;