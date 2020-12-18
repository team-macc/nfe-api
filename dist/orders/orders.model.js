"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    idProduto: {
        type: String,
        required: true
    }
});
const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: false,
        select: true,
        default: []
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Done', 'Waiting', 'Send'],
        require: true,
        default: 'Waiting'
    }
});
orderSchema.statics.findByEmail = function (userEmail) {
    return this.findOne({ userEmail }); //{email: email}
};
exports.Order = mongoose.model('Order', orderSchema);
