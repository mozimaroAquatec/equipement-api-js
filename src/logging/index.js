"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.racerLogger = exports.livepoolLogger = exports.consoleLogger = exports.equipementLogger = exports.geoLocationLogger = exports.userLogger = exports.redisLogger = exports.mqttLogger = exports.DBLogger = exports.serverLogger = void 0;
const logger_dev_1 = __importDefault(require("./logger.dev"));
const logger_prod_1 = __importDefault(require("./logger.prod"));
// Determine the environment and create the appropriate logger factory
const logger = process.env.NODE_ENV === "production" ? logger_prod_1.default : logger_dev_1.default;
// Create specific loggers for different services
exports.serverLogger = logger("server");
exports.DBLogger = logger("DB");
exports.mqttLogger = logger("mqtt");
exports.redisLogger = logger("redis");
exports.userLogger = logger("user");
exports.geoLocationLogger = logger("geoLocationLogger");
exports.equipementLogger = logger("equipementLogger");
exports.consoleLogger = process.env.NODE_ENV === "production" ? null : logger("console");
exports.livepoolLogger = logger("livepool");
exports.racerLogger = logger("racer");
//wathermap
exports.default = logger;
//# sourceMappingURL=index.js.map