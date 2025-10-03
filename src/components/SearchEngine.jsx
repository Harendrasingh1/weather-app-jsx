import React from "react";

function SearchEngine({ query, setQuery, search, fetchWeatherByCoords }) {
  //handler function
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(e);
    }
  };

  // NEW FEATURE: Use current location handler
  // Gets user's current location using browser's Geolocation API
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      // Request user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from position
          const { latitude, longitude } = position.coords;
          // Call the weather fetch function with coordinates
          if (typeof fetchWeatherByCoords === 'function') {
            fetchWeatherByCoords(latitude, longitude);
          }
        },
        (error) => {
          // Handle errors (user denied location, location unavailable, etc.)
          alert('Unable to retrieve your location. Please ensure location access is enabled.');
          console.log('Geolocation error:', error);
        }
      );
    } else {
      // Handle browsers that don't support geolocation
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={search}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
      {/* NEW FEATURE: Button to use current location for weather data */}
      <button onClick={handleUseLocation} style={{ marginLeft: '8px' }}>
        📍 Use My Location
      </button>
    </div>
  );
}

export default SearchEngine;