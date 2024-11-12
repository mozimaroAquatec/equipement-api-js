"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryAndCityByLatAndLon = void 0;
const axios_1 = __importDefault(require("axios"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
/**
 *% Fetches the country and city based on the provided latitude and longitude
 *% using a reverse geocoding API.
 *

 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<{ country: string, city: string }>} - A promise that resolves to an object containing the country and city.
 * @throws {ErrorResponse} - Throws an error response if the API request fails.
 */
const getCountryAndCityByLatAndLon = async (lat, lon) => {
    const BASE_URL = `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    try {
        // Make the API call to get the reverse geocode data
        const response = await axios_1.default.get(BASE_URL);
        const data = response.data;
        // Extract the city and country from the response
        const city = data.city || "false";
        const country = data.countryName || "false";
        return { country, city };
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.geoLocationLogger.error({ error }, "getCountryAndCityByLatAndLon");
        // Throw an error response if the API request fails
        throw new error_handler_1.default(`getCountryAndCityByLatAndLon error : ${error}`);
    }
};
exports.getCountryAndCityByLatAndLon = getCountryAndCityByLatAndLon;
//# sourceMappingURL=geoLocation.services.js.map