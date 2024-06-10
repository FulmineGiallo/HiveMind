import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Stili dell'editor di testo ricco

function RichTextEditor() {
  const [editorHtml, setEditorHtml] = useState('');
  const [title, setTitle] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},],
      ['link'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ];

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    // Stampa il titolo e il contenuto dell'editor a console
    console.log("Titolo:", title);
    console.log("Contenuto dell'editor:", editorHtml);
  };

  return (
    <div className="mx-auto my-4 p-4 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      <input 
        type="text" 
        placeholder="Inserisci il titolo" 
        value={title} 
        onChange={handleTitleChange} 
        className="bg-white border rounded-lg mb-4 w-full p-2"
      />
      <ReactQuill 
        theme="snow" 
        modules={modules}
        formats={formats}
        value={editorHtml} 
        onChange={handleChange} 
        className="bg-white border rounded-lg mb-4 w-full"
        style={{ minHeight: '250px' }} // Imposta l'altezza minima dell'editor
      />
      <div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </div>
      <div>
        <h3 className="text-lg mb-2">Contenuto dell'editor:</h3>
        <div className="prose" dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
    </div>
  );
}

export default RichTextEditor;
