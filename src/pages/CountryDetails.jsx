import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const CountryDetails = ( {countryCall} ) => {
  const { alpha3Code } = useParams(); // Extract the dynamic parameter from the URL
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  if (!country) {
    return <p>Country not found!</p>;
  }

  return (
    <div>
        <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Back
      </button>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital}</p>
    
    </div>
  );
};

export default CountryDetails;
