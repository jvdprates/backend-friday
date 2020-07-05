const connection = require("../database/connection");
const BarModel = require("./DistanceModel");
const DistanceModel = require("./DistanceModel");
const AvaliationModel = require("./AvaliationModel");

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
            if (!notReverse) {
                return result.reverse();
            }
            return result;
        }

        async function orderByDistance(bars, notReverse) {
            let result = bars.sort(function (a, b) {
                return (b.distance - a.distance);
            });
            if (notReverse) {
                return result.reverse();
            }
            return result;
        }

        let bars = await connection("bars")
            .select('*');

        await bars.forEach(async function (element) {
            element.distance = await DistanceModel.calculateDistance(userPosition, { lat: element.lat, long: element.long });
        })

        if (query.distance !== undefined) {
            bars = await orderByDistance(bars, query.distance)
        }

        if (query.alphabetic !== undefined) {
            bars = await orderAlphabetically(bars, query.alphabetic)
        }

        await bars.forEach(async function(element){
            element.avaliation = await AvaliationModel.index(element.id);
        });

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