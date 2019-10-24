const getDistance = (currLat, currLong, destLat, destLong) => {
    function toRad(x) {
        return x * Math.PI / 180;
      }
    const R = 6371
    const dLat = toRad(currLat - destLat)
    const dLon = toRad(currLong - destLong)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(currLat)) * Math.cos(toRad(destLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const sort = (list, sortFilter) => {
    function compare( a, b ) {
      let one = a[sortFilter]
      let two = b[sortFilter]
      if ( one < two ){
        return -1;
      }
      if ( one > two ){
        return 1;
      }
      return 0;
    }

    return [...list].sort(compare)
  }

module.exports = {
    getDistance,
    sort
}