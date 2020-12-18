"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfesRouter = void 0;
const nfes_model_1 = require("./nfes.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const authz_handler_1 = require("../security/authz.handler");
class NfesRouter extends model_router_1.ModelRouter {
    constructor() {
        super(nfes_model_1.Nfe);
        this.findItems = (req, resp, next) => {
            nfes_model_1.Nfe.findById(req.params.id, "+items").then(order => {
                if (!order) {
                    throw new restify_errors_1.NotFoundError('Order not Found');
                }
                else {
                    resp.json(order.items);
                    return next();
                }
            }).catch(next);
        };
        this.replaceItems = (req, resp, next) => {
            nfes_model_1.Nfe.findById(req.params.id).then(nfe => {
                if (!nfe) {
                    throw new restify_errors_1.NotFoundError('Nfe not Found');
                }
                else {
                    nfe.items = req.body;
                    return nfe.save();
                }
            }).then(nfe => {
                resp.json(nfe.items);
                return next();
            }).catch(next);
        };
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                nfes_model_1.Nfe.findByEmail(req.query.email)
                    .then(nfe => nfe ? [nfe] : [])
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
    }
    applyRoutes(application) {
        console.log('****************ORDER ROUTERS****************');
        application.get('/nfes', [authz_handler_1.authorize, this.findByEmail, this.findAll]);
        application.get('/nfes/:id', [authz_handler_1.authorize, this.validateId, this.findById]);
        application.post('/nfes', [authz_handler_1.authorize, this.save]);
        application.put('/nfes/:id', [authz_handler_1.authorize, this.validateId, this.replace]);
        application.patch('/nfes/:id', [authz_handler_1.authorize, this.validateId, this.update]);
        application.del('/nfes/:id', [authz_handler_1.authorize, this.validateId, this.delete]);
        application.get('/nfes/:id/items', [authz_handler_1.authorize, this.validateId, this.findItems]);
        application.put('/nfes/:id/items', [authz_handler_1.authorize, this.validateId, this.replaceItems]);
    }
}
exports.nfesRouter = new NfesRouter();
