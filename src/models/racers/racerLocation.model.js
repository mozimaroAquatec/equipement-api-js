"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the Location collection
const RacerLocationSchema = new mongoose_1.default.Schema({
    racerMacaddress: {
        type: String,
        required: true,
        ref: "Racer", // Reference to the Racer model
    },
    message: { type: String, required: true, default: "false" },
    updateMessage: { type: Boolean, required: true, default: false },
    country: { type: String, required: true, default: "false" },
    city: { type: String, required: true, default: "false" },
    town: { type: String, required: true, default: "false" },
    village: { type: String, required: true, default: "false" },
    hamlet: { type: String, required: true, default: "false" },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
});
// Create and export the model based on the schema
const RacerLocation = mongoose_1.default.model("RacerLocation", RacerLocationSchema);
exports.default = RacerLocation;
//# sourceMappingURL=racerLocation.model.js.map