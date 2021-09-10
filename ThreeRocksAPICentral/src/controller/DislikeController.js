const User = require('../model/User')
const Item = require('../model/Item')

module.exports = {
    async store(req, res) {
        const {itemId} = req.params
        const {user} = req.headers

        const loggedUser = await User.findById(user)
        const targetItem = await Item.findById(itemId)

        if(!targetItem) {
            return res.status(400).json({error: 'Item not exists'})
        }
        loggedUser.dislike.push(targetItem._id)
        await loggedUser.save()
        return res.json(loggedUser)
    }
}