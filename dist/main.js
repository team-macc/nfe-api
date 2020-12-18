"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./server/server.js");
const nfes_router_1 = require("./nfes/nfes.router");
const server = new server_js_1.Server();
server.bootstrap([nfes_router_1.nfesRouter]).then(() => {
    console.log('Server is listening on:', server.application.address());
}).catch((error) => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
