"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const orders_model_1 = require("./orders.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const authz_handler_1 = require("../security/authz.handler");
class OrdersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(orders_model_1.Order);
        this.findItems = (req, resp, next) => {
            orders_model_1.Order.findById(req.params.id, "+items").then(order => {
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
            orders_model_1.Order.findById(req.params.id).then(order => {
                if (!order) {
                    throw new restify_errors_1.NotFoundError('Order not Found');
                }
                else {
                    order.items = req.body;
                    return order.save();
                }
            }).then(order => {
                resp.json(order.items);
                return next();
            }).catch(next);
        };
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                orders_model_1.Order.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
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
        application.get('/orders', [authz_handler_1.authorize, this.findByEmail, this.findAll]);
        application.get('/orders/:id', [authz_handler_1.authorize, this.validateId, this.findById]);
        application.post('/orders', [authz_handler_1.authorize, this.save]);
        application.put('/orders/:id', [authz_handler_1.authorize, this.validateId, this.replace]);
        application.patch('/orders/:id', [authz_handler_1.authorize, this.validateId, this.update]);
        application.del('/orders/:id', [authz_handler_1.authorize, this.validateId, this.delete]);
        application.get('/orders/:id/items', [authz_handler_1.authorize, this.validateId, this.findItems]);
        application.put('/orders/:id/items', [authz_handler_1.authorize, this.validateId, this.replaceItems]);
    }
}
exports.ordersRouter = new OrdersRouter();
