const { mongoose } = require("../mongoose")
const JSONWebToken = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

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
            if(!error) {
                return resolve(buffer.toString('hex'))
            }
        })
    })
}

UserSchema.methods.createSession = function () {
    let user = this
    return user.generateRefreshAuthToken()
    .then(refreshToken => saveSessionToDatabase(user, refreshToken))
    .then(refreshToken => {
        return refreshToken
    })
    .catch(e => Promise.reject('Failed to save session to database', e))
}

UserSchema.statics.findByIDandToken = function (_id, token) {
    let User = this
    return User.findOne({
        _id,
        'sessions.token' : token
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    let User = this
    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject()

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                }
                else {
                    reject()
                }
            })
        })
    })
}

UserSchema.statics.hasRefreshTokenExpired = expiresAt => {
    const secondsSinceEpoch = Date.now() / 1000
    return expiresAt < secondsSinceEpoch
}

UserSchema.pre('save', function (next) {
    let user = this
    let costFactor = 10

    if(user.isModified('password')) {
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else next()
})

let saveSessionToDatabase = function (user, refreshToken) {
    return new Promise((resolve, reject) => {
        const expiresAt = generateRefreshAuthTokenExpireTime()
        user.sessions.push({'token': refreshToken, expiresAt})
        user.save()
        .then(() => resolve(refreshToken))
        .catch(e => reject(e))
    })
}

let generateRefreshAuthTokenExpireTime = function () {
    let daysToExpire = '10'
    let secondsToExpire  = ((daysToExpire * 24) * 60) * 60
    return ((Date.now() / 1000) + secondsToExpire)
}

const User = mongoose.model(
    'User', 
    UserSchema
)

module.exports = {
    User
}