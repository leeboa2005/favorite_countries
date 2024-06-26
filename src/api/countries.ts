import axios from 'axios';

export const fetchCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        const typedError = error as Error;
        console.error(typedError.message);
        throw error;
    }
};
