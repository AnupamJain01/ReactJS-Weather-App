import React, { useState } from "react"
import "./weather.css"

import DisplayWeather from "./DisplayWeather"

function Weather() {
  const [weather, setWeather] = useState([])
  const [form, setForm] = useState({
    city: "",
  })

  const APIKEY = "SAMPLE API KEY"

  async function weatherData(e) {
    e.preventDefault()
    if (form.city === "") alert("Please Enter City Name")
    else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data)
      setWeather({
        data: data,
      })
    }
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === "city") {
      setForm({ ...form, city: value })
    }
  }

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  )
}
export default Weather
