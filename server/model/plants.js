var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
    botanicalName: { type: String, required: false },
    commonName: { type: String, required: true },
    stage: { type: Number, required: false },
    comment: { type: String, required: false },
    depth: { type: Number, required: false },
    germStart: { type: Number, required: false },
    germEnd: { type: Number, required: false },
    harvestable: { type: Boolean, required: true },
    img: { type: String, required: false },
    lifeType: { type: String, required: true },
    methodNum: { type: Number, required: false },
    sowingMethod: { type: String, required: false },
    sowingSpace: { type: Number, required: false },
    sunSchedule: { type: String, required: false },
    type: { type: String, required: true },
    weeksToHarvest: { type: Number, required: false },
    weeksToSowBeforeLastFrost: { type: Number, required: false },
    variety: { type: String, required: false },
    zones: { type: Array, required: false },
});

module.exports = mongoose.model('Plant', plantSchema);