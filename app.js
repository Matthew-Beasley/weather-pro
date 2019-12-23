
const weatherDataType = document.querySelector('#data-selector');
const weatherZone = document.querySelector('#location');
const submitRequest = document.querySelector('#submit');
const mainPanel = document.querySelector('main');

// Refactor, take these out of the of the global scope
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?APPID=a315dcab0681ed1e5e3f9154a0ada450'
let dataType = '';
let dataZone = '';

// Refactor to handle more arguments
const buildURL = () => {
    dataZone = weatherZone.value;
    dataType = weatherDataType.value;

    let fullURL = baseURL;
    switch (dataType) {
        case 'current':
            fullURL += `&q=${dataZone}&units=imperial`; //Refactor to allow optional units
            console.log(fullURL);
            break;
        default:
            break;
    }
    return fullURL;
}

const displayTheCurrentData = (wxData) => { //Refactor to add more data to display
    console.log(wxData.main);                    //Refactor to display sity first letter uppercase
    const wxKey = wxData.weather[0];
    const mainKey = wxData.main;

    let html =
    `<div id="basic-wx">
        <h5>Current Weather for ${dataZone}</h5>
        <img src="http://openweathermap.org/img/w/${wxKey.icon}.png" height="75" width="75">
        <h6>${wxKey.main}</h6>
        <p>Temp ${wxData.main.temp}</p>
        <p>Low ${wxData.main.temp_min}</p>
        <p>High ${wxData.main.temp_max}</p>
        <p>Humidity ${wxData.main.humidity}</p>
        <p>Pressure ${wxData.main.pressure}</p>
    </div>`;

    mainPanel.innerHTML = html;
}

const axiosRequest = (url) => {
    return axios.get(url)
}

const goGetData = async (event) => {
    event.preventDefault();
    const URL = buildURL();
    const theData = await axiosRequest(URL);
    displayTheCurrentData(theData.data); // Refactor to display other wx types
}

submitRequest.addEventListener('click', goGetData)


// listen for user input (type of forcast and location)
// make api query based on the above choices
// display data in <main>

/*
HTML to get icon

<img height="45" width="45" style="border: medium none; width: 45px; height: 45px;
background: url(&quot;http://openweathermap.org/img/w/10n.png&quot;)
repeat scroll 0% 0% transparent;" alt="title" src="http://openweathermap.org/images/transparent.png">
*/
