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
exports.getCountOfRacerLampeModeHoraire = exports.getCountOfRacerLampeModeManual = exports.getCountOfDesactiveLampsOfRacer = exports.getCountOfLivepoolLampeModeHoraire = exports.getCountOfLivepoolLampeModeManual = exports.getCountOfActiveLampsOfRacer = exports.getCountOfDesactiveLampsOfLivepool = exports.getCountOfActiveLampsOfLivepool = void 0;
const date_1 = __importDefault(require("../utils/date"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
const livepoolLamp_model_1 = __importDefault(require("../models/livepools/livepoolLamp.model"));
const racerLump_model_1 = __importDefault(require("../models/racers/racerLump.model"));
const livepoolLamp_model_2 = __importDefault(require("../models/livepools/livepoolLamp.model"));
const LmapInterfaces = __importStar(require("..//interfaces/lamp.interface"));
/**
 *% Retrieves the count of active lamps in the Livepool.
 *
 * @returns {Promise<number>} The number of active lamps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfActiveLampsOfLivepool = async () => {
    try {
        // Query the LivepoolPump collection to count all documents with an 'Active' state.
        return await livepoolLamp_model_2.default.countDocuments({
            state: LmapInterfaces.State.Active,
        });
    }
    catch (error) {
        // Log the error using the livepoolLogger for further debugging.
        logger.livepoolLogger.error(error, "Error setting up getCountOfActiveLampsOfLivepool service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfActiveLampsOfLivepool service: ${error}`);
    }
};
exports.getCountOfActiveLampsOfLivepool = getCountOfActiveLampsOfLivepool;
/**
 *% Retrieves the count of deactivated (desactive) lamps in the Livepool.
 *
 * @returns {Promise<number>} The number of deactivated lamps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfDesactiveLampsOfLivepool = async () => {
    try {
        // Query the LivepoolPump collection to count all documents with a 'Desactive' state.
        return await livepoolLamp_model_2.default.countDocuments({
            state: LmapInterfaces.State.Desactive,
        });
    }
    catch (error) {
        // Log the error using the livepoolLogger for further debugging.
        logger.livepoolLogger.error(error, "Error setting up getCountOfDesactivelampsOfLivepool service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfDesactivelampsOfLivepool service: ${error}`);
    }
};
exports.getCountOfDesactiveLampsOfLivepool = getCountOfDesactiveLampsOfLivepool;
/**
 *% Retrieves the count of active lamps in the Racer.
 *
 * @returns {Promise<number>} The number of active lamps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfActiveLampsOfRacer = async () => {
    try {
        // Query the RacerPump collection to count all documents with an 'Active' state.
        return await racerLump_model_1.default.countDocuments({
            state: LmapInterfaces.State.Active,
        });
    }
    catch (error) {
        // Log the error using the racerLogger for further debugging.
        logger.racerLogger.error(error, "Error setting up getCountOfActiveLampssOfRacer service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfActiveLampssOfRacer service: ${error}`);
    }
};
exports.getCountOfActiveLampsOfRacer = getCountOfActiveLampsOfRacer;
/**
 *% Retrieves the count of lamps in the Livepool collection that are set to "Manual" mode
 *% for the current date.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of lamps in "Manual" mode for today in the Livepool.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfLivepoolLampeModeManual = async () => {
    try {
        // Count the documents where the lamp mode is set to Manual and the date is today's date
        return await livepoolLamp_model_1.default.countDocuments({
            mode: LmapInterfaces.Mode.Manual,
            date: (0, date_1.default)().today,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfLivepoolLampeModeManual");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfLivepoolLampeModeManual service: ${error}`);
    }
};
exports.getCountOfLivepoolLampeModeManual = getCountOfLivepoolLampeModeManual;
/**
 *% Retrieves the count of lamps in the Livepool collection that are set to "Horaire" mode
 *% for the current date.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of lamps in "Horaire" mode for today in the Livepool.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfLivepoolLampeModeHoraire = async () => {
    try {
        // Count the documents where the lamp mode is set to Horaire and the date is today's date
        return await livepoolLamp_model_1.default.countDocuments({
            mode: LmapInterfaces.Mode.Horaire,
            date: (0, date_1.default)().today,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfLivepoolLampeModeHoraire");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfLivepoolLampeModeHoraire service: ${error}`);
    }
};
exports.getCountOfLivepoolLampeModeHoraire = getCountOfLivepoolLampeModeHoraire;
/**
 *% Retrieves the count of deactivated (desactive) lamps in the Racer.
 *
 * @returns {Promise<number>} The number of deactivated lamps.
 * @throws Will throw an ErrorResponse if there's an error during the database query.
 */
const getCountOfDesactiveLampsOfRacer = async () => {
    try {
        // Query the RacerPump collection to count all documents with a 'Desactive' state.
        return await racerLump_model_1.default.countDocuments({
            state: LmapInterfaces.State.Desactive,
        });
    }
    catch (error) {
        // Log the error using the racerLogger for further debugging.
        logger.racerLogger.error(error, "Error setting up getCountOfDesactiveLampsOfRacer service");
        // Throw a custom ErrorResponse with details of the error.
        throw new error_handler_1.default(`getCountOfDesactiveLampsOfRacer service: ${error}`);
    }
};
exports.getCountOfDesactiveLampsOfRacer = getCountOfDesactiveLampsOfRacer;
/**
 *% Retrieves the count of racer lamps in the RacerLamp collection that are set to "Manual" mode
 *% for the current date.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of racer lamps in "Manual" mode for today.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfRacerLampeModeManual = async () => {
    try {
        // Count the documents where the lamp mode is set to Manual and the date is today's date
        return await racerLump_model_1.default.countDocuments({
            mode: LmapInterfaces.Mode.Manual,
            date: (0, date_1.default)().today,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfRacerLampeModeManual");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfRacerLampeModeManual service: ${error}`);
    }
};
exports.getCountOfRacerLampeModeManual = getCountOfRacerLampeModeManual;
/**
 *% Retrieves the count of racer lamps in the RacerLamp collection that are set to "Horaire" mode
 *% for the current date.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of racer lamps in "Horaire" mode for today.
 * @throws {ErrorResponse} - Throws an error response if the query fails.
 */
const getCountOfRacerLampeModeHoraire = async () => {
    try {
        // Count the documents where the lamp mode is set to Horaire and the date is today's date
        return await racerLump_model_1.default.countDocuments({
            mode: LmapInterfaces.Mode.Horaire,
            date: (0, date_1.default)().today,
        });
    }
    catch (error) {
        // Log any errors that occur during the query execution
        logger.livepoolLogger.error({ error }, "Error in getCountOfRacerLampeModeHoraire");
        // Throw an error response indicating service failure
        throw new error_handler_1.default(`getCountOfRacerLampeModeHoraire service: ${error}`);
    }
};
exports.getCountOfRacerLampeModeHoraire = getCountOfRacerLampeModeHoraire;
//# sourceMappingURL=lamp.services.js.map