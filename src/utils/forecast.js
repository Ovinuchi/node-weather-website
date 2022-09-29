const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const apiKey = '16716db9fafa9f85ff7b1fda217959a4'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  request({ url, json: true }, (error, res) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (res.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        desc: res.body.weather[0].description,
        temp: `${res.body.main.temp}°C`,
        temp_feels_like: `${res.body.main.feels_like}°C`,
        wind_speed: `${res.body.wind.speed}km/h`,  
      })
    }
  })
}

module.exports = forecast
