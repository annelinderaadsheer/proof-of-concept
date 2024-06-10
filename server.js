console.log('Hier komt je server voor Sprint 12.')
/*** Express setup & start ***/

// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Declare de base URL van de directus API
const baseUrl = "https://fdnd-agency.directus.app/items";

// Maak een nieuwe express app aan
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Fetch de data van de API
const fetchFromApi = (endpoint) => {
  return fetchJson(baseUrl + endpoint).then((response) => response.data);
};

// Data ophalen van de API
// fetchData().then((allAdvertisementsData) => {

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// GET-routes

// GET-route voor de index homepagina
app.get("/", function (request, response) {
  response.render("index.ejs");
});

// GET-route voor overzicht agencies pagina
app.get("/agencies ", function (request, response) {
  response.render("agencies");
});

// GET-route voor vacatures, eigen data inladen 
app.get("/vacatures", function (request, response) {
  fetchJson(baseUrl + "/dda_agencies_vacancies").then(
    (apiData) => {
      {
        response.render("vacatures.ejs", { data: apiData.data });
      }
    }
  );
});

// Poortnummer instellen waarop Express moet luisteren
app.set("port", process.env.PORT || 8000);

// Start express server op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
