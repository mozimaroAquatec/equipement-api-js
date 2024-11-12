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
exports.getCountOfEquipementPumpModeManual = exports.getCountOfActivePumpsOfEquipement = exports.getCountOfRacerPumpModeHoraire = exports.getCountOfRacerPumpModeAutomatique = exports.getCountOfRacerPumpModeManual = exports.getCountOfLivepoolPumpModeAutomatique = exports.getCountOfLivepoolPumpModeHoraire = exports.getCountOfLivepoolPumpModeManual = exports.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = exports.getCountOfDesactivePumpsOfRacer = exports.getCountOfActivePumpsOfRacer = exports.getCountOfDesactivePumpsOfLivepool = exports.getCountOfActivePumpsOfLivepool = void 0;
const date_1 = __importDefault(require("../utils/date"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
const livepoolPump_model_1 = __importDefault(require("../models/livepools/livepoolPump.model"));
const racerPump_model_1 = __importDefault(require("../models/racers/racerPump.model"));
const PumpInterfaces = __importStar(require("../interfaces/pump.interface"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
/**
 *% Retrieves the count of active pumps in the Livepool.
 *
 * @returns {Promise<number>} The number of active pumps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfActivePumpsOfLivepool = async () => {
    try {
        // Query the LivepoolPump collection to count all documents with an 'Active' state.
        return await livepoolPump_model_1.default.countDocuments({
            state: PumpInterfaces.State.Active,
        });
    }
    catch (error) {
        // Log the error using the livepoolLogger for further debugging.
        logger.livepoolLogger.error(error, "Error setting up getCountOfActivePumpsOfLivepool service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfActivePumpsOfLivepool service: ${error}`);
    }
};
exports.getCountOfActivePumpsOfLivepool = getCountOfActivePumpsOfLivepool;
/**
 *% Retrieves the count of deactivated (desactive) pumps in the Livepool.
 *
 * @returns {Promise<number>} The number of deactivated pumps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfDesactivePumpsOfLivepool = async () => {
    try {
        // Query the LivepoolPump collection to count all documents with a 'Desactive' state.
        return await livepoolPump_model_1.default.countDocuments({
            state: PumpInterfaces.State.Desactive,
        });
    }
    catch (error) {
        // Log the error using the livepoolLogger for further debugging.
        logger.livepoolLogger.error(error, "Error setting up getCountOfDesactivePumpsOfLivepool service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfDesactivePumpsOfLivepool service: ${error}`);
    }
};
exports.getCountOfDesactivePumpsOfLivepool = getCountOfDesactivePumpsOfLivepool;
/**
 *% Retrieves the count of active pumps in the Racer.
 *
 * @returns {Promise<number>} The number of active pumps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfActivePumpsOfRacer = async () => {
    try {
        // Query the RacerPump collection to count all documents with an 'Active' state.
        return await racerPump_model_1.default.countDocuments({
            state: PumpInterfaces.State.Active,
        });
    }
    catch (error) {
        // Log the error using the racerLogger for further debugging.
        logger.racerLogger.error(error, "Error setting up getCountOfActivePumpsOfRacer service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfActivePumpsOfRacer service: ${error}`);
    }
};
exports.getCountOfActivePumpsOfRacer = getCountOfActivePumpsOfRacer;
/**
 *% Retrieves the count of deactivated (desactive) pumps in the Racer.
 *
 * @returns {Promise<number>} The number of deactivated pumps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfDesactivePumpsOfRacer = async () => {
    try {
        // Query the RacerPump collection to count all documents with a 'Desactive' state.
        return await racerPump_model_1.default.countDocuments({
            state: PumpInterfaces.State.Desactive,
        });
    }
    catch (error) {
        // Log the error using the racerLogger for further debugging.
        logger.racerLogger.error(error, "Error setting up getCountOfDesactivePumpsOfRacer service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfDesactivePumpsOfRacer service: ${error}`);
    }
};
exports.getCountOfDesactivePumpsOfRacer = getCountOfDesactivePumpsOfRacer;
/**
 *% Retrieves all pumps from the LivepoolPump collection that have a state of "Desactive"
 *% and were last updated more than 2 days ago.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of pumps with a "Desactive" state
 *  and an `updatePump` date older than 2 days.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = async () => {
    try {
        const twoDaysAgo = (0, moment_timezone_1.default)().subtract(2, "days").format("YYYY/MM/DD");
        // Query the LivepoolPump collection for pumps where state is "Desactive" and updatePump is older than 2 days
        return await livepoolPump_model_1.default.find({
            state: "Desactive",
            updatePump: { $lt: twoDaysAgo },
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getAllDesactiveStatePumpsOfLivepoolAfterTwoDays");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`Error in getAllDesactiveStatePumpsOfLivepoolAfterTwoDays service: ${error}`);
    }
};
exports.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays = getAllDesactiveStatePumpsOfLivepoolAfterTwoDays;
/**
 *% Retrieves the count of pumps in the LivepoolPump collection that are set to "Manual" mode.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of pumps in "Manual" mode.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfLivepoolPumpModeManual = async () => {
    try {
        // Count the documents where the pump mode is set to Manual
        return await livepoolPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Manual,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfLivepoolPumpModeManual");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`Error in getCountOfLivepoolPumpModeManual service: ${error}`);
    }
};
exports.getCountOfLivepoolPumpModeManual = getCountOfLivepoolPumpModeManual;
/**
 *% Retrieves the count of pumps in the LivepoolPump collection that are set to "Horaire" mode.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of pumps in "Horaire" mode.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfLivepoolPumpModeHoraire = async () => {
    try {
        // Count the documents where the pump mode is set to Horaire
        return await livepoolPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Horaire,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfLivepoolPumpModeHoraire");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`Error in getCountOfLivepoolPumpModeHoraire service: ${error}`);
    }
};
exports.getCountOfLivepoolPumpModeHoraire = getCountOfLivepoolPumpModeHoraire;
/**
 *% Retrieves the count of pumps in the LivepoolPump collection that are set to "Automatique" mode.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of pumps in "Automatique" mode.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfLivepoolPumpModeAutomatique = async () => {
    try {
        // Count the documents where the pump mode is set to Automatique
        return await livepoolPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Automatique,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfLivepoolPumpModeAutomatique");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`Error in getCountOfLivepoolPumpModeAutomatique service: ${error}`);
    }
};
exports.getCountOfLivepoolPumpModeAutomatique = getCountOfLivepoolPumpModeAutomatique;
/**
 *% Retrieves the count of Racer pumps in the RacerPump collection that are set to "Manual" mode.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of Racer pumps in "Manual" mode.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfRacerPumpModeManual = async () => {
    try {
        // Count the documents where the Racer pump mode is set to Manual
        return await racerPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Manual,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.racerLogger.error({ error }, "Error in getCountOfRacerPumpModeManual");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfRacerPumpModeManual service: ${error}`);
    }
};
exports.getCountOfRacerPumpModeManual = getCountOfRacerPumpModeManual;
/**
 *% Retrieves the count of Racer pumps in the RacerPump collection that are set to "Automatique" mode and match today's date.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of Racer pumps in "Automatique" mode for today.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfRacerPumpModeAutomatique = async () => {
    try {
        // Count the documents where the Racer pump mode is set to Automatique and the date is today's date
        return await racerPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Automatique,
            date: (0, date_1.default)().today, // Assuming getDate().today returns today's date in the required format
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.racerLogger.error({ error }, "Error in getCountOfRacerPumpModeAutomatique");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfRacerPumpModeAutomatique service: ${error}`);
    }
};
exports.getCountOfRacerPumpModeAutomatique = getCountOfRacerPumpModeAutomatique;
/**
 *% Retrieves the count of Racer pumps in the RacerPump collection that are set to "Horaire" mode.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of Racer pumps in "Horaire" mode.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfRacerPumpModeHoraire = async () => {
    try {
        // Count the documents where the Racer pump mode is set to Horaire
        return await racerPump_model_1.default.countDocuments({
            mode: PumpInterfaces.Mode.Horaire,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.racerLogger.error({ error }, "Error in getCountOfRacerPumpModeHoraire");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfRacerPumpModeHoraire service: ${error}`);
    }
};
exports.getCountOfRacerPumpModeHoraire = getCountOfRacerPumpModeHoraire;
/**
 *% Retrieves the count of active pumps in the Equipement.
 *
 * @returns {Promise<number>} The number of active pumps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfActivePumpsOfEquipement = async (modelOfPump // Make model dynamic
) => {
    try {
        // Query the modelOfPump collection to count all documents with an 'Active' state.
        return await modelOfPump.countDocuments({
            state: PumpInterfaces.State.Active,
        });
    }
    catch (error) {
        // Log the error using the livepoolLogger for further debugging.
        logger.equipementLogger.error({ error }, `Error setting up getCountOfActivePumpsOfEquipement ${modelOfPump.name} service`);
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfActivePumpsOfLivepool service: ${error}`);
    }
};
exports.getCountOfActivePumpsOfEquipement = getCountOfActivePumpsOfEquipement;
/**
 *% Retrieves the count of pumps in the specified model that are set to "Manual" mode.
 *% The model is dynamic and passed as a parameter to allow querying different pump collections.
 *
 * @param {mongoose.Model<any>} modelOfPump - The Mongoose model of the pump collection to query.
 * @returns {Promise<number>} - A promise that resolves to the count of pumps in "Manual" mode in the specified model.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfEquipementPumpModeManual = async (modelOfPump // Make model dynamic
) => {
    try {
        // Count the documents where the pump mode is set to Manual in the given model
        return await modelOfPump.countDocuments({
            mode: PumpInterfaces.Mode.Manual,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfEquipementPumpModeManual");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfEquipementPumpModeManual service: ${error}`);
    }
};
exports.getCountOfEquipementPumpModeManual = getCountOfEquipementPumpModeManual;
//# sourceMappingURL=pump.services.js.map