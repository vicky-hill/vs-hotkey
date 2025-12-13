"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleFunctions;
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const string_1 = require("../utils/string");
const insertSnippet_1 = __importDefault(require("../utils/insertSnippet"));
const templates_1 = __importDefault(require("../templates"));
const getPromptOptions_1 = __importDefault(require("../utils/getPromptOptions"));
async function handleFunctions(input, fileResourceName) {
    const lowerCaseInput = input.toLocaleLowerCase();
    let resourceName = '';
    let functionName = '';
    let prompt = '';
    let options = null;
    if (['full', 'empty', 'get', 'getall', 'getone', 'getby', 'getbyid', 'create', 'update', 'delete'].includes(lowerCaseInput)) {
        resourceName = fileResourceName;
        prompt = lowerCaseInput;
        if (['get', 'getall'].includes(lowerCaseInput)) {
            prompt = 'get';
        }
        if (['getone', 'getby', 'getbyid'].includes(lowerCaseInput)) {
            prompt = 'getBy';
        }
        // getProductById
        // getproductbyid
        // getProduct
        // getproduct
    }
    else if ((lowerCaseInput.includes('by') || (input.startsWith('get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete') && !lowerCaseInput.includes('findbypk'))) {
        const match1 = input.match(/^get(.*)by/i);
        const match2 = input.match(/^get(.*)/i);
        resourceName = match1 ? (0, string_1.uncapitalize)(match1[1]) : match2 ? (0, string_1.uncapitalize)(match2[1]) : fileResourceName;
        prompt = 'getBy';
    }
    else {
        // getProducts
        // getproducts
        if (input.startsWith('get')) {
            prompt = 'get';
            resourceName = input.replace('get', '');
        }
        // createProduct
        // createproduct
        else if (input.startsWith('create')) {
            prompt = 'create';
            resourceName = input.replace('create', '');
        }
        // updateProduct
        // updateproduct
        else if (input.startsWith('update')) {
            prompt = 'update';
            resourceName = input.replace('update', '');
        }
        // deleteProduct
        // deleteproduct
        else if (input.startsWith('delete')) {
            prompt = 'delete';
            resourceName = input.replace('delete', '');
        }
        // include user
        // i user
        else if (lowerCaseInput.startsWith('include') || lowerCaseInput.startsWith('i ')) {
            resourceName = (0, string_1.uncapitalize)(input.split(' ')[1]);
            const template = templates_1.default.find(template => template.type === 'functions' && template.prompt === 'include');
            const snippetText = template?.template
                .replaceAll("Product", (0, string_1.unpluralize)((0, string_1.capitalize)(resourceName)))
                .replaceAll("product", (0, string_1.uncapitalize)(resourceName));
            await (0, insertSnippet_1.default)(snippetText);
            return;
        }
        // findbypk
        // post findbypk
        else if (lowerCaseInput.includes('findbypk')) {
            resourceName = lowerCaseInput.startsWith('findbypk') ? fileResourceName : input.split(' ')[0];
            prompt = 'findByPk';
            options = (0, getPromptOptions_1.default)(input, 'functions');
            if (options) {
                prompt = 'findByPkWithOptions';
            }
        }
        // sendMessage
        // applyCodeToCart
        else {
            resourceName = fileResourceName;
            functionName = input.replace(/^--\s*/, "");
            prompt = 'custom';
        }
    }
    console.log('prompt', prompt);
    await (0, generateSnippet_1.default)({
        type: 'functions',
        prompt,
        options,
        resourceName,
        functionName,
        fileResourceName
    });
}
//# sourceMappingURL=handleFunctions.js.map