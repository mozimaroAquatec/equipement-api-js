"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * %Represents a success response object.
 */
class SuccessResponse {
    message;
    data;
    /**
     * %Constructs an instance of SuccessResponse.
     *
     * @param {string} message - The message associated with the success.
     * @@param {any} [data] - (Optional) Additional data associated with the success.
     * @param {string} [status="success"] - The status of the response. Default is "success".
  
     */
    constructor(message, data, status = "success") {
        this.message = message;
        this.data = data;
        this.status = status;
    }
    /**
     * The status of the response.
     * @type {string}
     */
    status;
}
exports.default = SuccessResponse;
//# sourceMappingURL=success.response.js.map