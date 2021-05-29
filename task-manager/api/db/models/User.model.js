const { mongoose } = require("../mongoose")
const JSONWebToken = require('jsonwebtoken')
const crypto = require('crypto')

const JSONWEBTOKEN_SECRET = 'envosdinc240jr249rj209j2094rj20fcn0wd'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1, 
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.sessions
    return userObject
}

UserSchema.methods.generateAccessAuthToken = function () {
    const user = this
    return new Promise((resolve, reject) => {
        JSONWebToken.sign(
            { _id: user._id.toHexString() },
            JSONWEBTOKEN_SECRET,
            { expiresIn: '15m'},
            (error, token) => {
                if(!error) resolve(token)
                else reject()
            }
        )
    })
}

UserSchema.methods.generateRefreshAuthToken = function () {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (error, buffer) => {
            if(!error) return resolve(buffer.toString('hex'))
        })
    })
}

UserSchema.methods.createSession = function () {
    let user = this
    return user.generateRefreshAuthToken()
    .then(refreshToken => saveSessionToDatabase(user, refreshToken))
    .then(refreshToken => refreshToken)
    .catch(e => Promise.reject('Failed to save session to database', e))
}

let saveSessionToDatabase = function (user, refreshToken) {
    return new Promise((resolve, reject) => {
        const expiresAt = generateRefreshAuthTokenExpireTime()
        user.session.push({'token': refreshToken, expiresAt})
        user.save()
        .then(refreshToken => resolve(refreshToken))
        .catch(e => reject(e))
    })
}

let generateRefreshAuthTokenExpireTime = function () {
    let daysToExpire = 10
    let secondsToExpire  = daysToExpire * 24 * 60 * 60
    return ((Date.now() / 1000) + secondsToExpire)
}

const User = mongoose.model(
    'User', 
    UserSchema
)

module.exports = {
    User
}