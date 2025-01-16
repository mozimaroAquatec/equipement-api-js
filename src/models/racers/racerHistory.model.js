"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the Lamp collection
const RaceHistorySchema = new mongoose_1.default.Schema({
    racerMacaddress: {
        type: String,
        required: true,
        ref: "Racer", // Reference to the Racer model
    },
    disconnectDate: {
        type: String,
        required: true,
    },
    reconnectDate: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    firstConnection: {
        type: String,
        required: true,
    },
    lastUpdatedTime: {
        type: String,
        required: true,
    },
    falseTime: {
        type: String,
        required: true,
        default: "",
    },
    isFalseDate: {
        type: Boolean,
        default: false,
        required: true,
    },
    // system: {
    //   type: String,
    //   required: true,
    // },
    isReconnect: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
});
// Create and export the model based on the schema
const RacerHistory = mongoose_1.default.model("RacerHistory", RaceHistorySchema);
exports.default = RacerHistory;
//# sourceMappingURL=racerHistory.model.js.map