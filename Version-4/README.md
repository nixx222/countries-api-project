# Version 4

Countries- API Project Folder 
- version-1
- version-2
- version-3
- version-4
- server

- Database - (Laura likes to start with the database so she can use Postman to ensure it's working.)
1. Create the table schema for the tables that I will need in my databse. 
    1. saved_countries, users, country_count (Those are the tables, check to see how I set mine up)
    2. I can reference my airtable project for the table structure + data types. 
(CREATE TABLE commands, listing the columns + data types)
2. Connect to our local database using PGadmin
3. Run the commands to create our data tables. 


- Web Server/API
X. Create a webserver folder inside the root countries-API folder, called 'server'
X. Inside the 'server' folder, create the web server instance:
    1. Adding NPM = package. json, installing express, installing pg, adding .gitignore, adding the src folder (see full list in ________)
    // Steps for creating a Node/Express server
            X 1. In your project folder, run npm init
            X 2. Install express by running npm install express
            X 3. Add a .gitignore to our project for the node_modules
            X 4. Create a src folder to hold our custom JS code, create a index.js file to store all of our web server code.
            X 5. Add all of your import statements (3rd party modules, Node modules, your custom modules)
            X 6. Add the "boilerplate" code for Express, creating the instance, adding the port, adding the listener
            X 7. Add API endpoints + helper functions

X. Add the config file to connect to our database (same one used in our programming_languages in our ________)
X Build our express app (in our index.js file), starting with our imports and the Express boilerplate code. 
X Reference our API endpoint document (that we created that listed out the different API endpdoints) create the endpoints and helper functions for each user action. POST - user submit form, POST - user adds a saved country, GET- get user data, POST - updates country count for each country. Be sure to have an API request for each of these user actions. 
X. Test your endpoints using Postman (Optional) Ex: If I'm submitting the users info, you can send it in postman as a JSON object, and when you're running your server locally, ensure the user data has been added as a new row of data in the database. (You can check this by clicking "View All Data in PGAdmin).
- Add "Welcome _______ " To the saved Countries.jsx page
X Create an If/then if user info is there _____ then _____ "Welcome {user name}" 
- Do the same thing, but displaying the Country cards for any saved countries that have been added to the database
- Call a function that gets all of the saved countries
- get the data from the back end
- Store it in State
- Display it to the user.
- Map out the countries to display the cards
- Call the countries rest API to get the list of all of the countries
- filter out the countries that do not match what is in the database for the user
- Once you use filter out what the user has saved, pass it into the "setSavedCountries" function and store it in the State.
- Make country cards clickable and lead to country details on the saved counreis page 
- Display none to the profile form once the user is available and displaying "welcome _______"
- 
if not then _________ 

- Run node index.js in src folder 
- Open Postman 
- 

- Frontend 
1. Refactor the code (either local storage or Firebase) so that the user actions are tied to calling an API fetch request to the "localhost:3000/end-point". Ex: in the form component, you have an onsubmit where the user adds their user profile infor - you'd want to use a fetch - localhost:3000/add-user-profile to send user profile data. * Do this everywhere the user interacts with website: All POSTS and GET requests. 
2. If you get to this step and you're seeing a "CORS" issue in the console, reach out to Laura, she will help trouble shoot 






4/14/25

Data: 3 types

Saved Countries:
    Get all Saved Countries - Done [Saved Countries JSX]
    Post A new Saved Country - Done. [Country Details JSX]
User Form:
    Get User Form - Complete (I believe) [Saved Countries JSX]
    Post User Form - Complete.
Country Count:
    When you load a page, you show it's count, + update by 1.
    Getting + Posting in the same function. 

Step 1: Survey all of the work done so far.
    As I'm surveying, look through these steps for the 3 pieces of data for what I have done and what needs to be done next.
Step 2: Decide which data type I want to work on next. (Ex Saved Countries: Post.)


