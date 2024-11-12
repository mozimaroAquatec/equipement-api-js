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
exports.del = exports.set = exports.get = exports.flushAllRedis = exports.connectRedis = void 0;
const redis_1 = require("redis");
const logger = __importStar(require("../logging/index"));
require("../config/env.config");
/**
 * % Creates and configures a Redis client.
 *
 * * The client configuration changes depending on the environment. In a production environment,
 * * the Redis password is retrieved from the environment variables. The client socket is configured
 * * with the host and port from environment variables.
 *
 * @type {RedisClientType}
 */
const client = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    },
});
/**
 * % Asynchronously connects to the Redis client.
 *
 * @returns {Promise<void>} A promise that resolves if the connection is successful.
 * @throws {Error} Throws an error if the connection fails.
 */
const connectRedis = async () => {
    try {
        await client.connect();
        logger.redisLogger.info("Redis connect success");
    }
    catch (error) {
        logger.redisLogger.error({ error }, "Redis error connect");
        throw new Error(`Error connecting to Redis: ${error}`);
    }
};
exports.connectRedis = connectRedis;
/**
 * % Asynchronously flushes all data from the Redis client.
 *
 * @returns {Promise<void>} A promise that resolves if the flush is successful.
 * @throws {Error} Throws an error if the flush operation fails.
 */
const flushAllRedis = async () => {
    try {
        await client.flushAll();
        logger.redisLogger.info("All Redis cache cleared");
    }
    catch (error) {
        logger.redisLogger.error({ error }, "Redis flush error");
        throw new Error(`Error flushing Redis: ${error}`);
    }
};
exports.flushAllRedis = flushAllRedis;
/**
 * % Asynchronously retrieves all fields and values of a hash stored at a given key in Redis.
 *
 * @param {string} key - The key of the hash in Redis.
 * @returns {Promise<Record<string, string>>} A promise that resolves to an object containing all fields and values of the hash.
 * @throws {Error} Throws an error if the retrieval operation fails.
 */
const get = async (key) => {
    try {
        return await client.hGetAll(key);
    }
    catch (error) {
        logger.redisLogger.error({ error }, "Redis get hGetAll error");
        throw new Error(`Error getting data from Redis: ${error}`);
    }
};
exports.get = get;
/**
 * % Asynchronously sets the fields and values of a hash stored at a given key in Redis.
 *
 * @param {string} key - The key of the hash in Redis.
 * @param {Record<string, string>} data - An object containing the fields and values to set in the hash.
 * @returns {Promise<void>} A promise that resolves if the operation is successful.
 * @throws {Error} Throws an error if the setting operation fails.
 */
const set = async (key, data) => {
    try {
        await client.hSet(key, data);
    }
    catch (error) {
        logger.redisLogger.error({ error }, "Redis hSet error");
        throw new Error(`Error setting data in Redis: ${error}`);
    }
};
exports.set = set;
/**
 * % Asynchronously deletes a key and its associated value from Redis.
 *
 * @param {string} key - The key to delete from Redis.
 * @returns {Promise<void>} A promise that resolves if the deletion is successful.
 * @throws {Error} Throws an error if the deletion operation fails.
 */
const del = async (key) => {
    try {
        await client.del(key);
    }
    catch (error) {
        logger.redisLogger.error({ error }, "Redis flush error");
        throw new Error(`Error flushing Redis: ${error}`);
    }
};
exports.del = del;
//# sourceMappingURL=redis.services.js.map