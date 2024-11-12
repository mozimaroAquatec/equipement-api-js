"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipementsName = exports.EquipementLocationName = exports.EquipementHistoryName = exports.EquipmentStatus = void 0;
const livepoolHistory_model_1 = __importDefault(require("../models/livepools/livepoolHistory.model"));
const racerHistory_model_1 = __importDefault(require("../models/racers/racerHistory.model"));
const livepoolLocation_model_1 = __importDefault(require("../models/livepools/livepoolLocation.model"));
const racerLocation_model_1 = __importDefault(require("../models/racers/racerLocation.model"));
const livepool_model_1 = __importDefault(require("../models/livepools/livepool.model"));
const racer_model_1 = __importDefault(require("../models/racers/racer.model"));
var EquipmentStatus;
(function (EquipmentStatus) {
    EquipmentStatus["AllConnect"] = "all-connect";
    EquipmentStatus["NewConnect"] = "new-connect";
    EquipmentStatus["NewDisconnect"] = "new-disconnect";
    EquipmentStatus["AllDisconnect"] = "all-disconnect";
})(EquipmentStatus || (exports.EquipmentStatus = EquipmentStatus = {}));
exports.EquipementHistoryName = {
    LivepoolHistory: livepoolHistory_model_1.default,
    RacerHistory: racerHistory_model_1.default,
};
exports.EquipementLocationName = {
    LivepoolLocation: livepoolLocation_model_1.default,
    RacerLocation: racerLocation_model_1.default,
};
exports.EquipementsName = {
    Livepool: livepool_model_1.default,
    Racer: racer_model_1.default,
};
//# sourceMappingURL=common.interface.js.map