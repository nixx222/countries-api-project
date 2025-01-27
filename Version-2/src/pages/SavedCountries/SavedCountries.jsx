import { useState, useEffect } from "react";
import "./SavedCountries.css";

const SavedCountries = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: "",
  });

  const [savedCountries, setSavedCountries] = useState([]);

  console.log("hello");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("profile", JSON.stringify(formData));
    console.log("Profile saved:", formData);
  };

  useEffect(() => {
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    }

    // Load saved countries from localStorage and update state
    const storedCountries = localStorage.getItem("savedCountries");

    console.log("Where are youuuuu", storedCountries);

    if (storedCountries) {
      const countries = JSON.parse(storedCountries);
      setSavedCountries(countries); // Set the state to saved countries

      console.log("Loaded countries from localStorage:", countries); // Debug log
    }
  }, []);

  return (
    <div className="saved-countries">
      <div className="container">
        {/* Section for saved countries */}
        <h1 className="section-title">My Saved Countries</h1>
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
