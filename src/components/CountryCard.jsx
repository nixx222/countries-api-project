import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ countryCall }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={countryCall.flags.png} alt="The official Flag" />
        <p>{countryCall.name.common}</p>
        <p>{countryCall.population}</p>
        <p>{countryCall.region}</p>
        <p>{countryCall.capital}</p>
        {/* Add a link to navigate to the CountryDetails page */}
        <Link to={`/country/${countryCall.cca3}`}>View Details</Link>
      </div>
    </div>
  );
};

export default CountryCard;
