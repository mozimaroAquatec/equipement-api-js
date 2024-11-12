"use strict";
/**
 * %Custom error class representing an HTTP error response.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    message;
    status; // Define status as a property
    /**
     * %Constructs an instance of ErrorResponse.
     *
     * @param {string} message - The error message.
     * @param {string} status - (Optional) The HTTP status code associated with the error. Default is "fail".
     */
    constructor(message, status = "fail") {
        super(message); // Call the parent class's constructor
        this.message = message;
        this.status = status; // Assign the status property
    }
}
exports.default = ErrorResponse;
//# sourceMappingURL=error.handler.js.map