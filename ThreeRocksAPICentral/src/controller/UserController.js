const axios = require('axios')
const User = require('../model/User')
const bcrypt = require('bcrypt')
module.exports = {
    async index(req, res) {
        const {user} = req.headers
        const loggedUser = await User.findById(user)

        const users = await User.find({
            $and: [
                {_id: {$ne: loggedUser._id},},
                {_id: {$nin: loggedUser.likes}},
                {_id: {$nin: loggedUser.dislike}}
            ]
        })

        return res.json(users)
    },

    async store(req, res) {
        try{
            var {email, password} = req.body
        
            if(email == undefined || password == undefined || email == '' || password == '') 
                return res.status(400).json({message: 'Parameters not found'})
    
            var userExists = await User.findOne({email: email.toLowerCase()})
    
            if(userExists) {
                if(await bcrypt.compare(password, userExists.password))
                    return res.json(userExists)
                else
                    return res.status(400).json({message: 'Password incorrect'})
    
            }
    
            userExists = await User.findOne({username: email})
            if(userExists) {
                if(await bcrypt.compare(password, userExists.password))
                    return res.json(userExists)
                else
                    return res.status(400).json({message: 'Password incorrect'})        
            }
            return res.status(400).json({message: 'User not found'})
        }catch(err) {
            return res.status(400).json({message: err})
        }
       
    },
}