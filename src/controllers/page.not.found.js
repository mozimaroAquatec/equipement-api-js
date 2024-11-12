"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = __importDefault(require("../utils/error.handler"));
/**
 *% Handles logging and sending a 404 error response for page not found.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
const pageNotFound = (req, res) => {
    // pageNotFoundLogger.info(`Page not found`, { url: req.path });
    res.status(404).json(new error_handler_1.default("page not found")); // Send 404 response
};
exports.default = pageNotFound;
//# sourceMappingURL=page.not.found.js.map