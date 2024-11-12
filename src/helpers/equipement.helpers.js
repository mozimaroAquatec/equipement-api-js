"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCoordinatesAroundCenter = exports.getRandomCoordinatesFromFrance = void 0;
/**
 *% Generates a random set of coordinates within the geographical boundaries of France.
 ** The function uses random number generation to create a latitude and longitude
 ** within the predefined limits for France's boundaries.
 *
 * @returns {Coordinates} - An object containing the latitude and longitude within France.
 */
function getRandomCoordinatesFromFrance() {
    // France latitude and longitude boundaries
    const franceBounds = {
        latMin: 41.0, // Southern boundary latitude
        latMax: 51.1, // Northern boundary latitude
        lonMin: -5.1, // Western boundary longitude
        lonMax: 9.7, // Eastern boundary longitude
    };
    // Generate a random latitude between the min and max boundaries
    const latitude = Math.random() * (franceBounds.latMax - franceBounds.latMin) +
        franceBounds.latMin;
    // Generate a random longitude between the min and max boundaries
    const longitude = Math.random() * (franceBounds.lonMax - franceBounds.lonMin) +
        franceBounds.lonMin;
    // Return the generated coordinates
    return { latitude, longitude };
}
exports.getRandomCoordinatesFromFrance = getRandomCoordinatesFromFrance;
/**
 *% Generates random coordinates within a given radius (in kilometers) from a central point.
 ** The function ensures that the random coordinates are within the specified radius from the
 ** center by scaling the random offsets appropriately.
 *
 * @param {number} centerLatitude - Latitude of the center point.
 * @param {number} centerLongitude - Longitude of the center point.
 * @param {number} radiusKm - Radius (in kilometers) within which to generate random coordinates.
 * @returns {Coordinates} - An object containing the randomly generated latitude and longitude within the radius.
 */
function getRandomCoordinatesAroundCenter(centerLatitude, centerLongitude, radiusKm) {
    // Convert radius from kilometers to degrees
    const radiusLatDegrees = radiusKm / 111; // Approximate conversion for latitude
    const radiusLonDegrees = radiusKm / (111 * Math.cos(centerLatitude * (Math.PI / 180))); // Approximate conversion for longitude
    // Generate random distances
    let randomLatOffset = (Math.random() * 2 - 1) * radiusLatDegrees;
    let randomLonOffset = (Math.random() * 2 - 1) * radiusLonDegrees;
    // Adjust the random offset to ensure it's within the radius
    const distance = Math.sqrt(randomLatOffset ** 2 + randomLonOffset ** 2);
    if (distance > radiusLatDegrees) {
        const scalingFactor = radiusLatDegrees / distance;
        randomLatOffset *= scalingFactor;
        randomLonOffset *= scalingFactor;
    }
    // Calculate the random coordinates
    const latitude = centerLatitude + randomLatOffset;
    const longitude = centerLongitude + randomLonOffset;
    return { latitude, longitude };
}
exports.getRandomCoordinatesAroundCenter = getRandomCoordinatesAroundCenter;
//# sourceMappingURL=equipement.helpers.js.map