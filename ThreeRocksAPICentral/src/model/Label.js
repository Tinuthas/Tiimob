const {Schema, model} = require('mongoose')

const LabelSchema = new Schema({
    areaExt: [Number],
    areaUtil: [Number],
    carSpace: [Number],
    rooms: [Number],
    suites: [Number],
    toilet: [Number],
    typeUnit: [String],
    value:[Number],
    valueCond: [Number]
})

module.exports = model('Label', LabelSchema)