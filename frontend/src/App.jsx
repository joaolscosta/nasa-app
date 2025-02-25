import React, { useState, useEffect } from "react";

function App() {
   const [photo, setPhoto] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   const fetchAPOD = async () => {
      try {
         setLoading(true);
         setError(null);
         const apiKey = import.meta.env.VITE_NASA_API_KEY;
         const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

         if (!response.ok) {
            throw new Error("Erro ao acessar a API");
         }

         const data = await response.json();
         setPhoto(data);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchAPOD();
   }, []);

   return (
      <div className="container">
         <h1>NASA Astronomy Picture of the Day</h1>

         {loading && <div className="loader"></div>}

         {error && (
            <div className="error">
               <p>❌ {error}</p>
               <button onClick={fetchAPOD}>Try again</button>
            </div>
         )}

         {photo && (
            <div className="card">
               <h2>{photo.title}</h2>
               <img src={photo.url} alt={photo.title} />
               <p>{photo.explanation}</p>
               <p>
                  <strong>📅 Date:</strong> {photo.date}
               </p>
            </div>
         )}
      </div>
   );
}

export default App;
