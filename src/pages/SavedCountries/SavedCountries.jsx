import { Link } from "react-router-dom";
import React from "react";
import "./SavedCountries.css";


const SavedCountries = () => {
    return (
      <div className="saved-countries">
  
        {/* Main Container */}
        <div className="container">
          {/* My Saved Countries Section */}
          <h1 className="section-title">My Saved Countries</h1>
          <div className="countries-container">
            
          </div>
  
          {/* My Profile Section */}
          <h1 className="section-title">My Profile</h1>
          <form className="profile-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" placeholder="Full Name" />
            </div>
  
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" />
            </div>
  
            {/* Country */}
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" placeholder="Country" />
            </div>
  
            {/* Bio */}
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" placeholder="Tell us about yourself" rows="4"></textarea>
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
