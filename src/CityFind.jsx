import React, { useState, useEffect } from 'react';
import FuzzySearch from 'fuzzy-search';
import cities from 'cities.json';

const CityAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);

  useEffect(() => {
    // Transform the cities data to an array of strings (city names)
    const cityNames = cities.map((city) => city.name);

    setCitiesData(cityNames);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Create a fuzzy search instance
    const searcher = new FuzzySearch(citiesData);

    // Perform a fuzzy search
    const searchResults = searcher.search(value);

    // If no exact match is found, suggest 10 similar cities
    // if (searchResults.length === 0) {
    //   const similarCities = citiesData.slice(0, 10);
    //   setSuggestedCities(similarCities);
    // } else {
    //   // If an exact match is found, clear the suggestions
    //   setSuggestedCities([]);
    // }

    const similarCities =
      searchResults.length === 0 ? citiesData.slice(0, 5) : [];

    setSuggestedCities(similarCities);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type a city name..."
      />
      <ul>
        {suggestedCities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityAutocomplete;
