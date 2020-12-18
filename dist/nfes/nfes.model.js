"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nfe = void 0;
const mongoose = require("mongoose");
const nfeItemSchema = new mongoose.Schema({
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
const nfeSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: {
        type: [nfeItemSchema],
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
    },
    cnpjEmissor: {
        type: String,
        required: true,
        default: '55.555.555/0001-55'
    },
    cpfCnpjDestino: {
        type: String,
        required: true,
        default: '888.888.888-99'
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
});
nfeSchema.statics.findByEmail = function (userEmail) {
    return this.findOne({ userEmail }); //{email: email}
};
exports.Nfe = mongoose.model('Nfe', nfeSchema);
