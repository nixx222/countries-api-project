import { Link } from "react-router-dom";

function SavedCountries() {
  const countries = [
    { id: 1, name: "France" },
    { id: 2, name: "Japan" },
  ];

  return (
    <div>
      <h1>Saved Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <Link to={`/country-details/${country.id}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedCountries;
