// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();

import * as express from "express";

class App {
    public express;

    constructor() {
        this.express = express();
    }
}

export default new App().express;
