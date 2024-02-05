import { ReactSearchAutocomplete } from 'react-search-autocomplete';
const SearchCity = ({ newCities, setCity, searchCity }) => {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setCity(item.name);
    console.log(item);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    );
  };

  return (
    <div className="search">
      <p className="form-title">Please, enter your city</p>
      <div>
        <ReactSearchAutocomplete
          items={newCities}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
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
