const API_KEY = '6dbc36c032f21dbfb4b4bf4d6ce0a59c'

// const makeIconURL = (iconId) => `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOGttTl01YdtWrWVnsmK4TaN6rqcYxb42uzQ&usqp=CAU&iconId=${iconId}`;

// const makeIconURL = (iconId) =>  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOGttTl01YdtWrWVnsmK4TaN6rqcYxb42uzQ&usqp=CAU`


const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async (city,units = 'metric') => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL).then((res) => res.json()).then((data) => data);
   
    const {
        weather,
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const {description, icon} = weather[0];

    return{
        description,
        iconURL : makeIconURL(icon),
        temp,
        temp_min,
        temp_max,
        pressure,
        humidity,
        feels_like,
        speed,
        country,
        name,
    };
};

export {getFormattedWeatherData};