const ExchangeRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewExchange, getAllExchanges, getExchange, getExchangeFilter, patchExchange } = require('./exchanges.controller')


ExchangeRoutes.get('/', getAllExchanges)
ExchangeRoutes.get('/:id', getExchange)
ExchangeRoutes.get('/filter/:country', getExchangeFilter)

ExchangeRoutes.post('/', [isAuth], upload.single('img'), postNewExchange)

//ejecutarlo en linea 4.
 ExchangeRoutes.patch('/:id', [isAuth], upload.single('img'), patchExchange)
//ExchangeRoutes.delete('/:id', [isAuth], upload.single('img'), deleteExchange) 

module.exports = ExchangeRoutes