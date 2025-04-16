import { useState, useEffect } from "react";
import "./SavedCountries.css";

const SavedCountries = (props) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  const [savedCountries, setSavedCountries] = useState([]);

  const [userProfile, setUserProfile] = useState("");

 
  const handleInputChange = (event) => {
    const { name, value } = event.target; //what does name represent here?: When a user enters anything into the "input" or "text" field (that's the "event")  "event delegation.
    setFormData((prevData) => ({ ...prevData, [name]: value })); //what is prevData? Previous data? Why are there three periods... (Taking the previous data, making a new object with all of the new data that was inputted by the user)
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //preventing the page from refreshing and going back to what it was before ?
    updateUserProfile();
    console.log("Profile saved:", formData); //putting the data from the form into the console log, and letting me know that the profile was saved.
  };

  const getStoredProfile = async () => {
    //Getting stored user profile info to see if we need to put a form for new user or
    const response = await fetch("/api/get-user");
    const data = await response.json();
    console.log("here is the data from getStoredProfile", data);
    setUserProfile(data.username);
  };

  const updateUserProfile = async () => {
    const response = await fetch("/api/submit-user-info", {
                          method: "POST",
                          body: JSON.stringify( //this is where we pass in whatever data we want to send to the back end. 
                            {username: formData.fullName,
                            email: formData.email,
                            country: formData.country,
                            bio: formData.bio,
                          }

                          ),
                          headers: { //this is for any additional info needed for the post. Here, you tell the backend what kind of data we're sending. 
                            //The key is the type of content, the value is the application/json data.
                            "Content-Type": "application/json",
                          }
    });
    const data = await response.json();
  }
 

  // Do the same thing, but displaying the Country cards for any saved countries that have been added to the database
  // - Call a function that gets all of the saved countries
  // - get the data from the back end
  // - Store it in State
  // - Display it to the user.
  // - Map out the countries to display the cards

  // - Call the countries rest API to get the list of all of the countries
  // - filter out the countries that do not match what is in the database for the user
  // - Once you use filter out what the user has saved, pass it into the "setSavedCountries" function and store it in the State.

  const retrieveSavedCountries = async () => {
    const response = await fetch("/api/get-saved-countries");
    const data = await response.json();
    

    let loopedResults = [];

    //This is a nested for loop. It first runs through the first for loop, compares what is there to the second for loop, and then saves the results in a new array.
    for (let i = 0; i < data.length; i++) {
      //data.length is the entirety of the user's saved countries. Each iteration, we incriment by 1.
        let backEndSavedCountry = data[i];

      for (let j = 0; j < props.countryCall.length; j++) {

        let apiCountryCallResults = props.countryCall[j];
  
        //props.countrycall.length is the entirety of the countries rest API
         if (backEndSavedCountry.country_name === apiCountryCallResults.name.common) {
              loopedResults.push(apiCountryCallResults);
        }
      }
    } //Create an if then statement for if they match, then put those in a new array.
    // country.name.common
    setSavedCountries(loopedResults);
  };

  useEffect(() => {
    getStoredProfile();
    if (props.countryCall) {
      retrieveSavedCountries();
      
    }
    console.log(props.countryCall);
    // Load profile data from localStorage
    // const storedProfile = getStoredProfile();
    // if (storedProfile) {
    //   setFormData(JSON.parse(storedProfile));
    // }

    // // Load saved countries from localStorage and update state
    // const storedCountries = localStorage.getItem("savedCountries");

    // console.log("Where are youuuuu", storedCountries);

    // if (storedCountries) {
    //   const countries = JSON.parse(storedCountries);
    //   setSavedCountries(countries); // Set the state to saved countries

    //   console.log("Loaded countries from localStorage:", countries); // Debug log
    // }
  }, [props.countryCall]);

  return (
    <div className="saved-countries">
      <div className="container">
        {/* Section for saved countries */}
        <h1 className="section-title">My Saved Countries</h1>
        <p>Welcome {userProfile}</p>
        <div className="countries-container">
          {savedCountries.length > 0 ? (
            savedCountries.map((country, index) => (
              <div key={index} className="country-card">
                <h2>{country.name.common}</h2>
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="country-flag"
                />
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital?.[0] || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No countries saved yet.</p>
          )}
        </div>

        {/* Section for user profile */}
        <h1 className="section-title">My Profile</h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavedCountries;
