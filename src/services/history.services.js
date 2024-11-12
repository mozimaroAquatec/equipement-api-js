"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquipementHistory = void 0;
const error_handler_1 = __importDefault(require("../utils/error.handler"));
/**
 *% Retrieves the history of an equipment entry based on its MAC address from the provided model.
 *
 * @param {mongoose.Model<any>} modelHistory - The dynamic model representing the history collection of the equipment.
 * @param {string} macAddressField - The field name used to identify the equipment by its MAC address.
 * @param {string} macAddress - The MAC address of the equipment.
 * @returns {Promise<any[]>} - A promise that resolves to an array of history records.
 * @throws {ErrorResponse} - Throws an error if the retrieval fails.
 */
const getEquipementHistory = async (modelHistory, // Dynamic model for equipment history
macAddressField, macAddress) => {
    try {
        // Find all documents in the modelHistory where the macAddressField matches the provided macAddress
        return await modelHistory.find({ [macAddressField]: macAddress });
    }
    catch (error) {
        // Log and throw a custom error with model name and details
        throw new error_handler_1.default(`getEquipementHistory ${modelHistory.modelName} services error: ${error}`);
    }
};
exports.getEquipementHistory = getEquipementHistory;
//# sourceMappingURL=history.services.js.map