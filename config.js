const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/.env'})

module.exports = {
    mapsKey: process.env.REACT_APP_MAPS_KEY
}