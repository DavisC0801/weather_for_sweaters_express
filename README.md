# Weather for Sweaters
An API for weather reports using Node.Js and Express.

## Setup

* Download this project into a working directory.

* Install the requirements using npm:
> npm install

  This will install the required pacakges for the project.

* Create and migrate the local database using sequelize:
> npx sequelize db:create
> npx sequelize db:migrate

* As an Express app, you are able to start the server using the following command:
> npm start

## Endpoints

The following endpoints are exposed on this API:

* /api/v1/users
* /api/v1/sessions
* /api/v1/forecast

#### /api/v1/users
This endpoint takes a post request, and a username, password and password confirmation in the body of the request. It returns a generated API key if the user is saved successfully, and an error message if not.

#### /api/v1/users
This endpoint takes a post request, and a username and password in the body of the request. It returns the saved API key if the user is successfully validated, and an error message if not.

#### /api/v1/forecast
This endpoint takes location as a query param, in the format of city,state. It returns current, hourly, and daily forecast information for the city.
