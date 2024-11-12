"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
require("./env.config");
const logging_1 = require("../logging");
mongoose_1.default.set("strictQuery", true);
/**
 * %Asynchronously connects to the MongoDB database.
 *
 * *This function attempts to establish a connection to the MongoDB database
 * *using the connection URI provided in the environment variable `MONGO_URI`.
 * *If the connection is successful, it logs a success message. If the connection
 * *fails, it logs an error message and throws an ErrorResponse with the error details.
 *
 * @async
 * @function connectDB
 * @throws {ErrorResponse} Throws an ErrorResponse if the connection fails.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        logging_1.DBLogger.info("Data base connected successfully");
    }
    catch (error) {
        logging_1.DBLogger.error(error, `mongoose connect error is : ${error}`);
        throw new error_handler_1.default(`mongoose connect error is : ${error}`);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connect.db.js.map