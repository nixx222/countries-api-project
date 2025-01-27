import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'; 

const CountryDetails = ({ countryCall, savedCountries, setSavedCountries }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  if (!country) {
    return <p>Country not found!</p>;
  }

  const saveCountry = (country) => {
    if (Array.isArray(savedCountries) && !savedCountries.some((saved) => saved.cca3 === country.cca3)) {
      setSavedCountries((prev) => {
        const updatedCountries = [...prev, country];
        localStorage.setItem("savedCountries", JSON.stringify(updatedCountries)); // Save updated array to localStorage
        console.log("Saved countries to localStorage:", updatedCountries); // Debug log
        return updatedCountries;
      });
      console.log(`${country.name.common} saved!`);
    } else if (!Array.isArray(savedCountries)) {
      console.error("savedCountries is not defined or not an array.");
    } else {
      console.log(`${country.name.common} is already saved.`);
    }
  };
  

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Back
      </button>
      <div className="flexcard">
        <h1 className="country-name">{country.name.common}</h1>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <p className="population">Population: {country.population}</p>
        <p className="region">Region: {country.region}</p>
        <p className="capital">Capital: {country.capital}</p>
        <button onClick={() => saveCountry(country)} className="save-button">
          Save Country
        </button>
      </div>
    </div>
  );
};

export default CountryDetails;
