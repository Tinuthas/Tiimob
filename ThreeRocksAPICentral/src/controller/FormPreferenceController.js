const axios = require('axios')
const Label = require('../model/Label')
module.exports = {
    async index(req, res) {

        const form = await Label.findOne({})

        return res.json(form)
    },

}