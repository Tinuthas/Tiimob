const User = require('../model/User')
const Item = require('../model/Item')

module.exports = {

    async index(req, res) {
        const {user} = req.headers
        const loggedUser = await User.findById(user)
        const items = await Item.find({'_id':{$in:loggedUser.likes}}).limit(500)
        return res.json(items.reverse())
    },
    async store(req, res) {
        const {itemId} = req.params
        const {user} = req.headers

        const loggedUser = await User.findById(user)
        const targetItem = await Item.findById(itemId)

        if(!targetItem) {
            console.log('error')
            return res.status(400).json({error: 'Item not exists'})
        }
       
        /*
        if(targetUser.likes.includes(loggedUser._id)){
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[userId]

            if(loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetUser)
            }

            if(targetSocket) {
                req.io.to(targetSocket).emit('match', loggedUser)
            }
        }
         */
        loggedUser.likes.push(targetItem._id)
        await loggedUser.save()
        return res.json(loggedUser)
    }
}