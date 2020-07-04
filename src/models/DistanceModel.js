const connection = require("../database/connection");
const GeoPoint = require('geopoint');

module.exports = {
    async calculateDistance(userPosition, barPosition){
        let barPoint = new GeoPoint(barPosition.lat, barPosition.long);
        let userPoint = new GeoPoint(userPosition.lat, userPosition.long);
        let distance = barPoint.distanceTo(userPoint, true);
        return distance;
    }
}