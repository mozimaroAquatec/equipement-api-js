"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipementsName = exports.EquipementLocationName = exports.EquipementHistoryName = exports.EquipementPumpyName = exports.EquipmentStatus = exports.Status = void 0;
const livepool_model_1 = __importDefault(require("../models/livepools/livepool.model"));
const livepoolHistory_model_1 = __importDefault(require("../models/livepools/livepoolHistory.model"));
const livepoolLocation_model_1 = __importDefault(require("../models/livepools/livepoolLocation.model"));
const livepoolPump_model_1 = __importDefault(require("../models/livepools/livepoolPump.model"));
const racer_model_1 = __importDefault(require("../models/racers/racer.model"));
const racerHistory_model_1 = __importDefault(require("../models/racers/racerHistory.model"));
const racerLocation_model_1 = __importDefault(require("../models/racers/racerLocation.model"));
const racerPump_model_1 = __importDefault(require("../models/racers/racerPump.model"));
var Status;
(function (Status) {
    Status["Connect"] = "connect\u00E9";
    Status["FirstConnect"] = "premi\u00E8re connexion";
    Status["FirstDisconnect"] = "premi\u00E8re disconnexion";
    Status["Disconnect"] = "disconnect\u00E9";
    Status["Reconnect"] = "reconnect\u00E9";
    Status["ReturnDisconnect"] = "se d\u00E9connecter \u00E0 nouveau";
})(Status || (exports.Status = Status = {}));
var EquipmentStatus;
(function (EquipmentStatus) {
    EquipmentStatus["AllConnect"] = "all-connect";
    EquipmentStatus["NewConnect"] = "new-connect";
    EquipmentStatus["NewDisconnect"] = "new-disconnect";
    EquipmentStatus["AllDisconnect"] = "all-disconnect";
})(EquipmentStatus || (exports.EquipmentStatus = EquipmentStatus = {}));
exports.EquipementPumpyName = {
    LivepoolPump: livepoolPump_model_1.default,
    RacerPump: racerPump_model_1.default,
};
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
//# sourceMappingURL=equipement.interfaces.js.map