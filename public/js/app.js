const weatherForm = document.querySelector('form')
const inputField = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.innerText = 'Loading...'
    messageTwo.innerText = ''

    const location = inputField.value
    console.log(location); 
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.innerText = data.error;
            }
            messageOne.innerText = data.location
            messageTwo.innerText = `${data.forecast.desc.toUpperCase()}. It's currently ${data.forecast.temp}, but it feels like ${data.forecast.temp_feels_like}. The wind speed is ${data.forecast.wind_speed}`
        })
    })

})