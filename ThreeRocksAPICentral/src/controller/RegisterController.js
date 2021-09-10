const validator = require('validator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
module.exports = {
    async store(req, res) {
        try{
            var {user, name, password, email, latitude, longitude} = req.body

            if(user == undefined || name == undefined || email == undefined || password == undefined || user == '' || email == '' || password == '' || latitude == undefined || longitude == undefined) 
                return res.status(400).json({message: 'Parameters not found'})

            email = email.toLowerCase()

            if(password.length < 8) {
                return res.status(400).json({message: 'Password length is min 8'})
            }

            //if(!validator.isEmail(email)) {
            //    return res.status(400).json({message: 'Email is not valid'})
            //}

            var userExists = await User.findOne({user: user})

            if(userExists) {
                return res.status(400).json({message: 'User is exist'})
            }

            userExists = await User.findOne({email: email})

            if(userExists) {
                return res.status(400).json({message: 'Email is exist'})
            }
            
            const hashedPwd = await bcrypt.hash(password, saltRounds);
            const userCreated = await User.create({
                username: user,
                name,
                email,
                password: hashedPwd,
                location: {
                    type: 'Point',
                    coordinates: [latitude, longitude]
                },
            })
            console.log(`foi`)
            return res.status(201).json(userCreated)
        }catch(err) {
            return res.status(400).json({message: err})
        }
        
    },
}