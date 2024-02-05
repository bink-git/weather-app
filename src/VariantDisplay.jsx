import React, { useState } from 'react';
import cities from 'cities.json';

const VariantDisplayComponent = () => {
  console.log(cities);
  const [inputValue, setInputValue] = useState('');
  // const variants = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

  const filteredVariants = cities.filter((variant) =>
    variant.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const selectVariant = (variant) => {
    setInputValue(variant);
  };

  return (
    <div>
      <label htmlFor="inputField">Type in:</label>
      <input
        type="text"
        id="inputField"
        value={inputValue}
        onChange={handleInputChange}
      />

      <ul>
        {filteredVariants.map((variant, index) => (
          <li
            key={index}
            className="variant-item"
            onClick={() => selectVariant(variant)}
          >
            {variant}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariantDisplayComponent;
