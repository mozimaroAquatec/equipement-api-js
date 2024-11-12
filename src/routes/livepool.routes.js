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
const express_1 = __importDefault(require("express"));
const livepoolsControllers = __importStar(require("../controllers/livepool.controllers"));
// Express Router for livepools routes
const LivepoolRoutes = express_1.default.Router();
// Route: GET / - Get all livepools data
LivepoolRoutes.get("/", livepoolsControllers.getLivepools);
LivepoolRoutes.get("/info", livepoolsControllers.getLivepoolInfo);
LivepoolRoutes.get("/pumps/info", livepoolsControllers.getInfoOfPumpsOfLivepool);
LivepoolRoutes.get("/lamps/info", livepoolsControllers.getInfoOfLampsOfLivepool);
LivepoolRoutes.get("/duplicate", livepoolsControllers.getDuplicatesLivepool);
LivepoolRoutes.get("/pumps/desactive", livepoolsControllers.getAllDesactiveStatePumpsOfLivepoolAfterTwoDays);
LivepoolRoutes.delete("/duplicate", livepoolsControllers.removeDuplicatesOfLivepool);
LivepoolRoutes.get("/error", livepoolsControllers.errorTest);
exports.default = LivepoolRoutes;
//# sourceMappingURL=livepool.routes.js.map