import { CONTROLLER_TYPESCRIPT_EMPTY, CONTROLLER_TYPESCRIPT_FULL, CREATE_CONTROLLER_TYPESCRIPT, CREATE_FUNCTIONS_TYPESCRIPT, DELETE_CONTROLLER_TYPESCRIPT, DELETE_FUNCTIONS_TYPESCRIPT, FUNCTIONS_TYPESCRIPT_EMPTY, FUNCTIONS_TYPESCRIPT_FULL, GET_ALL_CONTROLLER_TYPESCRIPT, GET_ALL_FUNCTIONS_TYPESCRIPT, GET_BY_CONTROLLER_TYPESCRIPT, GET_BY_FUNCTIONS_TYPESCRIPT, UPDATE_CONTROLLER_TYPESCRIPT, UPDATE_FUNCTIONS_TYPESCRIPT, ROUTES_TYPESCRIPT_EMPTY, ROUTES_TYPESCRIPT_FULL, CUSTOM_CONTROLLER_TYPESCRIPT, CUSTOM_FUNCTIONS_TYPESCRIPT, MODEL_HAS_ONE_TYPESCRIPT, MODEL_HAS_MANY_TYPESCRIPT, MODEL_BELONGS_TO_TYPESCRIPT, INCLUDE_FULL_TYPESCRIPT, INCLUDE_PARTIAL_TYPESCRIPT } from './express';

const templates = [
    { source: 'express', typescript: true, type: 'controller', prompt: 'get', template: GET_ALL_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'getBy', template: GET_BY_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'create', template: CREATE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'update', template: UPDATE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'delete', template: DELETE_CONTROLLER_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'controller', prompt: 'full', template: CONTROLLER_TYPESCRIPT_FULL },
    { source: 'express', typescript: true, type: 'controller', prompt: 'empty', template: CONTROLLER_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'controller', prompt: 'custom', template: CUSTOM_CONTROLLER_TYPESCRIPT },

    { source: 'express', typescript: true, type: 'functions', prompt: 'get', template: GET_ALL_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'getBy', template: GET_BY_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'create', template: CREATE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'update', template: UPDATE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'delete', template: DELETE_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'full', template: FUNCTIONS_TYPESCRIPT_FULL },
    { source: 'express', typescript: true, type: 'functions', prompt: 'empty', template: FUNCTIONS_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'functions', prompt: 'custom', template: CUSTOM_FUNCTIONS_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'includeFull', template: INCLUDE_FULL_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'functions', prompt: 'includePartial', template: INCLUDE_PARTIAL_TYPESCRIPT },

    { source: 'express', typescript: true, type: 'routes', prompt: 'empty', template: ROUTES_TYPESCRIPT_EMPTY },
    { source: 'express', typescript: true, type: 'routes', prompt: 'full', template: ROUTES_TYPESCRIPT_FULL },

    { source: 'express', typescript: true, type: 'model', prompt: 'hasOne', template: MODEL_HAS_ONE_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasMany', template: MODEL_HAS_MANY_TYPESCRIPT },
    { source: 'express', typescript: true, type: 'model', prompt: 'belongsTo', template: MODEL_BELONGS_TO_TYPESCRIPT },

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