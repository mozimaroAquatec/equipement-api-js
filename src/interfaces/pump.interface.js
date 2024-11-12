"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Mode = exports.Nature = void 0;
var Nature;
(function (Nature) {
    Nature["Connect"] = "connect";
    Nature["ConnectV"] = "connect V";
    Nature["ConnectVS"] = "connect VS";
    Nature["False"] = "false";
    Nature["NotFound"] = "not found";
})(Nature || (exports.Nature = Nature = {}));
var Mode;
(function (Mode) {
    Mode["Manual"] = "manual";
    Mode["Horaire"] = "horaire";
    Mode["Automatique"] = "automatique";
    Mode["False"] = "false";
    Mode["NotFound"] = "not found";
})(Mode || (exports.Mode = Mode = {}));
var State;
(function (State) {
    State["Active"] = "active";
    State["Desactive"] = "desactive";
    State["False"] = "false";
    State["NotFound"] = "not found";
})(State || (exports.State = State = {}));
//# sourceMappingURL=pump.interface.js.map