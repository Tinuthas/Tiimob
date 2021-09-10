const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        } 
    },
    name: {
        type: String,
        unique: true ,
        required: true,
    },
    email: {
        type: String,
        unique: true ,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
    },
    likes: [{
        type: String,
        ref: 'User',
    }],
    dislike: [{
        type: String,
        ref: 'User',
    }],
}, {
    timestamps: true,
})

module.exports = model('User', UserSchema)
