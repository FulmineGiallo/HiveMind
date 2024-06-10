import React from 'react';

const Card = ({ autore, titolo, descrizione }) => {
  return (
    <div className="flex justify-center items-center p-4 mb-20">
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl dark:border-gray-700 dark:bg-gray-800"
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex p-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Author"
            />
            <h5 className="mb-2 text-xl robot tracking-tight text-left text-gray-900 dark:text-white px-2">{autore}</h5>
          </div>

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">{titolo}</h5>
          <div
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: descrizione }}
          />

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <a href="#" className="flex-shrink-0">
                <img className="w-14 h-14 object-cover rounded" src="https://i.ibb.co/frwycVf/like-2.png" alt="Like Post" />
              </a>
              <a href="#" className="flex-shrink-0">
                <img className="w-14 h-14 object-cover rounded" src="https://i.ibb.co/pv7pxdK/dislike-1.png" alt="Dislike Post" />
              </a>
            </div>
            <div className="flex py-2">
            <button className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-7 py-4.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
              <img src="https://i.ibb.co/5hrqYsB/comment.png" alt="Icona" className="w-12 h-12" />
              <span className="ml-3">Commenti</span>
            </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
