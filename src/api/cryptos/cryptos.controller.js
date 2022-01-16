const Crypto = require('./cryptos.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')

 const postNewCrypto = async (req, res, next) => {
    try {
        const newCrypto = new Crypto()
        newCrypto.name = req.body.name
        newCrypto.web = req.body.web
        newCrypto.wallet = req.body.wallet
        if (req.file) {
            newCrypto.img = req.file.path
        }
        const cryptoDB = await newCrypto.save()
        return res.status(201).json(cryptoDB)
    } catch (error) {
        return next(setError(500, 'Crypto not saved'))
    }
} 

const getAllCryptos = async (req, res, next) => {
    try {
        const CryptosDB = await Crypto.find()
        res.status(200).json(CryptosDB)
    } catch (error) {
        return next(setError(500, 'Crypto failed server'))
    }
}

const getCrypto = async (req, res, next) => {
    try {
        const { id } = req.params
        const cryptoDB = await Crypto.findById(id)
        if (!cryptoDB) {
            return next(setError(404, 'Crypto not found'))
        }
        return res.status(200).json(cryptoDB)
    } catch (error) {
        return next(setError(500, 'Crypto server error'))
    }
}

const getCryptoFilter = async (req, res, next) => {
    const { wallet } = req.params
    try {
        const cryptoDB = await Crypto.find({
            wallet
        }) /* .populate('cryptos') */
        if (!cryptoDB) {
            return next(setError(404, ` ${id} not found`))
        }
        return res.status(200).json(cryptoDB)
    } catch (error) {
        return next(setError(500, 'Cryptos server error'))
    }
}


const patchCryptos = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchCrypto = new Crypto(req.body)
        patchCrypto._id = id
        if (req.file) {
            patchCrypto.img = req.file.path
        }
        const cryptoDB = await Crypto.findByIdAndUpdate(id, patchCrypto)

        if (!cryptoDB) {
            return next(setError(404, 'Crypto not found'))
        }
        if (cryptoDB.img) deleteFile(cryptoDB.img)
        return res.status(200).json({ new: patchCrypto, old: cryptoDB })
    } catch (error) {
        return next(setError(500, 'Crypto Patch server error'))
    }
}


const deleteCrypto = async (req, res, next) => {
    try {
        const { id } = req.params
        const cryptoDB = await Crypto.findByIdAndDelete(id)
        if (!cryptoDB) {
            return next(setError(404, 'Crypto not found'))
        }
        if (cryptoDB.img) deleteFile(cryptoDB.img)
        return res.status(200).json(cryptoDB)
    } catch (error) {
        return next(setError(500, 'Crypto removed server error'))
    }
}

module.exports = {
    getCryptoFilter,
    postNewCrypto,
    getAllCryptos,
    getCrypto,
    patchCryptos,
    deleteCrypto
}