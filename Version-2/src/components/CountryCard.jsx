import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ countryCall }) => {
  // Function to handle "View Details" click
  const handleViewDetails = () => {
    // Retrieve the current counts from local storage
    const counts = JSON.parse(localStorage.getItem("countryCounts")) || {};

    // Increment the count for the clicked country
    const countryId = countryCall.cca3; // Use the country's cca3 code as the unique ID
    counts[countryId] = (counts[countryId] || 0) + 1;

    // Save the updated counts back to local storage
    localStorage.setItem("countryCounts", JSON.stringify(counts));
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={countryCall.flags.png} alt="The official Flag" />
        <p>{countryCall.name.common}</p>
        <p>{countryCall.population}</p>
        <p>{countryCall.region}</p>
        <p>{countryCall.capital}</p>
        {/* Add a link to navigate to the CountryDetails page */}
        <Link to={`/country/${countryCall.cca3}`} onClick={handleViewDetails}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;