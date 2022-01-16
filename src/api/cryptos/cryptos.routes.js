const CryptoRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewCrypto, getAllCryptos, getCrypto, deleteCrypto, getCryptoFilter} = require('./cryptos.controller')


CryptoRoutes.get('/', getAllCryptos)
CryptoRoutes.get('/:id', getCrypto)
CryptoRoutes.get('/filter/:wallet', getCryptoFilter)
CryptoRoutes.post('/', [isAuth], upload.single('img'), postNewCrypto)
CryptoRoutes.delete('/:id', [isAuth], upload.single('img'), deleteCrypto)

module.exports = CryptoRoutes