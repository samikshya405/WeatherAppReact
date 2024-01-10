import React, { useEffect, useState } from "react";

import "./Weather.css";
import humid from './humidity.png'
import windflow from './windSpeed.png'

function WeatherApp() {
  const [input, setinput] = useState("");
  const [city, setCity] = useState('Sydney')
  const [icon, seticon] = useState("");
  const [temp, setTemp] = useState(24)
  const [feelsLike, setFeelsLike] = useState(1)
  const [humidity, setHumidity] = useState(1)
  const [windSpeed, setwindSpeed] = useState(1)
  const [country, setCountry] = useState('')

  const api_key = "4c15841e7647624d21c00a25c3ba5072";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
 const handleChnage=(e)=>{
  setinput(e.target.value)
 }
  const handleclick= ()=>{
    setCity(input)
    setinput('')

    // let response = await fetch(url)
    // let data = await response.json()
    // console.log(data)
    // setTemp(data.main.temp)
    // seticon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    

  }
  const fetchWeather= async()=>{
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    setTemp(data.main.temp)
    seticon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    setFeelsLike(data.main.feels_like)
    setHumidity(data.main.humidity)
    setwindSpeed(data.wind.speed)
    setCountry(data.sys.country)
    
  }
  useEffect(()=>{
    fetchWeather()
  },[handleclick])


  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="weatherapp ">
        <div className="d-flex justify-content-center m-3 gap-2">
          <input className="rounded border-0 ps-2" placeholder={city} value={input} onChange={(e)=>handleChnage(e)}/>
          <button className="rounded border-0" onClick={handleclick}>Search</button>
        </div>
        <div className="middle">
        <img  src={icon} />
        <p className="temp">{temp.toFixed(0)}°C</p>
        <p style={{textAlign:"center"}}>feels like {feelsLike.toFixed(0)}°C </p>
        <p className="city">{city}, {country}</p>
        </div>
        <div className="d-flex justify-content-between p-5">
            <div className="d-flex gap-3">
                <div>
                <img src={humid}/>
                </div>
                <div>
                    <p className="fw-bold">{humidity}% </p>
                    <p>Humidity</p>
                    </div>
            </div>
            <div className="d-flex gap-3">
                <div>
                <img src={windflow}/>
                </div>
                <div>
                    <p className="fw-bold">{windSpeed} km/hr</p>
                    <p>Wind Speed</p>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
