import React, { useState, useEffect } from 'react';
import Comment from './Comment.js'; // Importa il componente Comment

const Card = ({ autore, titolo, descrizione, likes, dislikes, onLike, onDislike, loadingAction, ideaId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  // Funzione per caricare i commenti dall'API
  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:5000/commenti/idea/${ideaId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Errore durante il fetch dei commenti:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Effetto per caricare i commenti quando showComments cambia
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, ideaId]);

  // Funzione per gestire l'invio di un nuovo commento
  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) {
      alert('Il commento non può essere vuoto.');
      return;
    }

    setPostingComment(true);
    try {
      // Simulazione dell'invio del commento (sostituire con la chiamata reale all'API)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulazione di un ritardo di 1 secondo
      const fakeComment = {
        username: 'You', // Aggiustato il campo autore a username
        contenuto: newComment,
        data_pubblicazione: new Date().toISOString(), // Aggiungi una data reale o generata dal backend
      };
      setComments([fakeComment, ...comments]); // Aggiungi il nuovo commento alla lista
      setNewComment(''); // Resetta il campo di input dopo l'invio
    } catch (error) {
      console.error('Errore durante il post del commento:', error);
      alert('Si è verificato un errore durante l\'invio del commento. Riprova più tardi.');
    } finally {
      setPostingComment(false);
    }
  };

  // Funzione per gestire il cambio del testo del nuovo commento
  const handleChangeNewComment = (event) => {
    setNewComment(event.target.value);
  };

  // Funzione per gestire il toggle dei commenti
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="flex justify-center items-center p-4 mb-20">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col justify-between p-4 leading-normal">
          {/* Sezione Autore */}
          <div className="flex p-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Author"
            />
            <h5 className="mb-2 text-xl robot tracking-tight text-left text-gray-900 dark:text-white px-2">{autore}</h5>
          </div>

          {/* Sezione Titolo e Descrizione */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">{titolo}</h5>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: descrizione }} />

          {/* Sezione Pulsanti di Azione (Like, Dislike) */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button onClick={onLike} className="flex-shrink-0" aria-label="Like Post" disabled={loadingAction}>
                {loadingAction ? (
                  <div className="w-14 h-14 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <img className="w-14 h-14 object-cover rounded" src="https://i.ibb.co/frwycVf/like-2.png" alt="Like Post" />
                )}
              </button>
              <button onClick={onDislike} className="flex-shrink-0" aria-label="Dislike Post" disabled={loadingAction}>
                {loadingAction ? (
                  <div className="w-14 h-14 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <img className="w-14 h-14 object-cover rounded" src="https://i.ibb.co/pv7pxdK/dislike-1.png" alt="Dislike Post" />
                )}
              </button>
            </div>

            {/* Pulsante per Mostrare/Nascondere Commenti */}
            <div className="flex py-2">
              <button
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                onClick={toggleComments}
              >
                <img src="https://i.ibb.co/5hrqYsB/comment.png" alt="Icona" className="w-6 h-6 mr-2" />
                <span className="ml-1">Commenti</span>
              </button>
            </div>
          </div>

          {/* Contatore Likes e Dislikes */}
          <div className="flex space-x-4">
            <span className="text-gray-900 dark:text-white">Likes: {likes}</span>
            <span className="text-gray-900 dark:text-white">Dislikes: {dislikes}</span>
          </div>

          {/* Sezione Commenti (visualizzata solo se showComments è true) */}
          {showComments && (
            <div className="mt-4">
              {loadingComments ? (
                <div>Caricamento commenti...</div>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <Comment key={index} autore={comment.Utente.username} testo={comment.contenuto} datetime={comment.data_pubblicazione} />
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Form per aggiungere un nuovo commento (visualizzato solo se showComments è true) */}
          {showComments && (
            <form onSubmit={handleSubmitComment} className="mt-4">
              <textarea
                value={newComment}
                onChange={handleChangeNewComment}
                className="block w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:text-white"
                placeholder="Aggiungi un commento..."
                rows={3}
              />
              <button
                type="submit"
                disabled={postingComment}
                className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-70 transition"
              >
                {postingComment ? 'Invio...' : 'Invia'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
