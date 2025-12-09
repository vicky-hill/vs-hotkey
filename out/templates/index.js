"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const templates = [
    { source: 'express', typescript: true, type: 'controller', prompt: 'get', template: express_1.GET_ALL_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'getBy', template: express_1.GET_BY_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'create', template: express_1.CREATE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'update', template: express_1.UPDATE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'delete', template: express_1.DELETE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'full', template: express_1.CONTROLLER_TYPESCRIPT_FULL },
    { source: 'express', typescript: true, type: 'controller', prompt: 'empty', template: express_1.CONTROLLER_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'controller', prompt: 'custom', template: express_1.CUSTOM_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'get', template: express_1.GET_ALL_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'getBy', template: express_1.GET_BY_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'create', template: express_1.CREATE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'update', template: express_1.UPDATE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'delete', template: express_1.DELETE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'full', template: express_1.FUNCTIONS_TYPESCRIPT_FULL },
    { source: 'express', typescript: true, type: 'functions', prompt: 'empty', template: express_1.FUNCTIONS_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'functions', prompt: 'custom', template: express_1.CUSTOM_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'routes', prompt: 'empty', template: express_1.ROUTES_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'routes', prompt: 'full', template: express_1.ROUTES_TYPESCRIPT_FULL },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasOne', template: express_1.MODEL_HAS_ONE_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasMany', template: express_1.MODEL_HAS_MANY_TYPESCRIPT },
];
// const products = await ProductModel.findAll();
// -- findall product
// const productInstance = await ProductModel.findByPk(productId);
// if (!productInstance) throw new Error('No product found');
// const product = productInstance.get({ plain: true })
// -- findbypk product where 
// -- include product
// -- hasone product
// -- hasmany images
exports.default = templates;
//# sourceMappingURL=index.js.map