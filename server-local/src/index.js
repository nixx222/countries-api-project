import express from "express"; //external module for using express
import pg from "pg";
const { Client } = pg;
import config from "./config.js"; // internal module for connecting to our config file

//boiler plate express code which allows us to run our web server
const app = express();
const port = 3000;

//we're using json as our data format
app.use(express.json());

//config is saying "this is how we connect to our database", and now I need tools.

//Always connect to the database, give the code, then close the database or else it will time out.

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//Helper Functions

//Get User
async function getUser() {
  const client = new Client(config);

  try {
    await client.connect();
    const result = await client.query(
      "SELECT * FROM user_profile WHERE user_id = 1"
    );

    console.log("Query Result:", result.rows); // Logs full result for debugging

    if (!result.rows.length) {
      console.log("No users found");
      return { message: "No users found" }; // Return structured message instead of undefined
    }

    return result.rows[0]; // Return the first user (if found)
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Internal Server Error" }; // Return an error object instead of crashing
  } finally {
    await client.end(); // Ensure client disconnects
  }
}
// async function getUser() {
//   return {
//       id: "12345",
//       name: "John Doe", // Placeholder name
//       savedCountries: [], // Starts empty
//   };
// }

//Saved Country /
async function addOneCountry(obj) {
  console.log('this is obj', obj);
  //obj is the carrier or bucket that carries the users data. In this case, it is the country they are wanting to add. It coorelates with line 74 req.body. obj = equation req.body = values replaced in the equation.
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  await client.query(`INSERT INTO saved_countries (cca3, user_id, country_name)
  SELECT '${obj.cca3}', 1, '${obj.countryName}'
  WHERE NOT EXISTS (
    SELECT 1 FROM saved_countries 
    WHERE cca3 = '${obj.cca3}' AND user_id = '1')`);
  await client.end();
}

// Submit User Info
async function submitUserInfo(obj) {
  //obj is the carrier or bucket that carries the users data. In this case, it is the country they are wanting to add. It coorelates with line 74 req.body. obj = equation req.body = values replaced in the equation.
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  await client.query(`INSERT INTO user_profile (username, email, country, bio) 
  VALUES ('${obj.username}', '${obj.email}', '${obj.country}', '${obj.bio}')`);
  await client.end();
}

// Get Saved Countries
async function getSavedCountries() {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    "SELECT country_name FROM saved_countries WHERE user_id = 1"
  );
  console.log(result.rows);
  await client.end();
  return result.rows;
}

// Update Country Click
async function updateClickTotal(country) {
  //obj is the carrier or bucket that carries the users data. In this case, it is the country they are wanting to add. It coorelates with line 74 req.body. obj = equation req.body = values replaced in the equation.
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  const result = await client.query(
    `INSERT INTO country_count (cca3, click_amount) 
  VALUES ($1, 1)
  ON CONFLICT (cca3) 
  DO UPDATE SET click_amount = country_count.click_amount + 1
  RETURNING click_amount`,
    [country]
  );
  await client.end();
  return result.rows
}

////////////////////////////////////////////////////////////////

//API Endpoints

// //Get Request to get User
// app.get("/get-user", async (req, res) => {
//     let user = await getUser();
//     res.json(user);
// });
// Saved Countries Page (COMPLETE)
app.get("/get-user", async (req, res) => {
  let user = await getUser();
  res.json(user);
});

//Adds a users saved country - On Country Details Page
app.post("/add-country", async (req, res) => {
  console.log('this is request', req.body);
  await addOneCountry(req.body);
  res.send("Yay! You added a country!"); //send a response to the front end
});

//Submit User Info - Saved Countries Page (NEXT)
app.post("/submit-user-info", async (req, res) => {
  await submitUserInfo(req.body);
  res.send("Yay! Your info has been submitted!"); //send a response to the front end
});

//Get saved countries - Saved Countries Page (COMPLETE)
app.get("/get-saved-countries", async (req, res) => {
  let user = await getSavedCountries();
  res.json(user);
});

//Update Country Clicks - On Country Details Page
app.get("/country-clicked/:country", async (req, res) => {
  let country = req.params.country;
  console.log("this is req.params.country", req.params.country);
  let clickTotal = await updateClickTotal(country);
  let JSONclickTotal = JSON.stringify(clickTotal);
  res.send(JSONclickTotal);
});

//Refactor the add one language into a function that allows to to save one country.
// I can follow the same process for the other API end points and helper functions as well.
