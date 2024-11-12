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
exports.getLampOfRacerInfo = exports.getLampOfLivepoolInfo = void 0;
const lampeInterfaces = __importStar(require("../interfaces/lamp.interface"));
/**
 *% Extracts and returns the mode and state of a lamp from a given message.
 *
 * @param {string | undefined} lampMessage - The message string containing lamp information, formatted with mode and state separated by colons.
 * @returns {{
 *   modeOfLamp: lampeInterfaces.Mode;
 *   stateOfLamp: lampeInterfaces.State;
 * }} An object containing the mode and state of the lamp.
 */
const getLampOfLivepoolInfo = (lampMessage) => {
    if (!lampMessage)
        return {
            modeOfLamp: lampeInterfaces.Mode.NotFound,
            stateOfLamp: lampeInterfaces.State.NotFound,
        };
    // Split the lamp message into an array using ':' as a delimiter
    const lampMessageToArray = lampMessage.split(":");
    // Determine the mode of the lamp based on the ending character of the first element
    const modeOfLamp = lampMessageToArray[0].endsWith("0")
        ? lampeInterfaces.Mode.Manual
        : lampMessageToArray[0].endsWith("1")
            ? lampeInterfaces.Mode.Horaire
            : lampeInterfaces.Mode.False;
    // Determine the state of the lamp based on the last element of the array
    const stateOfLamp = lampMessageToArray[lampMessageToArray.length - 1] === "0"
        ? lampeInterfaces.State.Desactive
        : lampMessageToArray[lampMessageToArray.length - 1] === "1"
            ? lampeInterfaces.State.Active
            : lampeInterfaces.State.False;
    // Return an object containing the mode and state of the lamp
    return { modeOfLamp, stateOfLamp };
};
exports.getLampOfLivepoolInfo = getLampOfLivepoolInfo;
/**
 *% Extracts and returns the mode and state of a lamp from a given message.
 *
 * @param {string | undefined} lampMessage - The message string containing lamp information, formatted with mode and state separated by colons.
 * @returns {{
 *   modeOfLamp: lampeInterfaces.Mode;
 *   stateOfLamp: lampeInterfaces.State;
 * }} An object containing the mode and state of the lamp.
 */
const getLampOfRacerInfo = (lampMessage) => {
    if (!lampMessage)
        return {
            modeOfLamp: lampeInterfaces.Mode.NotFound,
            stateOfLamp: lampeInterfaces.State.NotFound,
        };
    // Split the lamp message into an array using ':' as the delimiter
    const lampMessageToArray = lampMessage.split(":");
    // Determine the mode of the lamp based on the second element in the array
    const modeOfLamp = lampMessageToArray[1] === "0"
        ? lampeInterfaces.Mode.Manual
        : lampMessageToArray[1] === "1"
            ? lampeInterfaces.Mode.Horaire
            : lampeInterfaces.Mode.False;
    // Determine the state of the lamp based on the last character of the first element in the array
    const stateOfLamp = lampMessageToArray[0].endsWith("0")
        ? lampeInterfaces.State.Desactive
        : lampMessageToArray[0].endsWith("1")
            ? lampeInterfaces.State.Active
            : lampeInterfaces.State.False;
    // Return an object containing the mode and state of the lamp
    return { modeOfLamp, stateOfLamp };
};
exports.getLampOfRacerInfo = getLampOfRacerInfo;
//# sourceMappingURL=lamp.helpers.js.map