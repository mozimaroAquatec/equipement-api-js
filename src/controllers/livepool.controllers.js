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
exports.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = exports.removeDuplicatesOfLivepool = exports.errorTest = exports.getDuplicatesLivepool = exports.getInfoOfLampsOfLivepool = exports.getInfoOfPumpsOfLivepool = exports.getLivepoolInfo = exports.getLivepools = void 0;
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const livepoolServices = __importStar(require("../services/livepool.services"));
const success_response_1 = __importDefault(require("../utils/success.response"));
const logger = __importStar(require("../logging/index"));
const pumpServices = __importStar(require("../services/pump.services"));
const lampServices = __importStar(require("../services/lamp.services"));
const PumpInterfaces = __importStar(require("../interfaces/pump.interface"));
const LampInterfaces = __importStar(require("../interfaces/lamp.interface"));
const EquipementInterfaces = __importStar(require("../interfaces/equipement.interfaces"));
/**
 *% Controller function to get all livepools.
 *
 * @route GET /livepools
 * @param {Request} req - Express request object containing query parameters for search.
 * @param {Response} res - Express response object to send the list of livepools.
 * @returns {Promise<Response>} - Returns a response with a JSON payload containing the list of livepools or an error message.
 * @access PUBLIC
 */
const getLivepools = async (req, res) => {
    try {
        // Extract and clean query parameters
        const searchMacAddress = req.query.searchMacAddress?.replace(/\s/g, "") || "";
        const status = req.query.status ||
            EquipementInterfaces.EquipementStatusParams.AllConnect;
        const pumpMode = req.query.pumpMode;
        // Fetch the list of livepools using the service function
        const livepools = await livepoolServices.getLivepools(searchMacAddress, status, pumpMode);
        // Log successful retrieval of livepools
        logger.consoleLogger?.info({
            method: "GET",
            path: "/livepools",
            description: "Get all livepools successfully",
            status,
        }, "Get all livepools successfully");
        // Return a successful response with the list of livepools
        return res.status(200).json(new success_response_1.default("Get all livepools successfully", {
            livepools,
        }));
    }
    catch (error) {
        // Log error details if retrieval fails
        logger.livepoolLogger?.error(error, "Error Get livepools in controller");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getLivepools = getLivepools;
/**
 *% Handles the request to retrieve Livepool information, including connection and disconnection counts.
 *
 * @route GET /livepools/info
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object to send Livepool information.
 * @returns {Promise<Response>} - Returns a response with a JSON payload containing Livepool connection data or an error message.
 * @access PUBLIC
 */
const getLivepoolInfo = async (req, res) => {
    try {
        // Get the count of Livepool connections for today
        const countOfConnectOfEquipements = await livepoolServices.getCountOfConnectOfLivepools();
        // Get the count of new Livepool disconnections from yesterday
        const countOfNewOfDisconnectOfEquipements = await livepoolServices.getCountOfNewOfDisconnectOfLivepools();
        // Get the count of new Livepool connections
        const countOfNewConnectOfEquipements = await livepoolServices.getCountOfNewConnectOfLivepools();
        // Get the total count of disconnected Livepool devices
        const countOfDisconnectOfEquipements = await livepoolServices.getCountOfDisconnectOfLivepools();
        // Get the total count of Livepool devices
        const countToalOfEquipements = await livepoolServices.getCountOfTotalOfLivepool();
        // Send a success response with the Livepool information
        return res.status(200).json(new success_response_1.default("Retrieved livepools information successfully", {
            countOfConnectOfEquipements,
            countOfNewOfDisconnectOfEquipements,
            countOfNewConnectOfEquipements,
            countOfDisconnectOfEquipements,
            countToalOfEquipements,
        }));
    }
    catch (error) {
        // Log error if retrieval fails
        logger.livepoolLogger?.error(error, "Error retrieving livepools information in controller");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getLivepoolInfo = getLivepoolInfo;
/**
 *% Handles the request to retrieve information about pump statuses and modes in the Livepool.
 *
 * @route GET /livepool/pumps/info
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - A JSON response with counts of active, deactivated pumps, and pumps by mode.
 * @access PUBLIC
 */
const getInfoOfPumpsOfLivepool = async (req, res) => {
    try {
        // Get the count of active pumps in the Livepool
        const countOfActivePumpsOfLivepool = await pumpServices.getCountOfActivePumpsOfLivepool();
        // Get the count of deactivated pumps in the Livepool
        const countOfDesactivePumpsOfLivepool = await pumpServices.getCountOfDesactivePumpsOfLivepool();
        // Get the count of pumps in Manual mode
        const countOfLivepoolPumpsModeManual = await livepoolServices.getModePumpsInfoOfLivepool(PumpInterfaces.Mode.Manual);
        // Get the count of pumps in Horaire mode
        const countOfLivepoolPumpsModeHoraire = await livepoolServices.getModePumpsInfoOfLivepool(PumpInterfaces.Mode.Horaire);
        // Get the count of pumps in Automatique mode
        const countOfLivepoolPumpsModeAutomatique = await livepoolServices.getModePumpsInfoOfLivepool(PumpInterfaces.Mode.Automatique);
        // Return the counts in a success response
        return res.status(200).json(new success_response_1.default("Successfully retrieved pump information for Livepool", {
            countOfActivePumpsOfLivepool,
            countOfDesactivePumpsOfLivepool,
            countOfLivepoolPumpsModeManual,
            countOfLivepoolPumpsModeHoraire,
            countOfLivepoolPumpsModeAutomatique,
        }));
    }
    catch (error) {
        // Log any errors that occur during the process
        logger.livepoolLogger.error(error, "Error retrieving pump information in Livepool controller");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getInfoOfPumpsOfLivepool = getInfoOfPumpsOfLivepool;
/**
 *% Handles the request to retrieve information about lamp statuses and modes in the Livepool.
 *
 * @route GET /livepool/lamps/info
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - A JSON response with counts of active, deactivated lamps, and lamps by mode.
 * @access PUBLIC
 */
const getInfoOfLampsOfLivepool = async (req, res) => {
    try {
        // Get the count of active lamps in the Livepool
        const countOfActiveLampsOfLivepool = await lampServices.getCountOfActiveLampsOfLivepool();
        // Get the count of deactivated lamps in the Livepool
        const countOfDesactiveLampsOfLivepool = await lampServices.getCountOfDesactiveLampsOfLivepool();
        // Get the count of lamps in Manual mode
        const countOfLampModeManualOfLivepool = await livepoolServices.getModeLampInfoOfLivepool(LampInterfaces.Mode.Manual);
        // Get the count of lamps in Horaire mode
        const countOfLampModeHoraire = await livepoolServices.getModeLampInfoOfLivepool(LampInterfaces.Mode.Horaire);
        // Return the counts in a success response
        return res.status(200).json(new success_response_1.default("Successfully retrieved lamp information for Livepool", {
            countOfActiveLampsOfLivepool,
            countOfDesactiveLampsOfLivepool,
            countOfLampModeManualOfLivepool,
            countOfLampModeHoraire,
        }));
    }
    catch (error) {
        // Log any errors that occur during the process
        logger.livepoolLogger.error(error, "Error retrieving lamp information in Livepool controller");
        // Send an internal server error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getInfoOfLampsOfLivepool = getInfoOfLampsOfLivepool;
/**
 *% Retrieves the duplicates of livepool data from the system.
 *
 * @param {Request} req - The request object (not used here, but can be useful for logging)
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - A promise that resolves to a response indicating success or failure
 */
const getDuplicatesLivepool = async (req, res) => {
    try {
        // Fetch duplicates of livepool data from the service
        const duplicatesLivepool = await livepoolServices.getDuplicatesOFLivepool();
        // Return success response with the duplicates data
        return res.status(200).json(new success_response_1.default("Successfully retrieved duplicate livepool data", {
            duplicatesLivepool,
        }));
    }
    catch (error) {
        // Log error with more context (optional request data can be logged if necessary)
        logger.racerLogger.error({ error }, // Log the error and any query parameters for context
        "Error getDuplicatesLivepool: occurred while retrieving duplicate livepool data");
        // Return a 500 Internal Server Error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getDuplicatesLivepool = getDuplicatesLivepool;
const errorTest = async (req, res) => {
    try {
        res.status(400).json(new error_handler_1.default("test error"));
    }
    catch (error) {
        res.status(500).json(new error_handler_1.default(`error test${error}`));
    }
};
exports.errorTest = errorTest;
/**
 *% Removes duplicate livepool data from the system.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - A promise that resolves to a response indicating success or failure
 */
const removeDuplicatesOfLivepool = async (req, res) => {
    try {
        // Call the service to remove duplicates
        await livepoolServices.removeDuplicatesOfLivepool();
        // Return a success response
        return res
            .status(200)
            .json(new success_response_1.default("Successfully removed duplicate livepool data"));
    }
    catch (error) {
        // Log the error with more context (you could also log request data if necessary)
        logger.livepoolLogger.error({ error }, // Include request data for context if needed
        "Error removeDuplicatesOfLivepool: occurred while removing duplicate livepool data");
        // Return a 500 Internal Server Error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.removeDuplicatesOfLivepool = removeDuplicatesOfLivepool;
/**
 *% Fetches all pumps in a 'desactive' state that have been inactive for more than two days.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - A promise that resolves to a response with the desactive pumps data
 */
const getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = async (req, res) => {
    try {
        // Log the start of the process
        logger.consoleLogger?.info("Fetching all desactive pumps of livepool after two days");
        // Fetch the pumps using the service
        const desactivePumps = await pumpServices.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays();
        // Return the pumps in a successful response
        return res.status(200).json(new success_response_1.default("Successfully fetched all desactive pumps of livepool after two days", {
            desactivePumps,
        }));
    }
    catch (error) {
        // Log the error with more context
        logger.livepoolLogger.error({ error }, // Add request data to the log for better debugging
        "Error getAllDesactiveStatePumpsOfLivepoolAfterTwoDays : occurred while fetching desactive pumps of livepool after two days");
        // Return a 500 Internal Server Error response
        return res.status(500).json(new error_handler_1.default("Internal server error"));
    }
};
exports.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = getAllDesactiveStatePumpsOfLivepoolAfterTwoDays;
//# sourceMappingURL=livepool.controllers.js.map