const CountryDetails = ({ countryCall, savedCountries, setSavedCountries }) => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();
  const country = countryCall.find((c) => c.cca3 === alpha3Code);

  if (!country) {
    return <p>Country not found!</p>;
  }

  // Function to save the country
  const saveCountry = (country) => {
    if (!savedCountries.some((saved) => saved.cca3 === country.cca3)) {
      setSavedCountries((prev) => [...prev, country]);
      console.log(`${country.name.common} saved!`);
    } else {
      console.log(`${country.name.common} is already saved.`);
    }
  };

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
        <button
          onClick={() => saveCountry(country)}
          className="save-button"
        >
          Save Country
        </button>
      </div>
    </div>
  );
};

export default CountryDetails; // This is a default export
