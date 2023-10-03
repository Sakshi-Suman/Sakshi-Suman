document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'ce374136babc70f94fab29de5b6313b0';
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");
    
    document.getElementById("get-weather").addEventListener("click", function () {
        const location = document.getElementById("location").value.trim();
        const unit = document.getElementById("unit").value;

        if (!location) {
            showError("Please enter a location.");
            return;
        }

        fetchWeather(location, unit);
    });

    function fetchWeather(location, unit) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather data not found.");
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data, unit);
            })
            .catch(error => {
                showError(error.message);
            });
    }

    function displayWeather(data, unit) {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;

        const weatherHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature} ${unit === 'metric' ? '°C' : '°F'}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Description: ${description}</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
        errorMessage.style.display = "none";
    }

    function showError(message) {
        errorMessage.innerText = message;
        errorMessage.style.display = "block";
        weatherInfo.innerHTML = "";
    }
});
