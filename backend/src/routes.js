const routes = require('express').Router();

//Controllers
const { CreateUser, UpdateUser, ReadUser, DeleteUser, ListUsers } = require('./controllers/UserControllers');
const { ListAllConversations } = require('./controllers/ConversationController');

//CRUD Users
routes.post("/user", CreateUser);
routes.get('/user/:id', ReadUser)
routes.put("/user/", UpdateUser)
routes.delete('/user', DeleteUser);
routes.get('/users', ListUsers);

//Conversation
routes.get('/conversation', ListAllConversations)

module.exports = routes;