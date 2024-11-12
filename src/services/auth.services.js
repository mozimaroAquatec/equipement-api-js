"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.existUser = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/users/user.model"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
/**
 *% Registers a new user in the database.
 *
 * @param {string} email - The email of the user.
 * @param {string} username - The username of the user.
 * @param {string} password - The hashed password of the user.
 * @param {string} role - The role of the user (e.g., User, Admin).
 * @returns {Promise<User>} The created user object.
 * @throws {ErrorResponse} If there is an error during user creation.
 */
const register = async (username, email, password, role) => {
    try {
        // Create and return the new user document in the database
        return await user_model_1.default.create({
            username,
            email,
            password,
            role,
        });
    }
    catch (error) {
        // Throw an error response if user creation fails
        throw new error_handler_1.default(`create new user service error ${error}`);
    }
};
exports.register = register;
/**
 *% Checks if a user with the given email already exists in the database.
 *
 * @param {string} email - The email to check for existence.
 * @returns {Promise<boolean>} True if the user exists, false otherwise.
 * @throws {ErrorResponse} If there is an error during the existence check.
 */
const existUser = async (email) => {
    try {
        // Check for the existence of the user by counting documents with the given email
        return Boolean(await user_model_1.default.countDocuments({ email }));
    }
    catch (error) {
        // Throw an error response if the existence check fails
        throw new error_handler_1.default(`exist user service error ${error}`);
    }
};
exports.existUser = existUser;
/**
 *% Retrieves a user record from the database based on the provided email.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<User>} - A promise that resolves to the user object if found, or throws an error if the user is not found or if there is a database error.
 * @throws {ErrorResponse} - Throws a custom error if there is a failure during the query execution.
 */
const getUserByEmail = async (email) => {
    try {
        // Find a user by their email address in the Users collection
        const user = await user_model_1.default.findOne({ email });
        // Ensure that a user was found (if not, it will return null)
        if (!user) {
            throw new error_handler_1.default(`User with email ${email} not found.`);
        }
        // Return the found user object
        return user;
    }
    catch (error) {
        // Log and throw a custom error if an error occurs during the process
        throw new error_handler_1.default(`getUserByEmail service error: ${error}`);
    }
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=auth.services.js.map