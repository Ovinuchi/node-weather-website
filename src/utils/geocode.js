const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF2aWRnZW50bGUiLCJhIjoiY2w4NG44dG4yMGd6cDN1bGh3ZDFzdm0yZCJ9.TgDcP-icXKrc5odrnQLnSA&limit=1`
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to geocode service!', undefined)
    } else if (body.features.length === 0) {
      callback('No matching results!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1].toFixed(2),
        longitude: body.features[0].center[0].toFixed(2),
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode