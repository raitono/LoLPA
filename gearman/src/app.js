"use strict";
exports.__esModule = true;
// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
var express = require("express");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
    }
    return App;
}());
exports["default"] = new App().express;
