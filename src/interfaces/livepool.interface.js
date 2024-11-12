"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivepoolStatus = exports.Status = void 0;
// Todo change values of status in frensh
var Status;
(function (Status) {
    Status["Connect"] = "connect\u00E9";
    Status["FirstConnect"] = "premi\u00E8re connexion";
    Status["FirstDisconnect"] = "premi\u00E8re disconnexion";
    Status["Disconnect"] = "disconnect\u00E9";
    Status["Reconnect"] = "reconnect\u00E9";
    Status["ReturnDisconnect"] = "se d\u00E9connecter \u00E0 nouveau";
})(Status || (exports.Status = Status = {}));
var LivepoolStatus;
(function (LivepoolStatus) {
    LivepoolStatus["AllConnect"] = "all connect";
    LivepoolStatus["NewConnect"] = "new connect";
    LivepoolStatus["NewDisconnect"] = "new disconnect";
    LivepoolStatus["AllDisconnect"] = "all disconnect";
})(LivepoolStatus || (exports.LivepoolStatus = LivepoolStatus = {}));
//# sourceMappingURL=livepool.interface.js.map