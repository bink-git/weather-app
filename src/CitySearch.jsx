import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const CitySearch = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=6d0c694d48573d4cf670244cd6870ab3`
    );
    return response.data.list.map((city) => city.name);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion;
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const inputProps = {
    placeholder: 'Type a city name',
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default CitySearch;
