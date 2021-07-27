const routes = require('express').Router();

//Controllers
const { CreateUser, UpdateUser, ReadUser, DeleteUser, ListUsers } = require('./controllers/UserControllers');

//CRUD
routes.post("/user", CreateUser);
routes.get('/user/:id', ReadUser)
routes.put("/user/", UpdateUser)
routes.delete('/user', DeleteUser);
routes.get('/users', ListUsers);

module.exports = routes;