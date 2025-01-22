import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./SavedCountries.css";

const SavedCountries = () => {
  // Initialize state to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: ''
  });

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Update the specific field in the state
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Log the form data (or use it in your app)
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="saved-countries">
      {/* Main Container */}
      <div className="container">
        {/* My Saved Countries Section */}
        <h1 className="section-title">My Saved Countries</h1>
        <div className="countries-container">
          {/* You can display saved countries here */}
        </div>

        {/* My Profile Section */}
        <h1 className="section-title">My Profile</h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName" // Use the same name to link to state
              value={formData.fullName} // Bind to state
              onChange={handleInputChange} // Handle change
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Use the same name to link to state
              value={formData.email} // Bind to state
              onChange={handleInputChange} // Handle change
              placeholder="Email"
            />
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country" // Use the same name to link to state
              value={formData.country} // Bind to state
              onChange={handleInputChange} // Handle change
              placeholder="Country"
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio" // Use the same name to link to state
              value={formData.bio} // Bind to state
              onChange={handleInputChange} // Handle change
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavedCountries;
