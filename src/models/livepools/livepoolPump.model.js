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
const PumpInterfaces = __importStar(require("../../interfaces/pump.interface"));
const date_1 = __importDefault(require("../../utils/date"));
// Define the schema for the Pump collection
const LivepoolPumpSchema = new mongoose_1.default.Schema({
    livepoolMacaddress: {
        type: String,
        required: true,
        ref: "Livepool", // Reference to the Livepool model
    },
    message: { type: String, required: true },
    nature: {
        type: String,
        enum: [
            PumpInterfaces.Nature.Connect,
            PumpInterfaces.Nature.ConnectV,
            PumpInterfaces.Nature.Connect,
            PumpInterfaces.Nature.False,
            PumpInterfaces.Nature.NotFound,
        ],
        required: true,
    },
    mode: {
        type: String,
        enum: [
            PumpInterfaces.Mode.Manual,
            PumpInterfaces.Mode.Horaire,
            PumpInterfaces.Mode.Automatique,
            PumpInterfaces.Mode.False,
            PumpInterfaces.Nature.NotFound,
        ],
        required: true,
    },
    state: {
        type: String,
        enum: [
            PumpInterfaces.State.Active,
            PumpInterfaces.State.Desactive,
            PumpInterfaces.State.False,
            PumpInterfaces.Nature.NotFound,
        ],
        updatePump: { type: String, required: true, default: (0, date_1.default)().today },
        required: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to plain object
});
// Create and export the model based on the schema
const LivepoolPump = mongoose_1.default.model("LivepoolPump", LivepoolPumpSchema);
exports.default = LivepoolPump;
//# sourceMappingURL=livepoolPump.model.js.map