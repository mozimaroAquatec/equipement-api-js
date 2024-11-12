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
exports.filterRacerByLampModes = exports.filterRacerByPumpModes = void 0;
const PumpInterfaces = __importStar(require("../interfaces/pump.interface"));
const LampInterfaces = __importStar(require("../interfaces/lamp.interface"));
/**
 *% Filters a list of Racer objects based on the specified pump mode.
 *
 * @param {RacerInterfaces.GetRacers[]} racerList - The list of Racers to filter.
 * @param {PumpInterfaces.Mode} mode - The pump mode to filter by. If mode is 'False', the original list is returned unfiltered.
 * @returns {RacerInterfaces.GetRacers[]} The filtered list of Racer objects.
 */
const filterRacerByPumpModes = (racerList, mode) => {
    if (mode === PumpInterfaces.Mode.False) {
        // If the mode is 'False', return the original list without filtering
        return racerList;
    }
    else {
        // Filter the racer list where the pump mode matches the specified mode
        return racerList.filter((item) => item?.pump?.mode === mode);
    }
};
exports.filterRacerByPumpModes = filterRacerByPumpModes;
/**
 *% Filters the Racer list based on the specified lamp mode.
 *
 ** This function takes a list of Racer objects and a lamp mode,
 ** returning only the Racer objects where the lamp's mode matches the specified mode.
 ** If the mode is `LampInterfaces.Mode.False`, it returns the entire list without filtering.
 *
 * @param {RacerInterfaces.GetRacers[]} racerList - The list of Racer objects to be filtered.
 * @param {LampInterfaces.Mode} mode - The lamp mode used to filter the racer list.
 * @returns {RacerInterfaces.GetRacers[]} The filtered list of Racer objects based on the lamp mode.
 */
const filterRacerByLampModes = (racerList, mode) => {
    // If the mode is 'False', return the original list without filtering
    if (mode === LampInterfaces.Mode.False) {
        return racerList;
    }
    else {
        // Filter the Racer list where the lamp mode matches the specified mode
        return racerList.filter((item) => item?.lamp?.mode === mode);
    }
};
exports.filterRacerByLampModes = filterRacerByLampModes;
//# sourceMappingURL=racer.helpers.js.map