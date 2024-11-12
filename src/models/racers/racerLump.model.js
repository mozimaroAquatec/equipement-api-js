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
const mongoose_1 = __importDefault(require("mongoose"));
const LampeInterfaces = __importStar(require("../../interfaces/lamp.interface"));
// Define the schema for the Lamp collection
const RacerLampSchema = new mongoose_1.default.Schema({
    racerMacaddress: {
        type: String,
        required: true,
        ref: "Racer", // Reference to the Racer model
    },
    message: { type: String, required: true },
    mode: {
        type: String,
        enum: [
            LampeInterfaces.Mode.Manual,
            LampeInterfaces.Mode.Horaire,
            LampeInterfaces.Mode.Automatique,
            LampeInterfaces.Mode.False,
            LampeInterfaces.Mode.NotFound,
        ],
        required: true,
    },
    state: {
        type: String,
        enum: [
            LampeInterfaces.State.Active,
            LampeInterfaces.State.Desactive,
            LampeInterfaces.State.False,
            LampeInterfaces.Mode.NotFound,
        ],
        required: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
});
// Create and export the model based on the schema
const RacerLamp = mongoose_1.default.model("RacerLamp", RacerLampSchema);
exports.default = RacerLamp;
//# sourceMappingURL=racerLump.model.js.map