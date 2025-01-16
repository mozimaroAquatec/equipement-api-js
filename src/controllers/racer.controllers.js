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
exports.updateRacer = exports.removeDuplicatesOfRacer = exports.getInfoOfLampsOfRacer = exports.getInfoOfPumpsOfRacer = exports.getDuplicatesRacer = exports.getRacerInfo = exports.getRacers = void 0;
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const racerServices = __importStar(require("../services//racer.services"));
const success_response_1 = __importDefault(require("../utils/success.response"));
const logger = __importStar(require("../logging/index"));
const EquipementInterfaces = __importStar(require("../interfaces/equipement.interfaces"));
const pumpServices = __importStar(require("../services/pump.services"));
const lampServices = __importStar(require("../services/lamp.services"));
const PumpInterfaces = __importStar(require("../interfaces/pump.interface"));
const LampInterfaces = __importStar(require("../interfaces/lamp.interface"));
/**
 * %desc Controller function to get all racers.
 *
 **@method GET /racers
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Express response object with the list of racers.
 * @access PUBLIC
 */
const getRacers = async (req, res) => {
    try {
        const searchMacAddress = req.query.searchMacAddress?.replace(/\s/g, "") || "";
        const status = req.query.status ||
            EquipementInterfaces.EquipementStatusParams.AllConnect;
        const pumpMode = req.query.pumpMode || PumpInterfaces.Mode.False;
        // Fetch the list of racers using the service function
        const racers = await racerServices.getRacers(searchMacAddress, status, pumpMode);
        // Log the success of the operation
        logger.consoleLogger?.info({
            method: "GET",
            path: "racers",
            describe: "get all racers success",
            status,
        }, "get all racers success");
        // Return a successful response with the list of racers
        return res
            .status(200)
            .json(new success_response_1.default("get all racers success", { racers }));
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.racerLogger.error(error, "get all racers controller error");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("internal server error"));
    }
};
exports.getRacers = getRacers;
/**
 * % Handles the request to get Racers information.
 *
 **@method GET /racer/info
 * @param {Request} _ - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>}
 */
const getRacerInfo = async (_, res) => {
    try {
        // Get the count of Racer connections for today
        const countOfConnectOfEquipements = await racerServices.getCountOfConnectOfRacers();
        // Get the count of Racer disconnections from yesterday
        const countOfDisconnectOfEquipements = await racerServices.getCountOfDisconnectOfRacers();
        const countOfNewConnectOfEquipements = await racerServices.getCountOfNewConnectOfRacers();
        const countOfNewOfDisconnectOfEquipements = await racerServices.getCountOfNewDisconnectOfRacer();
        const countToalOfEquipements = await racerServices.getCountOfTotalOfRacer();
        // Send a success response with the Racer information
        return res.status(200).json(new success_response_1.default("get racers info success", {
            countOfConnectOfEquipements,
            countOfNewOfDisconnectOfEquipements,
            countOfNewConnectOfEquipements,
            countOfDisconnectOfEquipements,
            countToalOfEquipements,
        }));
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.racerLogger.error(error, "get Racers info controller error");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("internal server error"));
    }
};
exports.getRacerInfo = getRacerInfo;
/**
 *% Retrieves duplicate racer entries and sends them as a response.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The function sends a response with duplicate racers data or error.
 */
const getDuplicatesRacer = async (req, res) => {
    try {
        // Fetch duplicate racers from the service
        const duplicatesRacer = await racerServices.getDuplicatesRacer();
        // Send success response with duplicate racers data
        return res.status(200).json(new success_response_1.default("Successfully retrieved duplicate racers", {
            duplicatesRacer,
        }));
    }
    catch (error) {
        // Log the error with additional context for better debugging
        logger.racerLogger.error({ error, requestData: req.body }, // Log the error and request data (if available)
        "Error occurred while fetching duplicate racers");
        // Send generic error response with a 500 status
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getDuplicatesRacer = getDuplicatesRacer;
/**
 *% Handles the request to retrieve information about the pumps in the Racers.
 *
 * *@method /racer/pumps/info
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A JSON response with the counts of active and deactivated pumps.
 * @throws Will catch any errors that occur during the service calls or response handling.
 */
const getInfoOfPumpsOfRacer = async (req, res) => {
    try {
        // Get the count of active pumps in the Racers.
        const countOfActivePumpsOfRacer = await pumpServices.getCountOfActivePumpsOfRacer();
        // Get the count of deactivated pumps in the Racers.
        const countOfDesactivePumpsOfRacer = await pumpServices.getCountOfDesactivePumpsOfRacer();
        const countOfRacerPumpsModeManual = (await racerServices.getModePumpsInfoOfRacer(PumpInterfaces.Mode.Manual)) || 0;
        const countOfRacerPumpsModeHoraire = (await racerServices.getModePumpsInfoOfRacer(PumpInterfaces.Mode.Horaire)) || 0;
        const countOfRacerPumpsModeAutomatique = await racerServices.getModePumpsInfoOfRacer(PumpInterfaces.Mode.Automatique || 0);
        // Return the counts in a successful JSON response.
        return res.status(200).json(new success_response_1.default("get info of Pump of racer success", {
            countOfActivePumpsOfRacer,
            countOfDesactivePumpsOfRacer,
            countOfRacerPumpsModeManual,
            countOfRacerPumpsModeHoraire,
            countOfRacerPumpsModeAutomatique,
        }));
    }
    catch (error) {
        // Handle any errors that occur during the process.
        logger.racerLogger.error(error, "getInfoOfPumpsOfRacer racer controller error");
        // Throw an error response with the error details
        return res.status(500).json(new error_handler_1.default("internal server error"));
    }
};
exports.getInfoOfPumpsOfRacer = getInfoOfPumpsOfRacer;
/**
 *% Retrieves information about lamps for a given racer.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The function returns a response with lamp information or error.
 */
const getInfoOfLampsOfRacer = async (req, res) => {
    try {
        // Fetch counts of active and deactivated lamps for the racer
        const countOfActiveLampsOfRacer = await lampServices.getCountOfActiveLampsOfRacer();
        const countOfDesactiveLampsOfRacer = await lampServices.getCountOfDesactiveLampsOfRacer();
        // Fetch lamp mode information (manual and horaire) for the racer
        const countOfRacerLampsModeManual = await racerServices.getModeLampInfoOfRacer(LampInterfaces.Mode.Manual);
        const countOfRacerLampsModeHoraire = await racerServices.getModeLampInfoOfRacer(LampInterfaces.Mode.Horaire);
        // Return the gathered information in a successful response
        return res.status(200).json(new success_response_1.default("Successfully retrieved lamp info for racer", {
            countOfActiveLampsOfRacer,
            countOfDesactiveLampsOfRacer,
            countOfRacerLampsModeManual,
            countOfRacerLampsModeHoraire,
        }));
    }
    catch (error) {
        // Log the error with additional context (if available)
        logger.racerLogger.error({ error }, // Log the error with request data to provide more context
        "Error getInfoOfLampsOfRacer occurred while fetching lamp info for racer");
        // Return a 500 Internal Server Error response with the error details
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getInfoOfLampsOfRacer = getInfoOfLampsOfRacer;
/**
 *% Removes duplicate racers from the system.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - A promise that resolves to a response indicating success or failure
 */
const removeDuplicatesOfRacer = async (req, res) => {
    try {
        // Call service to remove duplicate racers
        await racerServices.removeDuplicatesOfRacer();
        // Return success response
        return res
            .status(200)
            .json(new success_response_1.default("Successfully removed duplicate racers"));
    }
    catch (error) {
        // Log error with more context for troubleshooting
        logger.racerLogger.error({ error, requestData: req.body }, // Log the error and request data for better context
        "removeDuplicatesOfRacer controller Error occurred while removing duplicate racers");
        // Return a 500 Internal Server Error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.removeDuplicatesOfRacer = removeDuplicatesOfRacer;
const updateRacer = async (req, res) => {
    try {
        await racerServices.updateRacerInfo();
        res.status(200).json(new success_response_1.default("update racer success"));
    }
    catch (error) {
        logger.racerLogger.error({ error }, // Log the error and request data for better context
        "updateRacer controller Error");
        // Return a 500 Internal Server Error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.updateRacer = updateRacer;
//# sourceMappingURL=racer.controllers.js.map