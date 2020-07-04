const DistanceModel = require('../models/DistanceModel');
const BarModel = require('../models/BarModel');

module.exports = {
    async calculate(request, response) {
        try {
            let { userPosition, bar_id } = request.body;
            console.log(`user: (${userPosition.lat},${userPosition.long})`);
            const bar = await BarModel.getOneBar(bar_id);
            console.log(`bar: (${bar.lat},${bar.long})`);
            let distance = await DistanceModel.calculateDistance(userPosition, {lat: bar.lat, long: bar.long});
            return response.status(200).json(distance);
        } catch (err) {
            console.log("Order reading failed: " + err);
            return response.status(500).json({
                notification: "Internal server error while trying to get distance",
            });
        }
    }
}