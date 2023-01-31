const express = require("express");
const morgan = require("morgan"); 
const routes = require("./routes");
const setHeaders = require("./utils/middlewares/setHeaders");

const app = express();
app.name = "API"

app.use(express.urlencoded({extended: true, limit:"50mb"}));
app.use(express.json({limit:"50mb"}));
app.use(morgan("dev"));
app.use(setHeaders);
app.use("/", routes);

module.exports = app;