"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the Lamp collection
const LivpoolHistorySchema = new mongoose_1.default.Schema({
    livepoolMacaddress: {
        type: String,
        required: true,
        ref: "Livepool", // Reference to the Racer model
    },
    date: {
        type: String,
        required: true,
    },
    disconnectDate: {
        type: String,
        required: true,
    },
    reconnectDate: {
        type: String,
        required: true,
    },
    period: {
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
    isReconnect: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
});
// Create and export the model based on the schema
const LivepoolHistory = mongoose_1.default.model("LivepoolHistory", LivpoolHistorySchema);
exports.default = LivepoolHistory;
//# sourceMappingURL=livepoolHistory.model.js.map