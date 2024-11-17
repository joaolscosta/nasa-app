import React, { useState, useEffect } from "react";

function App() {
    // State to store the photo data
    const [photo, setPhoto] = useState(null);
    // State to store any errors
    const [error, setError] = useState(null);

    // Fetch everytime reload the page
    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const apiKey = import.meta.env.VITE_NASA_API_KEY;
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Failed to acess API");
                }
                const data = await response.json();
                setPhoto(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAPOD();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!photo) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>NASA Astronomy Picture of the Day</h1>
            <img src={photo.url} alt={photo.title} />
            <h2>{photo.title}</h2>
            <p>{photo.explanation}</p>
            <p>
                <strong>Date:</strong> {photo.date}
            </p>
        </>
    );
}

export default App;
