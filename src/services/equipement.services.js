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
exports.getAllEquipements = exports.getCountOfNewConnectOfEquipement = exports.getCountOfDisconnectOfEquipement = exports.getCountOfConnectOfEquipement = void 0;
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const date_1 = __importDefault(require("../utils/date"));
const logger = __importStar(require("../logging/index"));
/**
 *% Get the count of connected equipment for the current day from the provided dynamic model.
 *
 * @param {mongoose.Model<any>} equipementModel - The dynamic model representing the equipment collection.
 * @returns {Promise<number>} - A promise that resolves to the count of connected equipment for today.
 * @throws {ErrorResponse} - Throws a custom error if the count retrieval fails.
 */
const getCountOfConnectOfEquipement = async (equipementModel // Dynamic model for equipment
) => {
    try {
        const dateFn = (0, date_1.default)(); // Assuming getDate().today fetches today's date in the desired format
        // Count documents where the date matches today's date
        const count = await equipementModel.countDocuments({
            date: dateFn.today, // Filter by today's date
        });
        return count;
    }
    catch (error) {
        // Log the error with details about the dynamic model
        logger.equipementLogger.error({ error }, `getCountOfConnectOfEquipement ${equipementModel.modelName} service error`);
        // Throw a custom error response with model name and error details
        throw new error_handler_1.default(`getCountOfConnectOfEquipement ${equipementModel.modelName} ${error}`);
    }
};
exports.getCountOfConnectOfEquipement = getCountOfConnectOfEquipement;
/**
 *% Get the count of disconnected equipment based on the date.
 *
 * @param {mongoose.Model<any>} equipementModel - The dynamic mongoose model for the equipment.
 * @returns {Promise<number>} - The count of documents where the date is not today's date.
 * @throws {ErrorResponse} - Throws a custom error if the count operation fails.
 */
const getCountOfDisconnectOfEquipement = async (equipementModel // Dynamic model for equipment
) => {
    try {
        const dateFn = (0, date_1.default)(); // Fetch today's date
        // Count documents where the date is not equal to today's date
        const count = await equipementModel.countDocuments({
            date: { $ne: dateFn.today }, // $ne operator means "not equal"
        });
        return count;
    }
    catch (error) {
        // Log the error, including the model name to help identify the source
        logger.equipementLogger.error({ error }, `getCountOfDisconnectOfEquipement ${equipementModel.modelName} service error`);
        // Throw a custom error response with the model name and error message
        throw new error_handler_1.default(`getCountOfDisconnectOfEquipement ${equipementModel.modelName} ${error}`);
    }
};
exports.getCountOfDisconnectOfEquipement = getCountOfDisconnectOfEquipement;
/**
 *% Get the count of new equipment connections based on the date and connection status.
 *
 * @param {mongoose.Model<any>} equipementModel - The dynamic mongoose model for the equipment.
 * @returns {Promise<number>} - The count of new connections where the date is today's date.
 * @throws {ErrorResponse} - Throws a custom error if the count operation fails.
 */
const getCountOfNewConnectOfEquipement = async (equipementModel // Dynamic model for equipment
) => {
    try {
        const dateFn = (0, date_1.default)(); // Fetch today's date
        // Count documents where the date is today's date and either firstConnect or returnedConnect is true
        return await equipementModel.countDocuments({
            $and: [
                { date: dateFn.today }, // Ensure the date is today's date
                { $or: [{ firstConnect: true }, { returnedConnect: true }] }, // Either firstConnect or returnedConnect should be true
            ],
        });
    }
    catch (error) {
        // Log the error with the model name for better traceability
        logger.equipementLogger.error({ error }, `getCountOfNewConnectOfEquipement ${equipementModel.modelName} service error`);
        // Throw a custom error response with the model name and error details
        throw new error_handler_1.default(`getCountOfNewConnectOfEquipement ${equipementModel.modelName} ${error}`);
    }
};
exports.getCountOfNewConnectOfEquipement = getCountOfNewConnectOfEquipement;
/**
 *% Get all equipment records from the provided model.
 *
 * @param {mongoose.Model<any>} equipementModel - The dynamic mongoose model to fetch records from.
 * @returns {Promise<any[]>} - A promise that resolves to an array of equipment records.
 * @throws {ErrorResponse} - Throws a custom error if the query fails.
 */
const getAllEquipements = async (equipementModel // Dynamic model for equipment
) => {
    try {
        return await equipementModel.find(); // Fetch all documents from the collection
    }
    catch (error) {
        // Log the error with the model name for better traceability
        logger.equipementLogger.error({ error }, `getAllEquipements ${equipementModel.modelName} error`);
        // Throw a custom error response with the model name and error details
        throw new error_handler_1.default(`getAllEquipements ${equipementModel.modelName} error: ${error}`);
    }
};
exports.getAllEquipements = getAllEquipements;
//# sourceMappingURL=equipement.services.js.map