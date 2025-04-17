import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard'; // Adjust path if needed
import "../styles/Home.css";
import countryData from '../../data';

const Home = ({ countryCall }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryCall);

  //countryCall is the list of countries pulled from the API that will then be filtered as the user searches. 
  useEffect(() => {
    console.log("Here is the console log for countryCall", countryCall) 
    setFilteredCountries(
      countryCall.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, countryCall]);

  return (
    <>
      {/* Search Bar */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '35%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      
      {/* Display filtered country cards */}
      <div className="flexWrapper">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} countryCall={country} />
        ))}
      </div>
    </>
  );
};

export default Home;
