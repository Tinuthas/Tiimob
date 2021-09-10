const axios = require('axios')
const User = require('../model/User')
module.exports = {
    async index(req, res) {
        try{
            const {user} = req.headers
            if(user == undefined) return res.status(400).json({message: 'Don\'t fount user id'})
            const userOne = await User.findOne({_id: user})
            return res.json(userOne)
        }catch(err){
            return res.status(400).json({message: err})
        }
    },

    async store(req, res) {
       
        
    },

}