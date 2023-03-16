const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.reading = require("./reading.model.js")(mongoose);
db.listening = require("./listening.model.js")(mongoose);
db.matchimgvoca = require("./matchimgvoca.model.js")(mongoose);
db.notification = require("./notification.model.js")(mongoose);
db.slider = require("./slider.model.js")(mongoose);

module.exports = db;
