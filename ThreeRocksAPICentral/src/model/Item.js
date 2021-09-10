const {Schema, model} = require('mongoose')

const ItemSchema = new Schema({
    _id: String,
    typeUnit: String,
    country: String,
    city: String,
    state: String,
    address: String,
    number: String,
    neighborhood: String,
    cep: String,
    area: String,
    carSpace: String,
    rooms: String,
    suites: String,
    toilet: String, 
    value: String,
    valueCond: String,
    userReference: String,
    location: { type: {type:String}, coordinates: [Number]},
    images: [String]
})

module.exports = model('Item', ItemSchema)