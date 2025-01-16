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
exports.updateLocationByMacAddress = exports.createEquipementLocation = exports.getEquipementLocation = void 0;
const logger = __importStar(require("../logging/index"));
const equipementServices = __importStar(require("../services/equipement.services"));
const equipementHelpers = __importStar(require("../helpers/equipement.helpers"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const geoLocation_services_1 = require("./geoLocation.services");
/**
 *% Retrieves the equipment location from the specified model using its ID.
 *
 * @param {mongoose.Model<any>} equipementLocationModel - The Mongoose model for the equipment location.
 * @param {Types.ObjectId} id - The ID of the equipment location to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the equipment location object or null if not found.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getEquipementLocation = (equipementLocationModel, id) => {
    try {
        // Retrieve the equipment location by ID from the provided model
        return equipementLocationModel.findById(id);
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.equipementLogger.error({ error }, "getEquipementLocation services error");
        // Throw an error response with the error details
        throw new error_handler_1.default(`getEquipementLocation error : ${error}`);
    }
};
exports.getEquipementLocation = getEquipementLocation;
/**
 *% Creates or updates the location of equipment in the specified location model
 *% based on the provided equipment model and their random coordinates within a set radius.
 *
 * @param {mongoose.Model<any>} equipementModel - The Mongoose model for the equipment.
 * @param {mongoose.Model<any>} locationModel - The Mongoose model for the equipment's location.
 * @param {string} macAddressField - The field in the location model used to identify the equipment by its MAC address.
 * @returns {Promise<void>} - A promise that resolves once the equipment locations have been created/updated.
 * @throws {ErrorResponse} - Throws an error response if the process fails.
 */
const createEquipementLocation = async (equipementModel, locationModel, // Make model dynamic
macAddressField) => {
    try {
        // Fetch all equipment from the equipment model
        const equipements = await equipementServices.getEquipements(equipementModel);
        // Iterate over each equipment
        for (let equipement of equipements) {
            // Generate random coordinates around a specific center
            const lat = equipementHelpers.getRandomCoordinatesAroundCenter(46.2276, 2.2137, 200).latitude;
            const log = equipementHelpers.getRandomCoordinatesAroundCenter(46.2276, 2.2137, 200).longitude;
            // Get the country and city based on the generated coordinates
            const location = await (0, geoLocation_services_1.getCountryAndCityByLatiAndLon)(lat, log);
            // Update or insert the equipment's location information
            await locationModel.updateOne({ [macAddressField]: equipement.macAddress }, {
                [macAddressField]: equipement.macAddress,
                country: location?.country,
                city: location?.city,
                latitude: lat,
                longitude: log,
            }, { upsert: true });
        }
    }
    catch (error) {
        // Log any errors that occur during the operation
        logger.racerLogger.error({ error }, "createEquipementLocation services error");
        // Throw an error response with the error details
        throw new error_handler_1.default(`createEquipementLocation error : ${error}`);
    }
};
exports.createEquipementLocation = createEquipementLocation;
/**
 *% Updates the location of an equipment entry in the database based on its MAC address.
 *% The function fetches the country and city using the latitude and longitude and updates the equipment location record.
 *
 * @param {mongoose.Model<any>} equipementLocationModel - The model representing the equipment location collection.
 * @param {string} macAddressField - The field name used to identify the equipment by its MAC address.
 * @param {string} macAddress - The MAC address of the equipment.
 * @param {string} latitude - The latitude of the equipment's location.
 * @param {string} longitude - The longitude of the equipment's location.
 * @returns {Promise<void>} - A promise that resolves when the location has been updated.
 * @throws {ErrorResponse} - Throws an error response if the location update fails.
 */
const updateLocationByMacAddress = async (equipementLocationModel, macAddressField, macAddress, latitude, longitude) => {
    try {
        // Fetch the country and city based on latitude and longitude
        const location = await (0, geoLocation_services_1.getCountryAndCityByLatiAndLon)(parseFloat(latitude), parseFloat(longitude));
        // Update the equipment location in the database, using the MAC address to find the specific entry
        await equipementLocationModel.updateOne({ [macAddressField]: macAddress }, {
            latitude,
            longitude,
            country: location.country,
            city: location.city,
        }, { upsert: true } // Create a new document if it doesn't exist
        );
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.equipementLogger.error({ error }, `updateLocationByMacAddress ${equipementLocationModel.name} : ${macAddress} services error`);
        // Throw a custom error response with the error details
        throw new error_handler_1.default(`updateLocationByMacAddress error: ${error}`);
    }
};
exports.updateLocationByMacAddress = updateLocationByMacAddress;
//# sourceMappingURL=location.services.js.map