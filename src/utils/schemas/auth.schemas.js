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
exports.login = exports.register = exports.emailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const UserInterfaces = __importStar(require("../../interfaces/user.interface"));
/**
 * %Validates a date string using Joi schema.
 *
 * @param {string} email - The email string to validate.
 * @returns  {Joi.ValidationResult} The validation result.
 */
const emailSchema = (email) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
    });
    return schema.validate(email);
};
exports.emailSchema = emailSchema;
/*=======// dateSchema //========*/
/*======= register ========*/
const register = (User) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().trim().min(3).max(100).required(),
        email: joi_1.default.string().trim().min(4).max(100).email().required(),
        password: joi_1.default.string().trim().min(6).required(),
        confirmPassword: joi_1.default.string()
            .trim()
            .required()
            .valid(joi_1.default.ref("password"))
            .messages({
            "any.only": "Confirm password must match password",
        }),
        role: joi_1.default.string()
            .trim()
            .valid(UserInterfaces.Roles.Admin, UserInterfaces.Roles.User)
            .required(),
    });
    return schema.validate(User);
};
exports.register = register;
/*=======// register //========*/
/*======= login ========*/
const login = (User) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().trim().min(4).max(100).email().required(),
        password: joi_1.default.string().trim().min(6).required(),
    });
    return schema.validate(User);
};
exports.login = login;
/*=======// login //========*/
//# sourceMappingURL=auth.schemas.js.map