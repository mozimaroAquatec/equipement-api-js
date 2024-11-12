"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
/**
 *% Gets the current date and time in GMT+1 (Central European Time) and provides utility functions for date manipulation.
 *
 * @returns {{
 *   currentDate: string; // Current date and time in the format "YYYY/MM/DD HH:mm:ss.SS"
 *   currentDateWithMs: number; // Current date in milliseconds since Unix epoch
 *   today: string; // Today's date in the format "YYYY/MM/DD"
 *   yesterday: string; // Yesterday's date in the format "YYYY/MM/DD"
 *   currentDateAtLastMinute: string; // Current date at the last minute of the day in the format "YYYY/MM/DD HH:mm"
 *   currentDateWithMinute: string; // Current date and time with minutes in the format "YYYY/MM/DD HH:mm"
 *   differenceInDays: (mydate: string) => number; // Function to calculate the difference in days between today and a given date
 * }}
 */
const getDate = () => {
    const todayForGMT = moment_timezone_1.default.tz("GMT").format("YYYY/MM/DD");
    // Define timezone for GMT+1 (CET)
    // const timezone = "CET"; // gmt +2
    const timezone = "Etc/GMT-3";
    // Get the current date and time in GMT+1 (Central European Time)
    const gmtPlusTwoTime = (0, moment_timezone_1.default)().tz(timezone);
    const currentDate = gmtPlusTwoTime.format("YYYY/MM/DD HH:mm:ss.SS");
    const today = gmtPlusTwoTime.format("YYYY/MM/DD");
    const tomorrowInGMT = moment_timezone_1.default
        .tz("Etc/GMT")
        .add(1, "days")
        .format("YYYY/MM/DD");
    // Function to calculate the difference in days between today and a given date
    const differenceInDays = (myDate) => {
        const currentDate = (0, moment_timezone_1.default)(today, "YYYY/MM/DD");
        const targetDate = (0, moment_timezone_1.default)(myDate, "YYYY/MM/DD");
        return currentDate.diff(targetDate, "days");
    };
    const convertDateFormat = (myDate) => {
        // Define the format of your input date string
        const inputFormat = '"YYYY/M/D*H:m';
        // Parse the input date string with moment using the defined format
        const date = (0, moment_timezone_1.default)(myDate, inputFormat);
        // Format the date to YYYY/MM/DD
        const formattedDate = date.format("YYYY/MM/DD");
        return formattedDate;
    };
    // Format for current date at the last minute of the day
    const currentDateAtLastMinute = gmtPlusTwoTime
        .set({ hour: 23, minute: 59 })
        .format("YYYY/MM/DD HH:mm");
    // Current date and time with minutes
    const currentDateWithMinute = gmtPlusTwoTime.format("YYYY/MM/DD HH:mm");
    // Get yesterday's date in GMT+2 timezone
    const yesterday = gmtPlusTwoTime.subtract(1, "days").format("YYYY/MM/DD");
    // Get the current date in milliseconds since Unix epoch (using Europe/Paris for consistency)
    const currentDateWithMs = moment_timezone_1.default.tz("Europe/Paris").valueOf();
    return {
        currentDate,
        currentDateWithMs,
        today,
        yesterday,
        currentDateAtLastMinute,
        currentDateWithMinute,
        tomorrowInGMT,
        convertDateFormat,
        differenceInDays,
        todayForGMT,
    };
};
exports.default = getDate;
//# sourceMappingURL=date.js.map