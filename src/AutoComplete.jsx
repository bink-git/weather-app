import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import cities from 'cities.json';

// Your list of variants
// const variants = ['Variant 1', 'Variant 2', 'Variant 3', 'Kalush'];
const variants = cities.map((city) => city.name);

// Autosuggest input and suggestions
const AutocompleteComponent = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return variants.filter((variant) =>
      variant.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Type a variant',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={inputProps}
    />
  );
};

export default AutocompleteComponent;
