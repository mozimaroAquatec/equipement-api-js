"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRacerHistoryByMacAddress = exports.updateRacerLocationByMacAddress = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * %Validates a date string using Joi schema.
 *
 * @param {string} Data - The email string to validate.
 * @returns  {Joi.ValidationResult} The validation result.
 */
/*======= updateRacerLocationByMacAddress ========*/
const updateRacerLocationByMacAddress = (data) => {
    const schema = joi_1.default.object({
        macAddress: joi_1.default.string().required(),
        latitude: joi_1.default.string().required(),
        longitude: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.updateRacerLocationByMacAddress = updateRacerLocationByMacAddress;
/*=======// updateRacerLocationByMacAddress //========*/
const getRacerHistoryByMacAddress = (data) => {
    const schema = joi_1.default.object({
        macAddress: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.getRacerHistoryByMacAddress = getRacerHistoryByMacAddress;
/*=======// login //========*/
//# sourceMappingURL=racer.schema.js.map