const Exchange = require('./exchanges.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewExchange = async (req, res, next) => {
    try {
        const newExchange = new Exchange()
        newExchange.name = req.body.name
        newExchange.country = req.body.country
        newExchange.cryptos = req.body.cryptos
        if (req.file) {
            newExchange.img = req.file.path
        }
        const exchangeDB = await newExchange.save()
        return res.status(201).json(exchangeDB)
    } catch (error) {
        return next(setError(500, 'Exchange not saved'))
    }
}

const getAllExchanges = async (req, res, next) => {
    try {
        const exchangesDB = await Exchange.find().populate('cryptos')
        res.status(200).json(exchangesDB)
    } catch (error) {
        return next(setError(500, 'Exchange failed server'))
    }
}

const getExchange = async (req, res, next) => {
    try {
        const { id } = req.params
        const exchangeDB = await Exchange.findById(id).populate('cryptos')
        if (!exchangeDB) {
            return next(setError(404, 'Exchange not found'))
        }
        return res.status(200).json(exchangeDB)
    } catch (error) {
        return next(setError(500, 'Exchange server error'))
    }
}

const getExchangeFilter = async (req, res, next) => {
    try {
        const { country } = req.params
        console.log(country);
        const exchangeDB = await Exchange.find({
            country: country
        }).populate('cryptos')
        if (!exchangeDB) {
            return next(setError(404, ` ${country} not found`))
        }
        return res.status(200).json(exchangeDB)
    } catch (error) {
        return next(setError(500, 'Exchange server error'))
    }
}



const patchExchange = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchExchange = new Exchange(req.body)
        patchExchange._id = id
        if (req.file) {
            patchExchange.img = req.file.path
        }
        const exchangeDB = await Exchange.findByIdAndUpdate(id, patchExchange)
        if (!exchangeDB) {
            return next(setError(404, 'Exchange not found'))
        }
        if (exchangeDB.img) deleteFile(exchangeDB.img)
        return res.status(200).json({ new: patchExchange, old: exchangeDB })
    } catch (error) {
        return next(setError(500, 'Exchange Patch server error'))
    }
}

const deleteExchange= async (req, res, next) => {
    try {
        const { id } = req.params
        const exchangeDB = await Exchange.findByIdAndDelete(id)
        if (!exchangeDB) {
            return next(setError(404, 'Exchange not found'))
        }
        if (exchangeDB.img) deleteFile(exchangeDB.img)
        return res.status(200).json(exchangeDB)
    } catch (error) {
        return next(setError(500, 'Exchange removed server error'))
    }
}

module.exports = {
    postNewExchange,
    getAllExchanges,
    getExchangeFilter,
    getExchange,
    patchExchange,
    deleteExchange
}