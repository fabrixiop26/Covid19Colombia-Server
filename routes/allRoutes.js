const record = require("./record");
const index = require("./index");

const routes = (app) => {
    app.use("/", index);
    app.use("/api", record);
};

module.exports = routes;