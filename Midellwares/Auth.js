const expressjwt = require('express-jwt')
const config = require('config')
const secret = config.get('secret')

function Auth () {
    return expressjwt({
        secret,
        algorithms:["HS256"]
    })
}

module.exports = Auth