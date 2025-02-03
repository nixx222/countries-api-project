import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect

const CountryDetails = ({ countryCall }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  // State to store the visit count
  const [visitCount, setVisitCount] = useState(0);

  // Retrieve the visit count from local storage when the component mounts
  useEffect(() => {
    const counts = JSON.parse(localStorage.getItem("countryCounts")) || {};
    setVisitCount(counts[alpha3Code] || 0);
  }, [alpha3Code]);

  if (!country) {
    return <p>Country not found!</p>;
  }

  const saveCountry = (country) => {
    // Retrieve the existing saved countries from localStorage
    const savedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];

    // Check if the country is already saved
    const isCountryAlreadySaved = savedCountries.some(
      (savedCountry) => savedCountry.name.common === country.name.common
    );

    if (isCountryAlreadySaved) {
      console.log("Country is already saved:", country.name.common);
      return; // Exit the function if the country is already saved
    }

    // Add the new country to the array
    savedCountries.push(country);

    // Save the updated array back to localStorage
    localStorage.setItem("savedCountries", JSON.stringify(savedCountries));

    console.log("Saved countries to localStorage:", savedCountries); // Debug log
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
        {/* Display the visit count */}
        <p className="visit-count">This country has been viewed {visitCount} times.</p>
        <button onClick={() => saveCountry(country)} className="save-button">
          Save Country
        </button>
      </div>
    </div>
  );
};

export default CountryDetails;