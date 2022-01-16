const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        web:{type: String, required: true, },
        wallet: {type: String, required: true, trim: true},
        img: { type: String, trim: true } 
    },
    {
        timestamps: true 
    }
    
);
const Crypto = mongoose.model('cryptos', CryptoSchema)
module.exports = Crypto