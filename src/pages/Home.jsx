import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";

function Home({countryCall}) {
    

  return (
    <>
     {/* Search Bar */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search for a country..."
          style={{
            width: "35%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          />
    </div>
    {countryCall.map((country) => (

        <CountryCard countryCall = {country} />

      ))}
    </>
  );
}

export default Home;


    