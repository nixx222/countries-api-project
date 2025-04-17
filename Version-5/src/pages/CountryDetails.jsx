import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect

const CountryDetails = ({ countryCall }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  // State to store the visit count
  const [visitCount, setVisitCount] = useState(0);

  const updateClickCountRequest = async () => { //assigning a variable to the value of an async function. Async, because we are using an API and we need to ensure all parts of the process are rendered at the correct time, or else it will cause bugs and the app will not render. (Ex: Playing music, needing rests + counts, etc. or Ex: The ball in the obstacle course that needs the correct timing for the event to take place. )
   const response = await fetch(`/api/country-clicked/${ alpha3Code }`) //I'm asssigning the variable response to the value of the action of fetching, "getting", or connecting to the back end via this API end point. The API endpoint is like the pathway or address that our little package or object of data, will need to follow in order to get to the correct location in the database. Similar to on Monsters inc how every door is located in a certain place and the key card calls that door, and knows where that door is located. 
   console.log('response', response); //I console logged the "response" variable  to see what data was fetched on the journey to the back end.
   const data = await response.json(); //I'm assigning the variable data to the value of "response", but translated into json. Only JSON can travel through the interwebs, so it needs to be converted back to data that the front end can use in order to show the user the data they are requesting. Ex: Willy Wonka wonka vision needed to break Mike TV down into particles floating above their heads, and rearranged back to the little screen in front of them.
   console.log('data', data); //Console logging to see whhat the value of data looks like. Hint: It's the number of times the coutry has been clicked.
   setVisitCount(data[0].click_amount); //I'm now calling the useState variable the store the specific data we need. It needed to be funneled down to the exact data, which is found by using bracket and dot notation, from the object that was sent from the backend database.
   }
   
  useEffect(() => {  //When the component renders, useEffect automatically runs. Because we can't use an async await within a use effect, since that is counter intuitive to what a useEffect is, we can call the variable updateClickCountRequest to run as soon as the component renders. Supposedly there are supposed to be two parts to a useEffect, the codeblock within the curly braces and the ....? paramaters? found in the square  brackets. I don't know what the square bracket is doing, but apparently it's necessary and the code won't run without it.
    updateClickCountRequest();
  },[]
);




 // I need a await fetch that uses my api endpoint
 // it needs to be a get request 
 //I need to call setVisitCount because that is what stores the information temporarily. 
 //



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