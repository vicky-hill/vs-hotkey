import {CONTROLLER_EMPTY, CONTROLLER_FULL, CREATE_CONTROLLER, CREATE_FUNCTIONS, DELETE_CONTROLLER, DELETE_FUNCTIONS, FUNCTIONS_EMPTY, FUNCTIONS_FULL, GET_ALL_CONTROLLER, GET_ALL_FUNCTIONS, GET_BY_CONTROLLER, GET_BY_FUNCTIONS, UPDATE_CONTROLLER, UPDATE_FUNCTIONS, ROUTES_EMPTY, ROUTES_FULL, CUSTOM_CONTROLLER, CUSTOM_FUNCTIONS, MODEL_HAS_ONE, MODEL_HAS_MANY, INCLUDE_FULL, SEQUELIZE_FIND_BY_PK, SEQUELIZE_FIND_BY_PK_WITH_OPTIONS} from './express';

const templates = [
    { source: 'express', typescript: true, type: 'controller', prompt: 'get', template: GET_ALL_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'getBy', template: GET_BY_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'create', template: CREATE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'update', template: UPDATE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'delete', template: DELETE_CONTROLLER },
    { source: 'express', typescript: true, type: 'controller', prompt: 'full', template: CONTROLLER_FULL },
    { source: 'express', typescript: true, type: 'controller', prompt: 'empty', template: CONTROLLER_EMPTY },
    { source: 'express', typescript: true, type: 'controller', prompt: 'custom', template: CUSTOM_CONTROLLER },

    { source: 'express', typescript: true, type: 'functions', prompt: 'get', template: GET_ALL_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'getBy', template: GET_BY_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'create', template: CREATE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'update', template: UPDATE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'delete', template: DELETE_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'full', template: FUNCTIONS_FULL },
    { source: 'express', typescript: true, type: 'functions', prompt: 'empty', template: FUNCTIONS_EMPTY },
    { source: 'express', typescript: true, type: 'functions', prompt: 'custom', template: CUSTOM_FUNCTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'include', template: INCLUDE_FULL },

    { source: 'express', typescript: true, type: 'routes', prompt: 'empty', template: ROUTES_EMPTY },
    { source: 'express', typescript: true, type: 'routes', prompt: 'full', template: ROUTES_FULL },

    { source: 'express', typescript: true, type: 'model', prompt: 'hasOne', template: MODEL_HAS_ONE },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasMany', template: MODEL_HAS_MANY },

    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPk', template: SEQUELIZE_FIND_BY_PK },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPkWithOptions', template: SEQUELIZE_FIND_BY_PK_WITH_OPTIONS },

]

// const products = await ProductModel.findAll();

// -- findall product




// const productInstance = await ProductModel.findByPk(productId);

// if (!productInstance) throw new Error('No product found');
// const product = productInstance.get({ plain: true })

// -- findbypk product where 
// -- include product
// -- hasone product
// -- hasmany images


export default templates;