const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    cryptos: [{ type: Schema.Types.ObjectId, ref: "cryptos"}]
}, { timestamp: true }
)

const Exchange = mongoose.model('exchanges', ExchangeSchema)
module.exports = Exchange