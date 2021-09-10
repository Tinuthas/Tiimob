const axios = require('axios')
const Perfil = require('../model/Perfil')
module.exports = {
    async index(req, res) {

        const {user} = req.headers
        if(user == undefined) return res.json({message: 'Don\'t fount user id'})
        const perfil = await Perfil.findOne({_id: user})
        return res.json(perfil)
    },

    async store(req, res) {

        const {user} = req.headers
        const body = req.body
        console.log(body)
        if(user == undefined) return res.json({message: 'Don\'t fount user id'})
        if(body == undefined || body == null) return res.json({message: 'Don\'t fount body'})

        const perfil = await Perfil.findOne({_id: user})
    
        if(perfil != null) return res.json(perfil)

        try{
            console.log(body)
            const newPerfil = await Perfil.create(body)
            return res.json(newPerfil)
        }catch(err) {
            return res.json({message: 'Error fields'})
        }
        
    },

}