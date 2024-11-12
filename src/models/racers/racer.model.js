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
const RacerInterfaces = __importStar(require("../../interfaces/racer.interface"));
// Define the schema for the users collection
const RacerSchema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    macAddress: { type: String, required: true },
    firstConnect: { type: Boolean, required: true },
    returnedConnect: { type: Boolean, required: true },
    returnedDisconnect: { type: Boolean, required: true },
    firstDisconnect: { type: Boolean, required: true },
    stillConnect: { type: Boolean, required: true },
    stillDisconnect: { type: Boolean, required: true },
    connect: { type: Boolean, required: true },
    disconnect: { type: Boolean, required: true },
    // Todo change values of status in frensh
    status: {
        type: String,
        enum: [
            RacerInterfaces.Status.FirstConnect,
            RacerInterfaces.Status.Connect,
            RacerInterfaces.Status.FirstDisconnect,
            RacerInterfaces.Status.Disconnect,
            RacerInterfaces.Status.Reconnect,
            RacerInterfaces.Status.ReturnDisconnect,
        ],
        required: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to plain object
});
//  Define a virtual for populating related pump ( // %add new field name pump )
RacerSchema.virtual("pump", {
    ref: "RacerPump", // Name of the related model
    foreignField: "racerMacaddress", // Field in the related model
    localField: "macAddress", // Field in the racer model
    justOne: true, // Whether the virtual is for a single document or an array
});
//  Define a virtual for populating related lamp ( // %add new field name lamp )
RacerSchema.virtual("lamp", {
    ref: "RacerLamp", // Name of the related model
    foreignField: "racerMacaddress", // Field in the related model
    localField: "macAddress", // Field in the racer model
    justOne: true, // Whether the virtual is for a single document or an array
});
RacerSchema.virtual("location", {
    ref: "RacerLocation", // Name of the related model
    foreignField: "racerMacaddress", // Field in the related model
    localField: "macAddress", // Field in the racer model
    justOne: true, // Whether the virtual is for a single document or an array
});
RacerSchema.virtual("history", {
    ref: "RacerHistory", // Name of the related model
    foreignField: "racerMacaddress", // Field in the related model
    localField: "macAddress", // Field in the racer model
    justOne: false, // Whether the virtual is for a single document or an array
});
// Create a model based on the schema, named 'Racer', with the specified interface
const Racer = mongoose_1.default.model("Racer", RacerSchema);
exports.default = Racer;
//# sourceMappingURL=racer.model.js.map