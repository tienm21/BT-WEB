const express = require('express');
const UserController = require('../controller/UserController');

const route = express.Router();

route.get('/api/get-users', UserController.getUser)
route.get('/api/history-actions', UserController.historyActions)

route.post('/api/adduser', UserController.addUser) 

route.delete('/api/deleteuser', UserController.deleteUser);

route.put('/api/resetpass', UserController.resetPass)

route.put('/api/edit-user', UserController.editUser)


route.get('/test-api', UserController.test)

route.get('/', (req, res) => {
    res.send('Khổng Mạnh Tiến API')
})

module.exports = route;