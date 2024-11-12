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
exports.existRacerByMacAddress = exports.getAllRacers = exports.removeDuplicatesOfRacer = exports.getCountOfTotalOfRacer = exports.getDuplicatesRacer = exports.getModeLampInfoOfRacer = exports.getModePumpsInfoOfRacer = exports.getCountOfNewDisconnectOfRacer = exports.getCountOfNewConnectOfRacers = exports.getCountOfDisconnectOfRacers = exports.getCountOfConnectOfRacers = exports.getRacerConnect = exports.getRacers = void 0;
const date_1 = __importDefault(require("../utils/date"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
const RacerInterfaces = __importStar(require("../interfaces/racer.interface"));
const racer_model_1 = __importDefault(require("../models/racers/racer.model"));
const CommonInterfaces = __importStar(require("../interfaces/common.interface"));
const racerHelpers = __importStar(require("../helpers/racer.helpers"));
/**
 * %Service function to get racers that match the provided MAC address and date.
 *
 * @param {string} searchMacAddress - The MAC address to search for (supports partial matches with regex)
 * @returns {Promise<GetRacers[]>} - A promise that resolves to a list of racers that match the search criteria
 * @throws {ErrorResponse} - Throws an error response if the operation fails
 */
const getRacers = async (searchMacAddress, status, pumpMode) => {
    try {
        const dateFn = (0, date_1.default)();
        let racers = [];
        if (status === CommonInterfaces.EquipmentStatus.AllConnect) {
            racers = (await racer_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress } },
                    { date: dateFn.today },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("history")
                .populate("location"));
            racers = racerHelpers.filterRacerByPumpModes(racers, pumpMode);
        }
        else if (status === CommonInterfaces.EquipmentStatus.NewConnect) {
            racers = (await racer_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress } },
                    {
                        $or: [
                            { status: RacerInterfaces.Status.FirstConnect },
                            { status: RacerInterfaces.Status.Reconnect },
                        ],
                    },
                    { date: dateFn.today },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("history")
                .populate("location"));
            racers = racerHelpers.filterRacerByPumpModes(racers, pumpMode);
        }
        else if (status === CommonInterfaces.EquipmentStatus.AllDisconnect) {
            racers = (await racer_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress } },
                    { date: { $ne: dateFn.today } },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("history")
                .populate("location"));
        }
        else if (status === CommonInterfaces.EquipmentStatus.NewDisconnect) {
            racers = (await racer_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress } },
                    { date: dateFn.yesterday },
                    // {
                    //   $or: [
                    //     { status: RacerInterfaces.Status.FirstDisconnect },
                    //     { status: RacerInterfaces.Status.ReturndDisconnect },
                    //   ],
                    // },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("history")
                .populate("location"));
        }
        // Return the list of racers that match the search criteria
        return racers;
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.racerLogger.error(error, "get all racers services error");
        // Throw an error response with the error details
        throw new error_handler_1.default(`get all racers services error : ${error}`);
    }
};
exports.getRacers = getRacers;
/**
 *% Retrieves the list of Racer documents that are connected for today.
 *
 * @throws {ErrorResponse} Throws an error if there's an issue retrieving the data.
 */
const getRacerConnect = async () => {
    try {
        // Find racer records where the date matches today's date
        // Populate the 'pump' and 'lamp' fields with related data
        return await racer_model_1.default.find({ date: (0, date_1.default)().today })
            .populate("pump")
            .populate("lamp")
            .populate("location");
    }
    catch (error) {
        // Log the error for troubleshooting
        logger.racerLogger.error(error, "getRacerConnect");
        // Throw a custom error response
        throw new error_handler_1.default(`getRacerConnect error: ${error}`);
    }
};
exports.getRacerConnect = getRacerConnect;
/**
 * % Gets the count of racers for Today (all racers connect).
 *
 * @returns {Promise<number>} - The count of connect of live pools for today.
 * @throws {ErrorResponse} - Throws an error response if an error occurs.
 */
const getCountOfConnectOfRacers = async () => {
    try {
        const dateFn = (0, date_1.default)();
        const countOfCoonectOfRacers = await racer_model_1.default.countDocuments({
            date: dateFn.today,
        });
        // Return the count
        return countOfCoonectOfRacers;
    }
    catch (error) {
        // Log the error
        logger.racerLogger.error(error, "getracersInfo");
        // Throw a custom error response
        throw new error_handler_1.default(`getracersInfo ${error}`);
    }
};
exports.getCountOfConnectOfRacers = getCountOfConnectOfRacers;
/**
 * % Retrieves the count of Racers documents that are not updated with the current date.
 *
 * @returns {Promise<number>} The count of Racers documents with dates not equal to the current date.
 * @throws {ErrorResponse} Throws an error if the database operation fails.
 */
const getCountOfDisconnectOfRacers = async () => {
    try {
        const dateFn = (0, date_1.default)();
        const countOfRacersDiscoonect = await racer_model_1.default.countDocuments({
            date: { $ne: dateFn.today },
        });
        return countOfRacersDiscoonect;
    }
    catch (error) {
        // Log the error
        logger.racerLogger.error(error, "getCountOfDisconnectOfRacers services");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfDisconnectOfRacers services ${error}`);
    }
};
exports.getCountOfDisconnectOfRacers = getCountOfDisconnectOfRacers;
/**
 * % Gets the count of new Racers connections.
 *
 * @returns {Promise<number>} The count of new racer connections.
 * @throws {ErrorResponse} If there is an error retrieving the count.
 */
const getCountOfNewConnectOfRacers = async () => {
    try {
        const dateFn = (0, date_1.default)();
        // Count documents in the racer collection where firstConnect and returnedConnect are both true
        const countOfNewRacersConenct = await racer_model_1.default.countDocuments({
            $and: [
                { date: dateFn.today },
                { $or: [{ firstConnect: true }, { returnedConnect: true }] },
            ],
        });
        // Return the count
        return countOfNewRacersConenct;
    }
    catch (error) {
        // Log the error
        logger.racerLogger.error(error, "getCountOfNewConnectOfRacers service");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfNewConnectOfRacers service ${error}`);
    }
};
exports.getCountOfNewConnectOfRacers = getCountOfNewConnectOfRacers;
/**
 * % Retrieves the count of racer documents that have the date of yesterday.
 *
 * @returns {Promise<number>} The count of racer documents with the date of yesterday.
 * @throws {ErrorResponse} Throws an error if the database operation fails.
 */
const getCountOfNewDisconnectOfRacer = async () => {
    try {
        // Get the current date in the required format
        const dateFn = (0, date_1.default)();
        // Count the number of live pools for yesterday
        const countOfNewDisconnectOfRacer = await racer_model_1.default.countDocuments({
            date: dateFn.yesterday,
        });
        // Return the count
        return countOfNewDisconnectOfRacer;
    }
    catch (error) {
        // Log the error
        logger.racerLogger.error(error, "getCountOfNewDisconnectOfRacer service");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfNewDisconnectOfRacer service ${error}`);
    }
};
exports.getCountOfNewDisconnectOfRacer = getCountOfNewDisconnectOfRacer;
/**
 *% Retrieves the number of Racer records based on the specified pump mode.
 *
 * @param {PumpInterfaces.Mode} mode - The mode of the pump to filter the Racer records by.
 * @returns {Promise<number>} A promise that resolves to the number of Racer records matching the specified pump mode.
 * @throws {ErrorResponse} Throws an error if there's an issue retrieving or filtering the data.
 */
const getModePumpsInfoOfRacer = async (mode) => {
    try {
        // Initialize an array to store pump information
        let pumpsInfo = [];
        // Fetch the connected Racerrecords for today
        let racerConnect = await (0, exports.getRacerConnect)();
        // Filter the Racerrecords by the specified pump mode
        pumpsInfo = racerHelpers.filterRacerByPumpModes(racerConnect, mode);
        // Return the number of filtered Racer records
        return pumpsInfo.length;
    }
    catch (error) {
        // Log the error for troubleshooting
        logger.racerLogger.error(error, "getModePumpsInfoOfRacer");
        // Throw a custom error response
        throw new error_handler_1.default(`getModePumpsInfoOfRacer error: ${error}`);
    }
};
exports.getModePumpsInfoOfRacer = getModePumpsInfoOfRacer;
/**
 *% Retrieves the number of Racer records based on the specified lamp mode.
 *
 * @param {LampInterfaces.Mode} mode - The mode of the lamp to filter the Racer records by.
 * @returns {Promise<number>} A promise that resolves to the number of Racer records matching the specified lamp mode.
 * @throws {ErrorResponse} Throws an error if there's an issue retrieving or filtering the data.
 */
const getModeLampInfoOfRacer = async (mode) => {
    try {
        // Initialize an array to store lamp information
        let lampsInfo = [];
        // Fetch the connected Racer records for today
        let racerConnect = await (0, exports.getRacerConnect)();
        // Filter the Racer records by the specified lamp mode
        lampsInfo = racerHelpers.filterRacerByLampModes(racerConnect, mode);
        // Return the number of filtered Racer records
        return lampsInfo.length;
    }
    catch (error) {
        // Log the error for troubleshooting
        logger.racerLogger.error(error, "getModeLampInfoOfRacer");
        // Throw a custom error response
        throw new error_handler_1.default(`getModeLampInfoOfRacer error: ${error}`);
    }
};
exports.getModeLampInfoOfRacer = getModeLampInfoOfRacer;
/**
 *% Retrieves the list of Racer documents that have duplicate MAC addresses.
 *
 * @returns {Promise<Array>} The list of duplicate Racer documents.
 * @throws {ErrorResponse} Throws an error response if an error occurs.
 */
const getDuplicatesRacer = async () => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$macAddress",
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gt: 1 },
                },
            },
        ];
        const duplicatesRacer = await racer_model_1.default.aggregate(pipeline);
        return duplicatesRacer;
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.racerLogger.error(error, "get repeat racers services error");
        // Throw an error response with the error details
        throw new error_handler_1.default(`get repeat racers services error : ${error}`);
    }
};
exports.getDuplicatesRacer = getDuplicatesRacer;
/**
 *% Retrieves the total count of documents in the Racer collection.
 *
 * @returns {Promise<number>} The total count of Racer documents.
 * @throws {ErrorResponse} If an error occurs during the count operation.
 */
const getCountOfTotalOfRacer = async () => {
    try {
        // Count the total number of documents in the Racer collection
        return await racer_model_1.default.countDocuments();
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.racerLogger.error(error, "Error in getCountOfTotalsOfRacer service");
        // Throw a custom error response with details about the error
        throw new error_handler_1.default(`getCountOfTotalsOfRacer service: ${error}`);
    }
};
exports.getCountOfTotalOfRacer = getCountOfTotalOfRacer;
/**
 *% Removes duplicate Racer documents, keeping only the one with the most recent date.
 *
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {ErrorResponse} Throws an error response if an error occurs.
 */
const removeDuplicatesOfRacer = async () => {
    try {
        // Define the aggregation pipeline to find duplicates and keep the latest by date
        const pipeline = [
            {
                $sort: {
                    macAddress: 1, // Sort by macAddress in ascending order
                    date: -1, // Sort by date in descending order (most recent first)
                },
            },
            {
                $group: {
                    _id: "$macAddress",
                    latestDoc: { $first: "$$ROOT" },
                    documents: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gt: 1 },
                },
            },
        ];
        // Execute the aggregation pipeline to find duplicate racer documents
        const duplicatesracer = await racer_model_1.default.aggregate(pipeline);
        // Iterate through each group of duplicates
        for (const group of duplicatesracer) {
            const { latestDoc, documents } = group;
            // Filter out the latest document to get the older ones
            const documentsToDelete = documents.filter((doc) => doc._id.toString() !== latestDoc._id.toString());
            // Remove the older documents
            await racer_model_1.default.deleteMany({
                _id: { $in: documentsToDelete.map((doc) => doc._id) },
            });
        }
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.racerLogger.error(error, "Error in removeDuplicatesOfRacer service");
        // Throw an error response with the error details
        throw new error_handler_1.default(`removeDuplicatesOfRacer service error: ${error}`);
    }
};
exports.removeDuplicatesOfRacer = removeDuplicatesOfRacer;
/**
 *% Fetches all racer records from the database.
 *
 * @returns {Promise<RacerInterface[]>} - A promise that resolves to an array of all racer records.
 * @throws {ErrorResponse} - Throws a custom error if the database query fails.
 */
const getAllRacers = async () => {
    try {
        // Retrieve all racer records from the database
        return await racer_model_1.default.find();
    }
    catch (error) {
        // Log the error with the function name for better traceability
        logger.racerLogger.error(error, "getAllRacers");
        // Throw a custom error response with details of the error
        throw new error_handler_1.default(`getAllRacers error: ${error}`);
    }
};
exports.getAllRacers = getAllRacers;
/**
 *% Checks if a racer record exists based on the provided MAC address.
 *
 * @param {string} macAddress - The MAC address of the racer to check.
 * @returns {Promise<number>} - A promise that resolves to the count of racer records with the specified MAC address.
 * @throws {ErrorResponse} - Throws a custom error if the database query fails.
 */
const existRacerByMacAddress = async (macAddress) => {
    try {
        // Count the number of racer records with the given macAddress
        return await racer_model_1.default.countDocuments({ macAddress });
    }
    catch (error) {
        // Log the error with the function name for better traceability
        logger.racerLogger.error(error, "existRacerByMacAddress");
        // Throw a custom error response with details of the error
        throw new error_handler_1.default(`existRacerByMacAddress error: ${error}`);
    }
};
exports.existRacerByMacAddress = existRacerByMacAddress;
//# sourceMappingURL=racer.services.js.map