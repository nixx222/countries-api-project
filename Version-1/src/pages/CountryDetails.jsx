import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CountryDetails.css"

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
      <div className="flexcard">
      <h1 className="country-name">{country.name.common}</h1>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <p className="population">Population: {country.population}</p>
      <p className="region" >Region: {country.region}</p>
      <p className="capital">Capital: {country.capital}</p>
      <p className="searched-for">Searched for:</p>
      </div>
    
    </div>
  );
};

export default CountryDetails;
