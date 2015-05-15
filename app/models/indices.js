// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IndicesSchema   = new Schema({
    name: String,
    country: String,
    data: [{ shiller_pe_ratio: Number, date: Date }]
});

module.exports = mongoose.model('Indices', IndicesSchema);