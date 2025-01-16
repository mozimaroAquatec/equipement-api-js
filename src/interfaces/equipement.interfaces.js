"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipementsName = exports.EquipementLocationName = exports.EquipementHistoryName = exports.EquipementPumpyName = exports.EquipementStatusParams = exports.OldStatus = exports.EquipementStatus = void 0;
const livepoolHistory_model_1 = __importDefault(require("../models/livepools/livepoolHistory.model"));
const livepoolLocation_model_1 = __importDefault(require("../models/livepools/livepoolLocation.model"));
const livepoolPump_model_1 = __importDefault(require("../models/livepools/livepoolPump.model"));
const racer_model_1 = __importDefault(require("../models/racers/racer.model"));
const racerHistory_model_1 = __importDefault(require("../models/racers/racerHistory.model"));
const racerLocation_model_1 = __importDefault(require("../models/racers/racerLocation.model"));
const racerPump_model_1 = __importDefault(require("../models/racers/racerPump.model"));
const livepool_model_1 = __importDefault(require("../models/livepools/livepool.model"));
var EquipementStatus;
(function (EquipementStatus) {
    EquipementStatus["Connect"] = "connected";
    EquipementStatus["FirstConnect"] = "first connection";
    EquipementStatus["Disconnect"] = "disconnected";
    EquipementStatus["Reconnect"] = "reconnected";
    EquipementStatus["ReturnDisconnect"] = "disconnect again";
})(EquipementStatus || (exports.EquipementStatus = EquipementStatus = {}));
var OldStatus;
(function (OldStatus) {
    OldStatus["Connect"] = "connect\u00E9";
    OldStatus["FirstConnect"] = "premi\u00E8re connexion";
    OldStatus["FirstDisconnect"] = "premi\u00E8re disconnexion";
    OldStatus["Disconnect"] = "disconnect\u00E9";
    OldStatus["Reconnect"] = "reconnect\u00E9";
    OldStatus["ReturnDisconnect"] = "se d\u00E9connecter \u00E0 nouveau";
})(OldStatus || (exports.OldStatus = OldStatus = {}));
var EquipementStatusParams;
(function (EquipementStatusParams) {
    EquipementStatusParams["AllConnect"] = "all-connect";
    EquipementStatusParams["NewConnect"] = "new-connect";
    EquipementStatusParams["NewDisconnect"] = "new-disconnect";
    EquipementStatusParams["AllDisconnect"] = "all-disconnect";
})(EquipementStatusParams || (exports.EquipementStatusParams = EquipementStatusParams = {}));
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