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
exports.getEquipementLocation = exports.createEquipementsLocation = exports.getEquipementHistory = void 0;
const success_response_1 = __importDefault(require("../utils/success.response"));
const equipementSchemas = __importStar(require("../utils/schemas/equipement.schemas"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
const EquipementInterfaces = __importStar(require("../interfaces/equipement.interfaces"));
const locationServices = __importStar(require("../services/location.services"));
const historyServices = __importStar(require("../services/history.services"));
/**
 *% Controller to handle the request for fetching equipment history.
 ** Validates the query parameters and fetches the history from the appropriate model.
 *
 * @param {Request} req - The request object containing query parameters.
 * @param {Response} res - The response object to send the response back to the client.
 * @returns {Promise<Response>} - The response with equipment history or error message.
 */
const getEquipementHistory = async (req, res) => {
    try {
        // Validate the request query parameters using a schema
        const { error } = equipementSchemas.getEquipementHistory(req.query);
        // If validation fails, return a 400 error with the validation message
        if (error) {
            return res.status(400).json(new error_handler_1.default(error.details[0].message));
        }
        const { equipementHistoryModel, macAddress, macAddressField } = req.query;
        // Map the requested model name to the corresponding history model
        const modelHistory = EquipementInterfaces.EquipementHistoryName[equipementHistoryModel];
        // If the model is not found, return a 404 error
        if (!modelHistory) {
            return res
                .status(404)
                .json(new error_handler_1.default("equipementHistoryModel model not found"));
        }
        // Fetch the equipment history using the mapped model
        const equipementHistorys = await historyServices.getEquipementHistory(modelHistory, macAddressField, macAddress);
        // Return the success response with the fetched history
        return res.status(200).json(new success_response_1.default(`Get equipementHistor success`, {
            equipementHistorys,
        }));
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.equipementLogger.error({ error }, "getEquipementHistory controller error");
        // Return a 500 internal server error if something goes wrong
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getEquipementHistory = getEquipementHistory;
/**
 *% Controller to handle the creation of an equipment location.
 ** Validates the input data, checks for the existence of specified models,
 ** and triggers the creation of the equipment location in the database.
 *
 * @param {Request} req - The request object containing the necessary parameters for creating equipment location.
 * @param {Response} res - The response object to send the result or error to the client.
 * @returns {Promise<Response>} - The response with a success or error message.
 */
const createEquipementsLocation = async (req, res) => {
    try {
        // Validate the request body using the schema
        const { error } = equipementSchemas.createEquipementsLocationByequipement(req.body);
        // If validation fails, return a 400 error with the validation message
        if (error) {
            return res.status(400).json(new error_handler_1.default(error.details[0].message));
        }
        // Destructure the required data from the validated request body
        const { equipementLocationModel, macAddressField, equipementModel } = req.body;
        // Log the input data for debugging purposes
        console.log(macAddressField);
        console.log(equipementLocationModel);
        // Find the model corresponding to the specified equipment location
        const modelLocation = EquipementInterfaces.EquipementLocationName[equipementLocationModel];
        // If the location model is not found, return a 404 error
        if (!modelLocation) {
            return res
                .status(404)
                .json(new error_handler_1.default("Equipement location model not found"));
        }
        // Find the model corresponding to the specified equipment
        const modelOfEquipement = EquipementInterfaces.EquipementsName[equipementModel];
        // If the equipment model is not found, return a 404 error
        if (!modelOfEquipement) {
            return res
                .status(404)
                .json(new error_handler_1.default("Equipement model not found"));
        }
        // Create the equipment location using the location service
        await locationServices.createEquipementLocation(modelOfEquipement, modelLocation, macAddressField);
        // Return a success response
        return res
            .status(201)
            .json(new success_response_1.default(`Create equipement location for ${equipementLocationModel} success`));
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.equipementLogger.error({ error }, "createEquipementsLocation");
        // Return a 500 internal server error response if something goes wrong
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.createEquipementsLocation = createEquipementsLocation;
/**
 *% Controller to handle fetching an equipment location based on the provided query parameters.
 ** Validates the input, checks if the specified model exists, and retrieves the corresponding equipment location.
 *
 * @param {Request} req - The request object containing the necessary parameters to fetch equipment location.
 * @param {Response} res - The response object to send the result or error to the client.
 * @returns {Promise<Response>} - The response with the equipment location or an error message.
 */
const getEquipementLocation = async (req, res) => {
    try {
        // Validate the request query parameters using the schema
        const { error } = equipementSchemas.getEquipementLocation(req.query);
        // If validation fails, return a 400 error with the validation message
        if (error) {
            return res.status(400).json(new error_handler_1.default(error.details[0].message));
        }
        // Destructure the validated query parameters
        const { equipementLocationModel, id } = req.query;
        // Find the model corresponding to the specified equipment location
        const locationModel = EquipementInterfaces.EquipementLocationName[equipementLocationModel];
        // If the location model is not found, return a 404 error
        if (!locationModel) {
            return res
                .status(404)
                .json(new error_handler_1.default("Equipement location model not found"));
        }
        // Retrieve the equipment location using the location service
        const equipementLocation = await locationServices.getEquipementLocation(locationModel, id);
        // If no location is found, return a 404 error
        if (!equipementLocation) {
            return res
                .status(404)
                .json(new error_handler_1.default("Equipement location not found"));
        }
        // Return a success response with the retrieved equipment location
        return res.status(200).json(new success_response_1.default("Get equipement location success", {
            equipementLocation,
        }));
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.equipementLogger.error({ error }, "getEquipementLocation");
        // Return a 500 internal server error response if something goes wrong
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getEquipementLocation = getEquipementLocation;
//# sourceMappingURL=equipement.controllers.js.map