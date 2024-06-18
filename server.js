console.log('Hier komt je server voor Sprint 12.');

/*** Express setup & start ***/

import express from "express";
import fetchJson from "./helpers/fetch-json.js";

const baseUrl = "https://fdnd-agency.directus.app/items";

const app = express();

// Middleware voor JSON en URL-encoded body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine instellen op EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Statische bestanden serveren vanuit de 'public' map
app.use(express.static("public"));

// Functie om data van de API op te halen
const fetchFromApi = (endpoint) => {
  return fetchJson(baseUrl + endpoint).then((response) => response.data);
};

// GET-route voor de homepagina
app.get("/", function (request, response) {
  fetchJson(baseUrl + "/dda_agencies_vacancies").then((apiData) => {
    response.render("index.ejs", { data: apiData.data });
  }).catch((error) => {
    console.error("Error fetching data:", error);
    response.status(500).send("Error fetching data");
  });
});

// GET-route voor de agencies pagina
app.get("/agencies", function (request, response) {
  fetchJson(baseUrl + "/dda_agencies").then((apiData) => {
    response.render("agencies.ejs", { data: apiData.data });
  }).catch((error) => {
    console.error("Error fetching data:", error);
    response.status(500).send("Error fetching data");
  });
});

// GET-route voor de vacatures pagina
app.get("/vacatures", function (request, response) {
  fetchJson(baseUrl + "/dda_agencies_vacancies").then((apiData) => {
    response.render("vacatures.ejs", { data: apiData.data });
  }).catch((error) => {
    console.error("Error fetching data:", error);
    response.status(500).send("Error fetching data");
  });
});

// Poortnummer instellen
const port = process.env.PORT || 8000;

// Server starten
app.listen(port, function () {
  console.log(`Application started on http://localhost:${port}`);
});
