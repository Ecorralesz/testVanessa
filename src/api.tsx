import axios from 'axios';
import { Artist, Album } from './types'; // Import shared types

const API_URL = 'https://www.theaudiodb.com/api/v1/json/2';

// Function to search for artists by keyword
export const searchArtists = async (keyword: string): Promise<Artist[] | null> => {
    try {
        const response = await axios.get<{ artists: Artist[] }>(`${API_URL}/search.php?s=${keyword}`);
        return response.data.artists || null;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return null;
    }
};

// Function to fetch albums by artist ID
export const fetchAlbums = async (artistId: string): Promise<Album[] | null> => {
    try {
        const response = await axios.get<{ album: Album[] }>(`${API_URL}/album.php?i=${artistId}`);
        return response.data.album || null;
    } catch (error) {
        console.error("Error fetching albums:", error);
        return null;
    }
};
