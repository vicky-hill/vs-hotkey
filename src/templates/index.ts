import { CONTROLLER_EMPTY, CONTROLLER_FULL, CREATE_CONTROLLER, CREATE_FUNCTIONS, DELETE_CONTROLLER, DELETE_FUNCTIONS, FUNCTIONS_EMPTY, FUNCTIONS_FULL, GET_ALL_CONTROLLER, GET_ALL_FUNCTIONS, GET_BY_CONTROLLER, GET_BY_FUNCTIONS, UPDATE_CONTROLLER, UPDATE_FUNCTIONS, ROUTES_EMPTY, ROUTES_FULL, CUSTOM_CONTROLLER, CUSTOM_FUNCTIONS, MODEL_HAS_ONE, MODEL_HAS_MANY, SEQUELIZE_FIND_BY_PK, SEQUELIZE_FIND_BY_PK_WITH_OPTIONS, SEQUELIZE_FIND_BY_PK_PLAIN, SEQUELIZE_FIND_BY_PK_WITH_OPTIONS_PLAIN, SEQUELIZE_FIND_ONE, SEQUELIZE_FIND_ONE_WITH_OPTIONS, SEQUELIZE_FIND_ONE_PLAIN, SEQUELIZE_FIND_ONE_WITH_OPTIONS_PLAIN, SEQUELIZE_FIND_ALL, SEQUELIZE_FIND_ALL_WITH_OPTIONS, SEQUELIZE_FIND_ALL_PLAIN, SEQUELIZE_FIND_ALL_WITH_OPTIONS_PLAIN, SEQUELIZE_CREATE, SEQUELIZE_UPDATE, SEQUELIZE_DELETE } from './express';

export type Prompt = 'get' | 'getBy' | 'create' | 'update' | 'delete' | 'full' | 'empty' | 'custom' | 'hasOne' | 'hasMany' | '' |
    'findByPk' | 'findByPkWithOptions' | 'findByPkPlain' | 'findByPkWithOptionsPlain' | 'findOne' | 'findOneWithOptions' | 'findOnePlain' | 'findOneWithOptionsPlain' | 'findAll' | 'findAllWithOptions' | 'findAllPlain' | 'findAllWithOptionsPlain' |
    'createMethod' | 'updateMethod' | 'deleteMethod'


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

    { source: 'express', typescript: true, type: 'routes', prompt: 'empty', template: ROUTES_EMPTY },
    { source: 'express', typescript: true, type: 'routes', prompt: 'full', template: ROUTES_FULL },

    { source: 'express', typescript: true, type: 'model', prompt: 'hasOne', template: MODEL_HAS_ONE },
    { source: 'express', typescript: true, type: 'model', prompt: 'hasMany', template: MODEL_HAS_MANY },

    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPk', template: SEQUELIZE_FIND_BY_PK },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPkWithOptions', template: SEQUELIZE_FIND_BY_PK_WITH_OPTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPkPlain', template: SEQUELIZE_FIND_BY_PK_PLAIN },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findByPkWithOptionsPlain', template: SEQUELIZE_FIND_BY_PK_WITH_OPTIONS_PLAIN },

    { source: 'express', typescript: true, type: 'functions', prompt: 'findOne', template: SEQUELIZE_FIND_ONE },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findOneWithOptions', template: SEQUELIZE_FIND_ONE_WITH_OPTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findOnePlain', template: SEQUELIZE_FIND_ONE_PLAIN },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findOneWithOptionsPlain', template: SEQUELIZE_FIND_ONE_WITH_OPTIONS_PLAIN },

    { source: 'express', typescript: true, type: 'functions', prompt: 'findAll', template: SEQUELIZE_FIND_ALL },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findAllWithOptions', template: SEQUELIZE_FIND_ALL_WITH_OPTIONS },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findAllPlain', template: SEQUELIZE_FIND_ALL_PLAIN },
    { source: 'express', typescript: true, type: 'functions', prompt: 'findAllWithOptionsPlain', template: SEQUELIZE_FIND_ALL_WITH_OPTIONS_PLAIN },

    { source: 'express', typescript: true, type: 'functions', prompt: 'createMethod', template: SEQUELIZE_CREATE },
    { source: 'express', typescript: true, type: 'functions', prompt: 'updateMethod', template: SEQUELIZE_UPDATE },
    { source: 'express', typescript: true, type: 'functions', prompt: 'deleteMethod', template: SEQUELIZE_DELETE },
]




export default templates;