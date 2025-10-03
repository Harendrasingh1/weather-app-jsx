import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine.jsx";
import Forecast from "./Forecast.jsx";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  // NEW FEATURE: Fetch weather data by coordinates (latitude and longitude)
  // This function is used when user clicks "Use My Current Location" button
  const fetchWeatherByCoords = async (lat, lon) => {
    setWeather({ ...weather, loading: true });
    const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
    // Use coordinates instead of city name in API call
    const url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
    try {
      const res = await axios.get(url);
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log("error", error);
    }
  };

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
    return date;
  };

  //new search function
  const search = async (event) => {
    event.preventDefault();
    // IMPROVED: Added try-catch for better error handling
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
      try {
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    // DEFAULT CITY CHANGED: Set default city to "Agra" instead of "Rabat"
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      // CHANGED: Default city is now Agra
      const url = `https://api.shecodes.io/weather/v1/current?query=Agra&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">

      {/* SearchEngine component */}
      {/* UPDATED: Added fetchWeatherByCoords prop for location-based weather */}
      <SearchEngine query={query} setQuery={setQuery} search={search} fetchWeatherByCoords={fetchWeatherByCoords} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <div className="error-message" style={{ 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '8px',
            margin: '20px',
            color: '#c62828'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏙️❌</div>
            <h3 style={{ margin: '10px 0', color: '#c62828' }}>No City Found</h3>
            <p style={{ fontFamily: "font", margin: '10px 0' }}>
              Sorry, we couldn't find weather data for "{query}".
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Please check the spelling or try searching for a different city.
            </p>
          </div>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        // Forecast component
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;