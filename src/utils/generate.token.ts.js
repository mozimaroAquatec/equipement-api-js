"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *% Generates a JWT token based on the provided user ID, role, and expiration time.
 *
 * @param {Types.ObjectId} id - The user's MongoDB ObjectId.
 * @param {Roles} role - The user's role (e.g., User, Admin).
 * @param {string | number} [expiresIn] - Optional expiration time for the token. Can be a string or number.
 * @returns {Promise<string>} The generated JWT token.
 * @throws {Error} If the secret key is not provided.
 */
const generateToken = async (id, role, expiresIn) => {
    // Retrieve the secret key from environment variables
    const secretKey = process.env.JWT_SECRET;
    // If secretKey is undefined, throw an error
    if (!secretKey)
        throw new Error("No secret key provided, process.env.JWT_SECRET is undefined");
    // Create the payload
    const payload = { id, role };
    // Create the options object
    const options = {};
    if (expiresIn) {
        options.expiresIn = expiresIn;
    }
    // Sign the JWT token with the provided id, role, and optional expiration time
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
//# sourceMappingURL=generate.token.ts.js.map