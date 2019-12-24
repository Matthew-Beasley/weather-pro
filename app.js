
const WEATHER_DATA_TYPE = document.querySelector('#data-selector');
const WEATHER_ZONE = document.querySelector('#location');
const UNIT_TYPE_EMP = document.querySelector('input[value="imperial"]');
const UNIT_TYPE_MTRC = document.querySelector('input[value="metric"]');
const submitRequest = document.querySelector('#submit');
const mainPanel = document.querySelector('main');

// Refactor, take these out of the of the global scope
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '?APPID=a315dcab0681ed1e5e3f9154a0ada450';

// Refactor to handle more arguments
const buildURL = () => {
    let unitType = '';

    if (UNIT_TYPE_EMP.checked) {
        unitType = UNIT_TYPE_EMP.value;
    } else if (UNIT_TYPE_MTRC.checked) {
        unitType = UNIT_TYPE_MTRC.value;
    }

    let fullURL = BASE_URL;
    fullURL += `${WEATHER_DATA_TYPE.value}${API_KEY}&q=${WEATHER_ZONE.value}&units=${unitType}`;
    return fullURL;
}

const displayTheCurrentData = (wxData) => {      //Refactor to display city first letter uppercase
    const wxKey = wxData.weather[0];            //Refactor to account for spaces in city names
    const mainKey = wxData.main;

    let html =
    `<div id="basic-wx">
        <h5>Current Weather for ${WEATHER_ZONE.value}</h5>
        <img src="http://openweathermap.org/img/w/${wxKey.icon}.png" height="100" width="100">
        <h6>${wxKey.main}</h6>
        <p>Temp ${mainKey.temp}</p>
        <p>Low ${mainKey.temp_min}</p>
        <p>High ${mainKey.temp_max}</p>
        <p>Humidity ${mainKey.humidity}</p>
        <p>Pressure ${mainKey.pressure}</p>
    </div>`;

    mainPanel.innerHTML = html;
}

const displayFiveDayForcast = (wxData) => {
    const wx5DayList = wxData.data.list;
    let html = `<div id="constainer>
                <h2>5 Day Forecast For ${WEATHER_ZONE.value}</h2>`;

    wx5DayList.forEach(item => {
        //console.log(item.dt_txt.substr(11, 11))
    if (item.dt_txt.substr(11, 11) === '12:00:00') {
            html +=
            `<div class="daily">
                <h4>${item.dt_txt}</h4>
                <p>${item.weather[0].description}</p>
                <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" height="100" width="100">
                <p>Temp ${item.main.temp}</p>
                <p>High ${item.main.temp_max}</p>
                <p>Low ${item.main.temp_min}</p>
                <p>Humidity ${item.main.humidity}</p>
                <p>Pressure ${item.main.pressure}</p>
            </div>`
        }
    })
    html += '</div>'
    //console.log(html);
    mainPanel.innerHTML = html;
}

const axiosRequest = (url) => {
    return axios.get(url)
}

const goGetData = async (event) => {
    event.preventDefault();

    //console.log(event);

    const URL = buildURL();
    const theData = await axiosRequest(URL);

    // Refactor here to add more ways to display data
    if (WEATHER_DATA_TYPE.value === 'weather') {
        displayTheCurrentData(theData.data);
    } else if (WEATHER_DATA_TYPE.value === 'forecast') {
        displayFiveDayForcast(theData);
    }
}

submitRequest.addEventListener('click', goGetData)

