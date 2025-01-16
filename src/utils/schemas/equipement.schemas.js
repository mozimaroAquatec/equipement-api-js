"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquipementLocation = exports.createEquipementsLocationByequipement = exports.getEquipement = exports.getEquipementHistory = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * %Validates a date string using Joi schema.
 *
 * @param {string} data - The email string to validate.
 * @returns  {Joi.ValidationResult} The validation result.
 */
/*======= getEquipementHistoryByequipement ========*/
const getEquipementHistory = (data) => {
    const schema = joi_1.default.object({
        equipementHistoryModel: joi_1.default.string().required(),
        macAddressField: joi_1.default.string().required(),
        macAddress: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.getEquipementHistory = getEquipementHistory;
/*=======// getEquipementHistoryByequipement //========*/
/*======= getEquipementHistoryByequipement ========*/
const getEquipement = (data) => {
    const schema = joi_1.default.object({
        equipementModel: joi_1.default.string().required(),
        macAddress: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.getEquipement = getEquipement;
/*=======// getEquipementHistoryByequipement //========*/
/*======= getEquipementHistoryByequipement ========*/
const createEquipementsLocationByequipement = (data) => {
    const schema = joi_1.default.object({
        equipementModel: joi_1.default.string().required(),
        equipementLocationModel: joi_1.default.string().required(),
        macAddressField: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.createEquipementsLocationByequipement = createEquipementsLocationByequipement;
/*=======// getEquipementHistoryByequipement //========*/
/*======= getEquipementLocation ========*/
const getEquipementLocation = (data) => {
    const schema = joi_1.default.object({
        equipementLocationModel: joi_1.default.string().required(),
        id: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.getEquipementLocation = getEquipementLocation;
/*=======// getEquipementLocation //========*/
/*=======// getEquipementLocation //========*/
//# sourceMappingURL=equipement.schemas.js.map