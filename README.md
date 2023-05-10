# Country API

Country API is a RESTful API which allows for the retrieval and manipulation
of country (and territory) data.

Specifically, each Country entry has the following properties:

<ul>
  <li><b>id</b>: ISO code for the country</li>
  <li><b>names</b>: names for the country</li>
  <li><b>languages</b>: commonly-spoken languages for the country</li>
  <li><b>regions</b>: world regions in which the country is located</li>
  <li><b>orgs</b>: world organizations of which the country is a member</li>
  <li><b>population</b>: the country's population (latest available as of early 2023)</li>
  <li><b>gdp</b>: the country's GDP (latest available as of early 2023)</li>
  <li><b>flag</b>: image of the country's flag (or blank placeholder if none is available)</li>
</ul>

Requests which insert, update, or delete Country data are protected by JWT user authentication.<br/>
Requests which view, insert, or delete User data are protected by additional admin user permissions.

The main module for the application is <i>server.js</i>

# Documentation

For full documentation of the endpoints, requests, parameters, and responses,
see the documentation page at https://country-api.glitch.me/docs/

The API is currently hosted on <i>glitch.com</i> and accepts requests. You can try out sending
requests from the documentation page by clicking on a request, then clicking <i>Try it out</i>.
Simply provide any needed parameters, then click <i>Execute</i> to view the response.

### Rate Limiting

Each IP is limited to 100 requests per 15 minutes

# Install

If you would like to set up your own version of this API:<br/>

<ul>
<li>Clone or download the repository at https://github.com/asafhod/country-api</li>
<li>Navigate to the root directory, and run <i>npm install</i> to install the node modules</li>
<li>You will need to set up your own MongoDB database cluster so you can store the
Country and User data</li>
<li>You will also need to create a <i>.env</i> file in the root directory with the following
environment variables:

<ul>
    <li><b>MONGODB_URI</b>: The connection URI for MongoDB (including username and password)</li>
    <li><b>JWTSECRET</b>: The secret string for signing/verifying JWT authentication tokens</li>
    <li><b>JWT_LIFETIME</b>: The time before JWT authentication tokens expire</li>
    <li><b>SERVER_URL</b>: The URL for the server. Can be <i>http://localhost</i> when hosting locally
                 or the hosting server's URL in Production.</li>
    <li><b>PORT</b>: The port to use on the local or Production server. Leaving this blank will default the port to <i>3000</i>.</li>
</ul>
</li>
<li>Before you can populate the database, you will need to be registered as an admin user. To set this up:
<ul>
<li>Temporarily disable the <i>auth.js</i> and <i>checkAdmin.js</i> middleware</li>
<li>Run the app, and use the <b>Register User</b> request to add a new user</li>
<li>Access your MongoDB cluster. Find the user you just added in the <i>Users</i> collection, and change its admin property to <i>true</i>.</li>
<li>Re-enable the <i>auth.js</i> and <i>checkAdmin.js</i> middleware and restart the app. <b>Note</b>: This is a one-time process. Once you have added the
initial admin user, you can register additional users after logging in through the API.</li>
<li>Now that the admin user is in place, use the <b>Log In</b> request to receive an authentication bearer token</li>
<li>Use this token in the <i>Authorization</i> header for any of the requests which require authentication</li>
</ul>
</li>
<li>Use the <b>Insert Multiple Countries</b> request to populate the database with the country data from
the <i>country-data-backup.json</i> file in the <i>assets</i> folder</li>
<li>The API is now set up and ready for requests</li>
</ul>

# Running the App

If you have installed the API locally, navigate to the root directory and run:

    npm start

If you have also installed nodemon and would like the app to restart automatically
whenever you make changes, run:

    npm run dev
