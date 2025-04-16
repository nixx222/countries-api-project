import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect

const CountryDetails = ({ countryCall }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  // State to store the visit count
  const [visitCount, setVisitCount] = useState(0);


  const saveCountry = async (country) => { 
    console.log('this is country', country);
    let myObj = {cca3: country.cca3, 
      countryName: country.name.common
      }
      console.log("this is myObj", myObj);
    // Retrieve the existing saved countries from database
      const response = await fetch("/api/add-country", {
        method: "POST",
        body: JSON.stringify(myObj),
        headers: { "Content-Type": "application/json" },
      }
    );
      console.log("Here is the data from savedCountries", response);
    //be sure to include the keys for the key value pairs. 
      //the backend needs specific objects with specific keys: Ex in the body include the 
      //cca3 + countryName
      }
    
console.log('this is countryCall', countryCall);



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