const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser } = require('./user.controller')

UserRoutes.post('/register', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)

module.exports = UserRoutes