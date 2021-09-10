const {Schema, model} = require('mongoose')

const PerfilSchema = new Schema({
    _id: Schema.Types.ObjectId,
    typeUnit: String,
    minareaExt: Number,
    maxareaExt: Number,
    minareaUtil: Number,
    maxareaUtil: Number,
    mincarSpace: Number,
    maxcarSpace: Number,
    minrooms: Number,
    maxrooms: Number,
    minsuites: Number,
    maxsuites: Number,
    mintoilet: Number,
    maxtoilet: Number,
    minvalue: Number,
    maxvalue: Number,
    minvalueCond: Number,
    maxvalueCond: Number
})

module.exports = model('Perfil', PerfilSchema)