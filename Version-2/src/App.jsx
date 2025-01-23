import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "../../Version-1/src/pages/SavedCountries/SavedCountries.jsx";
import Header from "./components/Header.jsx"; // Importing the Header component
import { useState, useEffect } from "react";
import backupData from '../jsconfig.json'; // Adjust the path as needed




const App = () => {
  const [countryCall, setCountryCall] = useState([]);
  const [savedCountries, setSavedCountries] = useState([]);
  const [error, setError] = useState(false); // To manage the error state

  const getCountryData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      })
      .then((data) => {
        setCountryCall(data);
        setError(false); // Reset error state on successful fetch
      })
      .catch((error) => {
        console.log("Error fetching from API, using backup:", error.message);
        setCountryCall(backupData); // Use backup data if API fails
        setError(true); // Set error state to true
      });
  };

  useEffect(() => {
    getCountryData(); // Call the function to fetch country data
  }, []);

  useEffect(() => {
    const storedCountries = localStorage.getItem("savedCountries");
    if (storedCountries) {
      setSavedCountries(JSON.parse(storedCountries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCountries", JSON.stringify(savedCountries));
  }, [savedCountries]);

  return (
    <div>
      <Header /> {/* Render Header */}
      {error && <p>There was an issue with the API, using backup data.</p>}
      <Routes>
        <Route path="/" element={<Home countryCall={countryCall} />} />
        <Route
          path="/saved-countries"
          element={<SavedCountries countryCall={countryCall} />}
        />
        <Route
          path="/country/:alpha3Code"
          element={<CountryDetails countryCall={countryCall} />}
        />
      </Routes>
    </div>
  );
};

export default App;