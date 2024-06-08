import { Utente } from "../models/connectionDB.js";

export class UtenteController 
{
  static async getAllUtentes()
  {
    return Utente.findAll();
  }

 static async findByEmailAndPassword(req,res) 
 {
    const { email, password } = req.body;
    
    const user = await Utente.findOne({
      where: {
          email: email,
          password: password
      }
    });

    if(!user)
    {
      req.session.error="Invalid Credentials";
      //return message json to Client
      res.status(401).json({ message: 'Email o password non validi' });

    }
    else
    {
      req.session.isAuth = true;
      req.session.email = user.email;
      req.session.userId = user.id; // Imposta l'ID dell'utente nella sessione
      res.status(200).json({ 
        user: user,
        session: req.session // Restituisce la sessione appena creata
      });
    } 
    
  }

  static async saveUtente(req) 
  {
    const { email, password } = req.body;
    try 
    {
      const nuovoUtente = await Utente.create({ email, password });
      return nuovoUtente;
    } 
    catch (error) 
    {
      throw new Error("Errore nella creazione dell'utente: " + error.message);
    }
  }

  static async findById(req){
    return Utente.findByPk(req.params.id);
  }

  static async update(req){
    let Utente = await this.findById(req);
    Utente.setDataValue('Utente', req.body.Utente);
    return Utente.save();
  }

  static async delete(req){
    return new Promise( (resolve, reject) => {
      this.findById(req).then( item => {
        item.destroy().then( () => {resolve(item)})
      })
    })
  }
  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Errore durante il logout' });
      }
      res.clearCookie('connect.sid'); // Sostituisci 'connect.sid' con il nome del tuo cookie di sessione se diverso
      res.status(200).json({ message: 'Logout avvenuto con successo' });
    });
  }
  
}