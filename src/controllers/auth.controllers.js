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
exports.login = exports.register = void 0;
const UserInterfaces = __importStar(require("../interfaces/user.interface"));
const authSchemas = __importStar(require("../utils/schemas/auth.schemas"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const authServices = __importStar(require("../services/auth.services"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generate_token_ts_1 = require("../utils/generate.token.ts");
const success_response_1 = __importDefault(require("../utils/success.response"));
const logger = __importStar(require("../logging/index"));
/**
 *% Handles user registration by validating input data, checking for existing users,
 * hashing the password, creating the user in the database, and generating a JWT token.
 *
 **@path auth/register
 * @param {Request} req - The request object containing the user's registration details.
 * @param {Response} res - The response object to send the response.
 * @returns {Promise<Response>} A response object containing a JWT token if registration is successful.
 * @throws {ErrorResponse} If there is an error during the registration process.
 */
const register = async (req, res) => {
    try {
        // Destructure the user details from the request body, with a default role if not provided
        const { username, email, password, confirmPassword, role = UserInterfaces.Roles.User, } = req.body;
        // Validate the input data using the registration schema
        const { error } = authSchemas.register({
            username,
            email,
            password,
            confirmPassword,
            role,
        });
        if (error) {
            // Return a 400 response with the validation error message if validation fails
            return res.status(400).json(new error_handler_1.default(error.details[0].message));
        }
        // Check if the user already exists in the database
        const existUser = await authServices.existUser(email);
        if (existUser) {
            // Return a 409 response if the user already exists
            return res
                .status(409)
                .json(new error_handler_1.default("cet utilisateur existe déjà"));
        }
        // Generate a salt for password hashing
        const saltPassword = bcryptjs_1.default.genSaltSync(10);
        // Hash the user's password
        const hashPassword = bcryptjs_1.default.hashSync(password, saltPassword);
        // Register the new user in the database
        const newUser = await authServices.register(username, email, hashPassword, role);
        // Generate a JWT token for the newly registered user
        const token = await (0, generate_token_ts_1.generateToken)(newUser._id, role);
        // Return a 201 response with the generated token
        return res
            .status(201)
            .json(new success_response_1.default("user create success", { token }));
    }
    catch (error) {
        // Log the error and throw an error response if something goes wrong
        logger.userLogger.error({ error }, "register user controller error");
        throw new error_handler_1.default(`create new user controller error: ${error}`);
    }
};
exports.register = register;
/**
 *% Handles user login by validating credentials and generating a JWT token.
 *
 **@path : /auth/login
 * @param {Request} req - The request object containing the user's email and password.
 * @param {Response} res - The response object to send the response.
 * @returns {Promise<Response>} A response object containing the JWT token if login is successful.
 * @throws {ErrorResponse} If there is an error during the login process.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input data using the login schema
        const { error } = authSchemas.login(req.body);
        if (error) {
            // Return a 400 response with the validation error message
            return res.status(400).json(new error_handler_1.default(error.details[0].message));
        }
        // Check if the user exists in the database
        const existUser = await authServices.existUser(email);
        if (!existUser) {
            // Return a 404 response if the user does not exist
            return res
                .status(404)
                .json(new error_handler_1.default("Le compte utilisateur n'existe pas"));
        }
        // Retrieve the user by email
        const user = await authServices.getUserByEmail(email);
        // Compare the provided password with the hashed password in the database
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            // Return a 401 response if the password is invalid
            return res.status(401).json(new error_handler_1.default("Mot de passe invalid"));
        }
        // Generate a JWT token for the authenticated user
        const token = await (0, generate_token_ts_1.generateToken)(user._id, user.role);
        // Return a 200 response with the generated token
        return res
            .status(200)
            .json(new success_response_1.default("Login Successful", { token }));
    }
    catch (error) {
        // Log the error and throw an error response
        logger.userLogger.error({ error }, "login user controller error");
        throw new error_handler_1.default(`login user controller error: ${error}`);
    }
};
exports.login = login;
//# sourceMappingURL=auth.controllers.js.map