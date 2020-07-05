const connection = require("../database/connection");
const BarModel = require("./DistanceModel");
const DistanceModel = require("./DistanceModel");

module.exports = {
    async createBar(bar) {
        console.log("Creating Bar: " + bar.name);
        const result = await connection("bars")
            .insert(bar);
        console.log("Bar Created!");
        return result;
    },

    async index(userPosition, query) {

        async function orderAlphabetically(bars, notReverse) {
            let result = bars.sort(function (a, b) {
                if (a.name === b.name) {
                    return 0;
                }

                if (a.name > b.name) {
                    return 1;
                }

                return -1;
            });
            if(!notReverse){
                return result.reverse();
            }
            return result;
        }

        async function orderByDistance(bars, notReverse) {
            let result = bars.sort(function (a, b) {
                return (a.distance - b.distance);
            });
            if (!notReverse) {
                return result.reverse();
            }
            return result;
        }

        const bars = await connection("bars")
            .select('*');

        bars.forEach(async function(bar){
            bar.distance = await DistanceModel.calculateDistance(userPosition, { lat: bar.lat, long: bar.long });
        })

        if (query.distance)
            bars = orderByDistance(bars, query.distance)
        if (query.alphabetic)
            bars = orderAlphabetically(bars, query.alphabetic)

        return bars;
    },

    async getOneBar(bar_id) {
        console.log("Finding Bar: " + bar_id);
        const result = await connection("bars")
            .where({ id: bar_id })
            .select("*")
            .first();
        return result;
    },

    async updateBar(bar, bar_id) {
        console.log("Updating Bar: " + bar_id);
        const result = await connection("bars")
            .where({ id: bar_id })
            .update(bar);
        console.log("Bar Updated!");
        return result;
    },

    async deleteBar(bar_id) {
        console.log("Deleting Bar: " + bar_id);
        const result = await connection("bar")
            .where({ id: bar_id })
            .delete();
        console.log("Bar Deleted!");
        return result;
    },
}