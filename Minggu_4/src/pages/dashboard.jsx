import { useState, useEffect } from "react";
import axios from 'axios';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async() => {
        setIsLoading(true);

        const randQuotes = await axios.get(`https://quote-garden.onrender.com/api/v3/quotes/random`);
        const allAuthors = await axios.get(`https://quote-garden.onrender.com/api/v3/authors`);
        const allGenres = await axios.get(`https://quote-garden.onrender.com/api/v3/genres`);
        const getQuotes = await axios.get(`https://quote-garden.onrender.com/api/v3/quotes`);
        console.log("Random Quotes : ", randQuotes.data.data);
        console.log("All Authors : ", allAuthors.data.data);
        console.log("All Genres : ", allGenres.data.data);
        console.log("Quotes : ", getQuotes.data.data);

        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>
                {isLoading && <h1>Loading...</h1>}
            </div>
        </>
    )
}