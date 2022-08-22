# DistanceApp

This is the code for the frontend part of the Bain & Company Recruiting Case.

This app takes two string inputs about two addresses and returns the distance between those two locations using the latitude and longitude of the identified locations.

This app was built using the Angular framework, and is hosted at Firebase as https://distance-queries-2fa7c.web.app/

The backend was built using Spring Boot and Java and was deployed at Heroku as https://distance-queries-prod.herokuapp.com/api/userQueries/ . For more details about the backend, check https://github.com/alveshenrique/distance-queries-prod

To run this code locally, change the variable backendAPIUrl to "http://localhost:5000/api/userQueries/" (file \src\appzapp.component.ts), then run (npm and angular cli installed are necessary):

ng serve

Also, on the root of the backend code located at https://github.com/alveshenrique/distance-queries-prod , run (Maven necessary):

mvn spring-boot:run

So that you will be hosting the backend at your local machine. The database is already hosted at AWS, so no need to have MySQL installed (but this way, both the production and development DBs are the same DB).

