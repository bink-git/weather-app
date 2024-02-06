import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { getName } from 'country-list';

const SearchCity = ({ newCities, setCity, searchCity, setCountry }) => {
  const handleOnSelect = (item) => {
    setCity(item.name);
    setCountry(item.country);
  };

  const formatResult = (item) => {
    const country = getName(item.country);

    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.name}, {country}
        </span>
      </>
    );
  };

  return (
    <div className="search">
      <p className="form-title">Please, enter your city</p>
      <div>
        <ReactSearchAutocomplete
          items={newCities}
          onSelect={handleOnSelect}
          autoFocus
          formatResult={formatResult}
          resultStringKeyName="name"
          styling={{
            maxWidth: '400px',
          }}
        />
      </div>
      <button onClick={searchCity}>Search</button>
    </div>
  );
};

export default SearchCity;
