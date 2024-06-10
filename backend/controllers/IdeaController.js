import { Idea } from "../models/connectionDB.js";
import { Utente } from "../models/connectionDB.js";

export class IdeaController 
{
  static async getAllIdea() {
    return Idea.findAll({
      include: {
        model: Utente,
        attributes: ['username'] // Seleziona solo il campo username dell'utente
      }
    });
  }

  static async saveIdea(req) 
  {
    const { titolo, descrizione, username } = req.body;
    try 
    {
      // Cerca un utente con lo stesso indirizzo email
      const utente = await Utente.findOne({ where: { username } });
      if (!utente) 
      {
        throw new Error('UTENTE_NON_TROVATO');
      }
      // Cerca un'idea con lo stesso titolo
      const existingIdea = await Idea.findOne({ where: { titolo } });

      // Se esiste un utente con lo stesso indirizzo email, restituisci un errore
      if (existingIdea) {
        throw new Error('IDEA_PRESENT');
      }
      // Altrimenti, crea un nuovo utente
      const nuovaIdea = await Idea.create({ titolo, descrizione, UtenteId: utente.id,});
      return nuovaIdea;
    } 
    catch (error) 
    {
      // Gestisci l'errore qui
      throw new Error(error.message);
    }
  }

  static async findById(req){
    return Idea.findByPk(req.params.id);
  }

  static async update(req){
    let Idea = await this.findById(req);
    Idea.setDataValue('Idea', req.body.Idea);
    return Idea.save();
  }

  static async delete(req){
    return new Promise( (resolve, reject) => {
      this.findById(req).then( item => {
        item.destroy().then( () => {resolve(item)})
      })
    })
  }

}