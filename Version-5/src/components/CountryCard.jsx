// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getDatabase, ref, set, onValue } from "firebase/database";

const CountryCard = ({ countryCall }) => {
  // const db = getDatabase();
  // const countryId = countryCall.cca3; // Use the country's cca3 code as the unique ID

  // State to hold the click count for the country
  // const [clickCount, setClickCount] = useState(0);

  // // Function to handle "View Details" click
  // const handleViewDetails = () => {
  //   // Increment the click count locally
  //   const newCount = clickCount + 1;
  //   setClickCount(newCount);

  //   // Save the updated count to Firebase
  //   set(ref(db, 'counts/' + countryId), newCount);
  // };

  // // Listen for changes in the click count from Firebase
  // useEffect(() => {
  //   const countRef = ref(db, 'counts/' + countryId);
  //   onValue(countRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       setClickCount(data);
  //     }
  //   });
  // }, [db, countryId]);

  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={countryCall.flags.png} alt="The official Flag" />
        <p>{countryCall.name.common}</p>
        <p>{countryCall.population}</p>
        <p>{countryCall.region}</p>
        <p>{countryCall.capital}</p>
        {/* Display the click count */}
        <p>Clicks: {clickCount}</p>
        {/* Add a link to navigate to the CountryDetails page */}
        <Link to={`/country/${countryCall.cca3}`} onClick={handleViewDetails}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;