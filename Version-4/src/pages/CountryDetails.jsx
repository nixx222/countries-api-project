import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";

const CountryDetails = ({ countryCall }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);
  const db = getDatabase();

  // State to store saved countries
  const [savedCountries, setSavedCountries] = useState([]);

  // State to store the click count for the current country
  const [clickCount, setClickCount] = useState(0);

  // Retrieve saved countries from Firebase when the component mounts
  useEffect(() => {
    const savedCountriesRef = ref(db, "savedCountries");
    onValue(savedCountriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setSavedCountries(data);
      }
    });
  }, [db]);

  // Retrieve the click count for the current country from Firebase
  useEffect(() => {
    const clickCountRef = ref(db, `counts/${alpha3Code}`);
    onValue(clickCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setClickCount(data);
      } else {
        setClickCount(0); // Default to 0 if no count exists
      }
    });
  }, [db, alpha3Code]);

  if (!country) {
    return <p>Country not found!</p>;
  }

  const saveCountry = (country) => {
    // Check if the country is already saved
    const isCountryAlreadySaved = savedCountries.some(
      (savedCountry) => savedCountry.cca3 === country.cca3
    );

    if (isCountryAlreadySaved) {
      console.log("Country is already saved:", country.name.common);
      return; // Exit the function if the country is already saved
    }

    // Add the new country to the array
    const updatedSavedCountries = [...savedCountries, country];

    // Save the updated array to Firebase
    set(ref(db, "savedCountries"), updatedSavedCountries)
      .then(() => {
        console.log("Country saved to Firebase:", country.name.common);
      })
      .catch((error) => {
        console.error("Error saving country to Firebase:", error);
      });
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
        {/* Display the click count */}
        <p className="click-count">This country has been viewed {clickCount} times.</p>
        <button onClick={() => saveCountry(country)} className="save-button">
          Save Country
        </button>
      </div>
    </div>
  );
};

export default CountryDetails;