const axios = require('axios')
const Item = require('../model/Item')
const User = require('../model/User')
module.exports = {
    async index(req, res) {
        try{
            const {user} = req.headers
            console.log(`user ${user}`)
            const loggedUser = await User.findById(user)
            console.log(`loggedUser ${loggedUser}`)
            if(loggedUser == undefined) 
                return res.status(400).json({message: 'User don\'t fount'})
            try{
                const items = await Item.find({
                    $and: [
                        {_id: {$nin: loggedUser.likes}},
                        {_id: {$nin: loggedUser.dislike}}
                    ],
                    location: { 
                        $near:  {
                            $geometry: { type: "Point",  coordinates: [ loggedUser.location.coordinates[0], loggedUser.location.coordinates[1] ] },
                            $maxDistance: 50000
                        }
                    }
                }).limit(2)
                return res.json(items)
            }catch(er) {
                const items = await Item.find({
                    $and: [
                        {_id: {$nin: loggedUser.likes}},
                        {_id: {$nin: loggedUser.dislike}}
                    ]
                }).limit(2)
                return res.json(items)
            }
            
        }catch(err) {
            console.log(err)
            return res.status(400).json({message: err})
        }
        
    },

    async indexByUser(req, res) {
        try{
            const {user} = req.headers
            console.log(`user ${user}`)
            const loggedUser = await User.findById(user)
            console.log(`loggedUser ${loggedUser}`)
            if(loggedUser == undefined) 
                return res.status(400).json({message: 'User don\'t fount'})
            try{
                const items = await Item.find({'userReference': loggedUser._id})
                return res.json(items.reverse())
            }catch(er) {
                const items = await Item.find({'userReference': loggedUser._id})
                return res.json(items.reverse())
            }
            
        }catch(err) {
            console.log(err)
            return res.status(400).json({message: err})
        }
        
    },

    async store(req, res) {
        try{
            const {user} = req.headers
            console.log(`user ${user}`)
            const loggedUser = await User.findById(user)
            console.log(`loggedUser ${loggedUser}`)
            if(loggedUser == undefined) 
                return res.status(400).json({message: 'User don\'t fount'})
            
            const items = await Item.find()
            return res.json(items)
            
            
        }catch(err) {
            console.log(err)
            return res.status(400).json({message: err})
        }
        
    },

}