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
exports.getAllLivepool = exports.removeDuplicatesOfLivepool = exports.getDuplicatesOFLivepool = exports.getModeLampInfoOfLivepool = exports.getModePumpsInfoOfLivepool = exports.getCountOFConnectOfLivepoolsOfYesterday = exports.getCountOfConnectOfLivepoolsOfYesterdayAndToday = exports.getCountOfTotalOfLivepool = exports.getCountOfNewOfDisconnectOfLivepools = exports.getCountOfDisconnectOfLivepools = exports.getCountOfNewConnectOfLivepools = exports.getCountOfConnectOfLivepools = exports.getLivepoolConnect = exports.getLivepools = void 0;
const livepool_model_1 = __importDefault(require("../models/livepools/livepool.model"));
const date_1 = __importDefault(require("../utils/date"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const logger = __importStar(require("../logging/index"));
const livepoolHelpers = __importStar(require("../helpers/livepool.helpers"));
const EquipementInterfaces = __importStar(require("../interfaces/equipement.interfaces"));
/**
 *% Get Livepool documents that match the provided MAC address and status.
 *
 * @param {string} searchMacAddress - The MAC address to search for (supports partial matches with regex).
 * @param {string} status - The status filter to apply ('all-connect', 'new-connect', 'all-disconnect', 'new-disconnect').
 * @returns {Promise<LivepoolInterfaces.GetLivepools[]>} A promise that resolves to a list of Livepool documents that match the search criteria.
 * @throws {ErrorResponse} Throws an error response if the operation fails.
 */
const getLivepools = async (searchMacAddress, status, pumpMode) => {
    try {
        // Get the date information including.
        // Initialize an empty array to hold the result
        let livepools = [];
        // Perform the search based on the provided status
        if (status === EquipementInterfaces.EquipementStatusParams.AllConnect) {
            // Find all Livepool documents with today's date that match the provided MAC address
            //% Added $options: 'i' to the regex to make the search case-insensitive
            livepools = (await livepool_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress, $options: "i" } },
                    { date: (0, date_1.default)().today },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("location"));
            livepools = livepoolHelpers.filterLivepoolByPumpModes(livepools, pumpMode);
        }
        else if (status === EquipementInterfaces.EquipementStatusParams.NewConnect) {
            // Find new connections (first connect or reconnect) with today's date that match the provided MAC address
            livepools = (await livepool_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress, $options: "i" } },
                    {
                        $or: [
                            { status: EquipementInterfaces.EquipementStatus.FirstConnect },
                            { status: EquipementInterfaces.EquipementStatus.Reconnect },
                        ],
                    },
                    { date: (0, date_1.default)().today },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("location"));
            livepools = livepoolHelpers.filterLivepoolByPumpModes(livepools, pumpMode);
        }
        else if (status === EquipementInterfaces.EquipementStatusParams.AllDisconnect) {
            // Find all Livepool documents with dates other than today that match the provided MAC address
            livepools = (await livepool_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress, $options: "i" } },
                    { date: { $ne: (0, date_1.default)().today } },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("location"));
        }
        else if (status === EquipementInterfaces.EquipementStatusParams.NewDisconnect) {
            // Find new disconnections (first disconnect or returned disconnect) with yesterday's date that match the provided MAC address
            livepools = (await livepool_model_1.default.find({
                $and: [
                    { macAddress: { $regex: searchMacAddress, $options: "i" } },
                    { date: (0, date_1.default)().yesterday },
                ],
            })
                .populate("pump")
                .populate("lamp")
                .populate("location"));
        }
        // Return the list of livepools that match the search criteria
        return livepools;
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.livepoolLogger.error(error, "Error in getLivepools service");
        // Throw an error response with the error details
        throw new error_handler_1.default(`getLivepools service error: ${error}`);
    }
};
exports.getLivepools = getLivepools;
/**
 *% Get livepool records for today's date.
 *
 * @returns {Promise<LivepoolInterfaces.LivepoolInterface[]>} - A promise that resolves to an array of livepool records.
 * @throws {ErrorResponse} - Throws a custom error if the database query fails.
 */
const getLivepoolConnect = async () => {
    try {
        // Query livepool records where the date matches today's date
        // Populate the 'pump' and 'lamp' fields with related data from the respective collections
        return await livepool_model_1.default.find({ date: (0, date_1.default)().today })
            .populate("pump") // Populates 'pump' field with related data
            .populate("lamp") // Populates 'lamp' field with related data
            .populate("location"); // Populates 'location' field with related data
    }
    catch (error) {
        // Log the error with the function name for better traceability
        logger.livepoolLogger.error(error, "getLivepoolConnect");
        // Throw a custom error response with details of the error
        throw new error_handler_1.default(`getLivepoolConnect error: ${error}`);
    }
};
exports.getLivepoolConnect = getLivepoolConnect;
/**
 *% Get the count of Livepool documents for today's date.
 *
 * @returns {Promise<number>} The count of Livepool documents for today's date.
 * @throws {ErrorResponse} Throws an error response if an error occurs.
 */
const getCountOfConnectOfLivepools = async () => {
    try {
        // Get the current date in the required format
        // Count the number of live pools for today
        const countOfConnectOfLivepools = await livepool_model_1.default.countDocuments({
            date: (0, date_1.default)().today,
        });
        // Return the count of Livepool documents
        return countOfConnectOfLivepools;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "Error in getCountOfConnectOfLivepools service");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfConnectOfLivepools: ${error}`);
    }
};
exports.getCountOfConnectOfLivepools = getCountOfConnectOfLivepools;
/**
 *% Get the count of new Livepool connections for today.
 *
 * @returns {Promise<number>} The count of new Livepool connections.
 * @throws {ErrorResponse} If there is an error retrieving the count.
 */
const getCountOfNewConnectOfLivepools = async () => {
    try {
        // Count documents in the Livepool collection where the date is today and either firstConnect or returnedConnect is true
        const countOfNewLivepoolsConnect = await livepool_model_1.default.countDocuments({
            $and: [
                { date: (0, date_1.default)().today },
                { $or: [{ firstConnect: true }, { returnedConnect: true }] },
            ],
        });
        // Return the count of new Livepool connections
        return countOfNewLivepoolsConnect;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "Error in getCountOfNewConnectOfLivepools service");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfNewConnectOfLivepools service: ${error}`);
    }
};
exports.getCountOfNewConnectOfLivepools = getCountOfNewConnectOfLivepools;
/**
 * %Get the count of Livepool documents that are not updated with today's date.
 *
 * @returns {Promise<number>} The count of Livepool documents with dates not equal to today's date.
 * @throws {ErrorResponse} Throws an error if the database operation fails.
 */
const getCountOfDisconnectOfLivepools = async () => {
    try {
        const countOfDisconnectOfLivepools = await livepool_model_1.default.countDocuments({
            date: { $ne: (0, date_1.default)().today },
        });
        return countOfDisconnectOfLivepools;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "Error retrieving count of disconnect Livepools");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfDisconnectOfLivepools: ${error}`);
    }
};
exports.getCountOfDisconnectOfLivepools = getCountOfDisconnectOfLivepools;
/**
 *% Get the count of Livepool documents that have the date of yesterday.
 *
 * @returns {Promise<number>} The count of Livepool documents with the date of yesterday.
 * @throws {ErrorResponse} Throws an error if the database operation fails.
 */
const getCountOfNewOfDisconnectOfLivepools = async () => {
    try {
        // Get the date information
        // Count the number of Livepool documents for yesterday
        const countDisconnectOfLivepoolsOfToday = await livepool_model_1.default.countDocuments({
            date: (0, date_1.default)().yesterday,
        });
        // Return the count of Livepool documents
        return countDisconnectOfLivepoolsOfToday;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "Error in getCountOfNewOfDisconnectOfLivepools service");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfNewOfDisconnectOfLivepools service: ${error}`);
    }
};
exports.getCountOfNewOfDisconnectOfLivepools = getCountOfNewOfDisconnectOfLivepools;
/**
 *% Get the total count of documents in the Livepool collection.
 *
 * @returns {Promise<number>} The total count of Livepool documents.
 * @throws {ErrorResponse} If an error occurs during the count operation.
 */
const getCountOfTotalOfLivepool = async () => {
    try {
        // Count the total number of documents in the Livepool collection
        return await livepool_model_1.default.countDocuments();
    }
    catch (error) {
        // Log the error for debugging purposes
        logger.livepoolLogger.error(error, "Error in getCountOfTotalsOfLivepool service");
        // Throw a custom error response with details about the error
        throw new error_handler_1.default(`getCountOfTotalsOfLivepool service: ${error}`);
    }
};
exports.getCountOfTotalOfLivepool = getCountOfTotalOfLivepool;
/**
 * % Get the count of Livepool connections for yesterday and today.
 *
 * @returns {Promise<number>} The count of Livepool connections for yesterday and today.
 * @throws {ErrorResponse} If there is an error retrieving the count.
 */
const getCountOfConnectOfLivepoolsOfYesterdayAndToday = async () => {
    try {
        // Get the current date in the required format
        // Count documents in the Livepool collection where firstConnect
        //and returnedConnect are both false and the date matches the current date format
        const countOfConnectOfLivepoolsOfYesterdayAndToday = livepool_model_1.default.countDocuments({
            $and: [
                { firstConnect: false },
                { returnedConnect: false },
                { date: (0, date_1.default)().today },
            ],
        });
        // Return the count
        return countOfConnectOfLivepoolsOfYesterdayAndToday;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "getCountOfConnectOfLivepoolsOfYesterdayAndToday");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOfConnectOfLivepoolsOfYesterdayAndToday ${error}`);
    }
};
exports.getCountOfConnectOfLivepoolsOfYesterdayAndToday = getCountOfConnectOfLivepoolsOfYesterdayAndToday;
/**
 * % Get the count of Livepool connections from yesterday.
 *
 * @returns {Promise<number>} The count of Livepool connections from yesterday.
 * @throws {ErrorResponse} If there is an error retrieving the count.
 */
const getCountOFConnectOfLivepoolsOfYesterday = async () => {
    try {
        // Get the count of Livepool disconnections from yesterday
        const countOfDisconnectOfLivepoolsOfToday = await (0, exports.getCountOfNewOfDisconnectOfLivepools)();
        // Get the count of Livepool connections from yesterday and today
        const countConnectOfLivepoolsOfYesterdayAndToday = await (0, exports.getCountOfConnectOfLivepoolsOfYesterdayAndToday)();
        // Calculate the count of Livepool connections from yesterday
        const countOFConnectOfLivepoolsOFYesterday = countOfDisconnectOfLivepoolsOfToday +
            countConnectOfLivepoolsOfYesterdayAndToday;
        // Return the count, defaulting to 0 if undefined
        return countOFConnectOfLivepoolsOFYesterday || 0;
    }
    catch (error) {
        // Log the error
        logger.livepoolLogger.error(error, "getCountOFConnectOfLivepoolsOfYesterday");
        // Throw a custom error response
        throw new error_handler_1.default(`getCountOFConnectOfLivepoolsOfYesterday ${error}`);
    }
};
exports.getCountOFConnectOfLivepoolsOfYesterday = getCountOFConnectOfLivepoolsOfYesterday;
/**
 *% Get the number of Livepool records based on the specified pump mode.
 *
 * @param {PumpInterfaces.Mode} mode - The mode of the pump to filter the Livepool records by.
 * @returns {Promise<number>} A promise that resolves to the number of Livepool records matching the specified pump mode.
 * @throws {ErrorResponse} Throws an error if there's an issue retrieving or filtering the data.
 */
const getModePumpsInfoOfLivepool = async (mode) => {
    try {
        // Initialize an array to store pump information
        let pumpsInfo = [];
        // Fetch the connected Livepool records for today
        let livepoolConnect = await (0, exports.getLivepoolConnect)();
        // Filter the Livepool records by the specified pump mode
        pumpsInfo = livepoolHelpers.filterLivepoolByPumpModes(livepoolConnect, mode);
        // Return the number of filtered Livepool records
        return pumpsInfo.length;
    }
    catch (error) {
        // Log the error for troubleshooting
        logger.livepoolLogger.error(error, "getModePumpsInfoOfLivepool");
        // Throw a custom error response
        throw new error_handler_1.default(`getModePumpsInfoOfLivepool error: ${error}`);
    }
};
exports.getModePumpsInfoOfLivepool = getModePumpsInfoOfLivepool;
/**
 *% Get the number of Livepool records based on the specified lamp mode.
 *
 * @param {LampInterfaces.Mode} mode - The mode of the lamp to filter the Livepool records by.
 * @returns {Promise<number>} A promise that resolves to the number of Livepool records matching the specified lamp mode.
 * @throws {ErrorResponse} Throws an error if there's an issue retrieving or filtering the data.
 */
const getModeLampInfoOfLivepool = async (mode) => {
    try {
        // Initialize an array to store lamp information
        let lampsInfo = [];
        // Fetch the connected Livepool records for today
        let livepoolConnect = await (0, exports.getLivepoolConnect)();
        // Filter the Livepool records by the specified lamp mode
        lampsInfo = livepoolHelpers.filterLivepoolByLampModes(livepoolConnect, mode);
        // Return the number of filtered Livepool records
        return lampsInfo.length;
    }
    catch (error) {
        // Log the error for troubleshooting
        logger.livepoolLogger.error(error, "getModeLampInfoOfLivepool");
        // Throw a custom error response
        throw new error_handler_1.default(`getModeLampInfoOfLivepool error: ${error}`);
    }
};
exports.getModeLampInfoOfLivepool = getModeLampInfoOfLivepool;
/**
 *% Retrieves the list of Livepool documents that have duplicate MAC addresses.
 *
 * @returns {Promise<Array>} The list of duplicate Livepool documents.
 * @throws {ErrorResponse} Throws an error response if an error occurs.
 */
const getDuplicatesOFLivepool = async () => {
    try {
        // Define the aggregation pipeline
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
        // Execute the aggregation pipeline to find duplicate Livepool documents
        const duplicatesLivepool = await livepool_model_1.default.aggregate(pipeline);
        // Return the list of duplicates
        return duplicatesLivepool;
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.livepoolLogger.error({ error }, "Error in getDuplicatesOFLivepool service");
        // Throw an error response with the error details
        throw new error_handler_1.default(`getDuplicatesOFLivepool service error: ${error}`);
    }
};
exports.getDuplicatesOFLivepool = getDuplicatesOFLivepool;
/**
 *% Removes duplicate Livepool documents, keeping only the one with the most recent date.
 *
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {ErrorResponse} Throws an error response if an error occurs.
 */
const removeDuplicatesOfLivepool = async () => {
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
        // Execute the aggregation pipeline to find duplicate Livepool documents
        const duplicatesLivepool = await livepool_model_1.default.aggregate(pipeline);
        // Iterate through each group of duplicates
        for (const group of duplicatesLivepool) {
            const { latestDoc, documents } = group;
            // Filter out the latest document to get the older ones
            const documentsToDelete = documents.filter((doc) => doc._id.toString() !== latestDoc._id.toString());
            // Remove the older documents
            await livepool_model_1.default.deleteMany({
                _id: { $in: documentsToDelete.map((doc) => doc._id) },
            });
        }
    }
    catch (error) {
        // Log the error if something goes wrong
        logger.livepoolLogger.error({ error }, "Error in removeDuplicatesOFLivepool service");
        // Throw an error response with the error details
        throw new error_handler_1.default(`removeDuplicatesOFLivepool service error: ${error}`);
    }
};
exports.removeDuplicatesOfLivepool = removeDuplicatesOfLivepool;
/**
 *% Get all livepool records from the database.
 *
 * @returns {Promise<LivepoolInterfaces.LivepoolInterface[]>} - A promise that resolves to an array of all livepool records.
 * @throws {ErrorResponse} - Throws a custom error if the database query fails.
 */
const getAllLivepool = async () => {
    try {
        // Retrieve all livepool records from the database
        return await livepool_model_1.default.find();
    }
    catch (error) {
        // Log the error with the function name for better traceability
        logger.livepoolLogger.error({ error }, "getAllLivepool");
        // Throw a custom error response with details of the error
        throw new error_handler_1.default(`getAllLivepool error: ${error}`);
    }
};
exports.getAllLivepool = getAllLivepool;
//# sourceMappingURL=livepool.services.js.map