import axios from 'axios';
const COUNTRIES_ACCESS_URL = import.meta.env.VITE_COUNTRIES_ACCESS_URL;

export const fetchCountries = async () => {
    try {
        const response = await axios.get(COUNTRIES_ACCESS_URL);
        return response.data;
    } catch (error) {
        const typedError = error as Error;
        console.error(typedError.message);
        throw error;
    }
};
