import React, { useState, useEffect } from 'react';
import hot from '../Whimages/hot.webp'
import cold from "../Whimages/cold.jpeg"
import './Appii.css'
import Description from './Description';
import {getFormattedWeatherData} from './WeatherService'
 
const Appi=()=>{

    const [city,setCity] = useState("Paris");
    const [weather, setWeather] = useState(null);
    const [units,setUnits] = useState('metric');
    const [bg,setBg] = useState(hot);

    useEffect(()=>{
        
        const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city,units);
        setWeather(data);

        const threshold = units === 'metric' ? 20 : 60;

        if(data.temp <= threshold) setBg(cold)
        else setBg(hot)


        };
        fetchWeatherData();

    },[units,city]);

    const handleUnitsClick = (e) => {

        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);
        const isCalsius = currentUnit === "C";
        button.innerText = isCalsius ? "°F" : "°C";
        setUnits(isCalsius ? "metric" : "imperial");

    }

    const enterKeyPressed = (e) => {
        if (e.keyCode === 13){
            setCity(e.currentTarget.value)
            e.currentTarget.blur();


        }

    }

    return(
        <div className='app' style={{backgroundImage: `url(${bg})`}}>
           <div className="overlay">
            {
                weather && (

                    <div className="container">
                <div className="section section_inputs">
                    <input onKeyDown={(enterKeyPressed)}  type='text' name='city' placeholder='Enter city..'/>
                    <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
                </div>

                <div className="section section_temperature">
                    <div className="icon">
                        <h3>{`${weather.name}, ${weather.country}`}</h3>
                         <img src={weather.iconURL} alt='weatherIcon' width='50%' height='50%'/>
                         <h3>{weather.description}</h3>
                    </div>
                    <div className='temperature'>
                        <h1>{`${weather.temp.toFixed()}  °${units === 'metric' ? 'C' : 'F'}`}</h1>
                    </div>
                </div>
      

            <Description weather={weather} units={units}/>
            </div>
            )}
             



             
           </div>
        </div>
    )
}
export default Appi;
 