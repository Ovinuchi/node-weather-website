const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Gentle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        img_url: '/img/portrait.jpg',
        name: 'David Gentle',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        info: 'Need help or support about a specific thing in node? Just visit the url below',
        url: 'https://nodejs.org/en/docs/',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({ error: 'You must provide an address' })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.name) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.name);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'dg',
        error_message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'dg',
        error_message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server starter at port', port);
})