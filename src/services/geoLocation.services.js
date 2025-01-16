"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryAndCityByLatiAndLon = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 *% Fetches the country and city based on the provided latitude and longitude
 *% using a reverse geocoding API.
 *

 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<{ country: string, city: string }>} - A promise that resolves to an object containing the country and city.
 * @throws {ErrorResponse} - Throws an error response if the API request fails.
 */
// export const getCountryAndCityByLatAndLon = async (
//   lat: number,
//   lon: number
// ): Promise<{ country: string; city: string }> => {
//   const BASE_URL = `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
//   try {
//     // Make the API call to get the reverse geocode data
//     const response = await axios.get(BASE_URL);
//     const data = response.data;
//     // Extract the city and country from the response
//     const city = data.city || "false";
//     const country = data.countryName || "false";
//     return { country, city };
//   } catch (error) {
//     // Log the error for debugging purposes
//     logger.geoLocationLogger.error({ error }, "getCountryAndCityByLatAndLon");
//     // Throw an error response if the API request fails
//     throw new ErrorResponse(`getCountryAndCityByLatAndLon error : ${error}`);
//   }
// };
const getCountryAndCityByLatiAndLon = async (lat, lon, language = "de" // Add language support (default is 'en')
) => {
    const API_KEY = "0d8dcc927fd4774a7117e70fa412e50a"; // Replace with your OpenWeatherMap API key
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`;
    try {
        // Make the API request to OpenWeatherMap's weather endpoint
        const response = await axios_1.default.get(BASE_URL);
        const data = response.data;
        // Get the country code from OpenWeatherMap
        const countryCode = data.sys.country;
        // Fetch the full country name using Restcountries API and the lang parameter for language
        const countryResponse = await axios_1.default.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const countryName = countryResponse.data[0].name[language] ||
            countryResponse.data[0].name["common"];
        const city = data.name || "Unknown City";
        return { country: countryName || "Unknown Country", city };
    }
    catch (error) {
        console.error("Error fetching geolocation:", error);
        throw Error(`getCountryAndCityByLatAndLon error: ${error.response ? error.response.data : error.message}`);
    }
};
exports.getCountryAndCityByLatiAndLon = getCountryAndCityByLatiAndLon;
//# sourceMappingURL=geoLocation.services.js.map