"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const templates = [
    { source: 'express', typescript: true, type: 'controller', prompt: 'get', template: express_1.GET_ALL_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'getBy', template: express_1.GET_BY_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'create', template: express_1.CREATE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'update', template: express_1.UPDATE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'delete', template: express_1.DELETE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'full', template: express_1.CONTROLLER_FULL },
    { source: 'express', typescript: true, type: 'controller', prompt: 'empty', template: express_1.CONTROLLER_EMPTY },
    { source: 'express', typescript: true, type: 'controller', prompt: 'custom', template: express_1.CUSTOM_CONTROLLER },
    { source: 'express', typescript: true, type: 'functions', prompt: 'get', template: express_1.GET_ALL_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'getBy', template: express_1.GET_BY_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'create', template: express_1.CREATE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'update', template: express_1.UPDATE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'delete', template: express_1.DELETE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'full', template: express_1.FUNCTIONS_FULL },
    { source: 'express', typescript: true, type: 'functions', prompt: 'empty', template: express_1.FUNCTIONS_EMPTY },
    { source: 'express', typescript: true, type: 'functions', prompt: 'custom', template: express_1.CUSTOM_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'include', template: express_1.INCLUDE_FULL },
    { source: 'express', typescript: true, type: 'routes', prompt: 'empty', template: express_1.ROUTES_EMPTY },
    { source: 'express', typescript: true, type: 'routes', prompt: 'full', template: express_1.ROUTES_FULL },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasOne', template: express_1.MODEL_HAS_ONE },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasMany', template: express_1.MODEL_HAS_MANY },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPk', template: express_1.SEQUELIZE_FIND_BY_PK },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPkWithOptions', template: express_1.SEQUELIZE_FIND_BY_PK_WITH_OPTIONS },
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