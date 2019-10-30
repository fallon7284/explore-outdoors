const { mapsKey } = require('../secrets')

module.exports = () => {
    if (process.env.NODE_ENV === "production"){
        return process.env.MAPS_KEY
    }
    else return mapsKey
}