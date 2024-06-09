import { Sequelize } from "sequelize";
import { createUtenteModel } from "./Utente.js";
import 'dotenv/config.js'; //read .env file and make it available in process.env

// Inizializzare la connessione al database
export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

// Creare il modello Utente
createUtenteModel(database);
export const {Utente} = database.models;


// Definire altre associazioni se necessario
// Esempio:
// Utente.hasMany(Post);
// Post.belongsTo(Utente);

// Sincronizzare lo schema (creare tabelle mancanti)
database.sync({ force: true }).then(() => {
    console.log("Tutte le tabelle sono state eliminate e ricreate correttamente");
}).catch(err => {
    console.error("Errore durante la sincronizzazione del database: " + err.message);
});

