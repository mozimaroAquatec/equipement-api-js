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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPumpOfRacerInfo = exports.getPumpOfLivepoolInfo = void 0;
const PumpInterfaces = __importStar(require("../interfaces/pump.interface"));
/**
 * % Processes a pump message and extracts the nature, mode, and state of the pump.
 *
 * @param {string|undefined} messagePump - The pump message in the format "Nature:Mode:...:State".
 * @returns {{
 * naturOfPump: pumpInterface.Nature, modeOfPump: pumpInterface.Mode, stateOfPump: pumpInterface.State
 * }} -//* An object containing the nature, mode, and state of the pump.
 */
const getPumpOfLivepoolInfo = (messagePump) => {
    if (!messagePump)
        return {
            naturOfPump: PumpInterfaces.Nature.NotFound,
            modeOfPump: PumpInterfaces.Mode.NotFound,
            stateOfPump: PumpInterfaces.State.NotFound,
        };
    // Split the pump message into an array using ':' as the delimiter
    const convertMessageToArray = messagePump.split(":");
    // Extract and convert the nature of the pump to uppercase
    const naturOfPumpData = convertMessageToArray[0].toLocaleUpperCase();
    // Determine the nature of the pump based on the prefix of naturOfPumpData
    const naturOfPump = naturOfPumpData.startsWith("EPUV")
        ? PumpInterfaces.Nature.ConnectV
        : naturOfPumpData.startsWith("EPUSG")
            ? PumpInterfaces.Nature.ConnectVS
            : naturOfPumpData.startsWith("EPU")
                ? PumpInterfaces.Nature.Connect
                : PumpInterfaces.Nature.False;
    // Extract the mode of the pump from the second element in the array
    const modeOfPumpData = naturOfPumpData.startsWith("EPUSG")
        ? convertMessageToArray[4]
        : convertMessageToArray[1];
    // Determine the mode of the pump based on the value of modeOfPumpData
    const modeOfPump = modeOfPumpData === "0"
        ? PumpInterfaces.Mode.Manual
        : modeOfPumpData === "1"
            ? PumpInterfaces.Mode.Horaire
            : modeOfPumpData === "2"
                ? PumpInterfaces.Mode.Automatique
                : PumpInterfaces.Mode.False;
    // Extract the state of the pump from the eleventh element in the array
    const stateOfPumpData = naturOfPumpData.startsWith("EPUSG")
        ? convertMessageToArray[9]
        : convertMessageToArray[10];
    // Determine the state of the pump based on the prefix of stateOfPumpData
    const stateOfPump = stateOfPumpData.startsWith("1&")
        ? PumpInterfaces.State.Active
        : stateOfPumpData.startsWith("0&")
            ? PumpInterfaces.State.Desactive
            : PumpInterfaces.State.False;
    // Return an object containing the nature, mode, and state of the pump
    return { naturOfPump, modeOfPump, stateOfPump };
};
exports.getPumpOfLivepoolInfo = getPumpOfLivepoolInfo;
/**
 *% Extracts and returns the mode and state of a pump from a given message.
 *
 * @param {string|undefined}  messagePump - The message string containing pump information, formatted with mode and state separated by colons.
 * @returns {{
 *   modeOfPump: PumpInterfaces.Mode;
 *   stateOfPump: PumpInterfaces.State;
 * }} An object containing the mode and state of the pump.
 */
const getPumpOfRacerInfo = (messagePump) => {
    if (!messagePump)
        return {
            modeOfPump: PumpInterfaces.Mode.NotFound,
            stateOfPump: PumpInterfaces.State.NotFound,
        };
    // Split the pump message into an array using ':' as the delimiter
    const convertMessageToArray = messagePump.split(":");
    // Extract the mode of the pump from the fourth element in the array
    const modeOfPumpData = convertMessageToArray[3];
    // Determine the mode of the pump based on the value of modeOfPumpData
    const modeOfPump = modeOfPumpData === "0"
        ? PumpInterfaces.Mode.Manual
        : modeOfPumpData === "1"
            ? PumpInterfaces.Mode.Horaire
            : modeOfPumpData === "2"
                ? PumpInterfaces.Mode.Automatique
                : PumpInterfaces.Mode.False;
    // Extract the state of the pump from the eighth element in the array
    const stateOfPumpData = convertMessageToArray[7];
    // Determine the state of the pump based on the value of stateOfPumpData
    const stateOfPump = stateOfPumpData === "1"
        ? PumpInterfaces.State.Active
        : stateOfPumpData === "0"
            ? PumpInterfaces.State.Desactive
            : PumpInterfaces.State.False;
    // Return an object containing the mode and state of the pump
    return { modeOfPump, stateOfPump };
};
exports.getPumpOfRacerInfo = getPumpOfRacerInfo;
//# sourceMappingURL=pump.helpers.js.map