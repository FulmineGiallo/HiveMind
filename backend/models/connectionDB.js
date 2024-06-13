import { Sequelize } from "sequelize";
import { createUtenteModel } from "./Utente.js";
import 'dotenv/config.js'; //read .env file and make it available in process.env
import { createIdeaModel } from "./Idea.js";

// Inizializzare la connessione al database
export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

// Creare il modello Utente
createUtenteModel(database);
createIdeaModel(database);
export const {Idea} = database.models;
export const {Utente} = database.models;


Utente.hasMany(Idea);
Idea.belongsTo(Utente);
// Post.belongsTo(Utente);

// Sincronizzare lo schema (creare tabelle mancanti)
database.sync({ alter: true }).then(() => {
    console.log("Tutte le tabelle sono state sincronizzate correttamente");
}).catch(err => {
    console.error("Errore durante la sincronizzazione del database: " + err.message);
});

