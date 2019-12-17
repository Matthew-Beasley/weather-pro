

const mainPanel = document.querySelector('#main-display');
const submitButton = document.querySelector('#btn-submit')

let baseCurrentApiURL = 'https://api.weatherbit.io/v2.0/current?key=a23e401529d54a5d81e7cd0df87432b2';

const buildUrl = () => {
    const cityState = document.querySelector('#location-input').value;
    const url = `${baseCurrentApiURL}&city=${cityState}&units=I`; // units=I sets to us standar measurments
    return url;
}

const getWeatherData = async (fullURL) => {
    const weatherData = await axios.get(fullURL);
    return weatherData.data;
}

const displayWeather = (wxdata) => {
    console.log(wxdata.data[0]);
    const html =
    `<div>
        <p>temp ${wxdata.data[0].temp}</p>
        <p>precipitation ${wxdata.data[0].precip}</p>
    </div>`
    mainPanel.innerHTML = html;
}


const getWeather = async (event) => {
    event.preventDefault();
    const url = buildUrl();
    const weatherData = await getWeatherData(url);
    displayWeather(weatherData);
}

submitButton.addEventListener('click', getWeather);
