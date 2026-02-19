const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

console.log(`Testing API Key: ${API_KEY}`);

async function testTmdb() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
            params: {
                api_key: API_KEY
            }
        });
        console.log('TMDB API Success! Status:', response.status);
        console.log('First Movie:', response.data.results[0].title);
        console.log('Poster Path:', response.data.results[0].poster_path);
        console.log('Backdrop Path:', response.data.results[0].backdrop_path);
    } catch (error) {
        console.error('TMDB API Failed');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

testTmdb();
