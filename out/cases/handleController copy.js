"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleController;
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const string_1 = require("../utils/string");
async function handleController(input, fileResourceName) {
    const lowerCaseInput = input.toLocaleLowerCase();
    let resourceName = '';
    let functionName = '';
    let prompt = '';
    if (['-- full', '-- empty', '-- get', '-- getall', '-- getone', '-- getby', '-- getbyid', '-- create', '-- update', '-- delete'].includes(lowerCaseInput)) {
        resourceName = fileResourceName;
        prompt = lowerCaseInput;
        if (['-- get', '-- getall'].includes(lowerCaseInput)) {
            prompt = '-- get';
        }
        if (['-- getone', '-- getby', '-- getbyid'].includes(lowerCaseInput)) {
            prompt = '-- getBy';
        }
        // getProductById
        // getproductbyid
        // getProduct
        // getproduct
    }
    else if ((lowerCaseInput.includes('by') || (input.startsWith('-- get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete'))) {
        const match1 = input.match(/^-- get(.*)by/i);
        const match2 = input.match(/^-- get(.*)/i);
        resourceName = match1 ? (0, string_1.uncapitalize)(match1[1]) : match2 ? (0, string_1.uncapitalize)(match2[1]) : fileResourceName;
        prompt = '-- getBy';
    }
    else {
        // getProducts
        // getproducts
        if (input.startsWith('-- get')) {
            prompt = '-- get';
            resourceName = input.replace('-- get', '');
        }
        // createProduct
        // createproduct
        if (input.startsWith('-- create')) {
            prompt = '-- create';
            resourceName = input.replace('-- create', '');
        }
        // updateProduct
        // updateproduct
        if (input.startsWith('-- update')) {
            prompt = '-- update';
            resourceName = input.replace('-- update', '');
        }
        // deleteProduct
        // deleteproduct
        if (input.startsWith('-- delete')) {
            prompt = '-- delete';
            resourceName = input.replace('-- delete', '');
        }
        // sendMessage
        // applyCodeToCart
        resourceName = fileResourceName;
        functionName = input.replace(/^--\s*/, "");
        prompt = '-- custom';
    }
    await (0, generateSnippet_1.default)('controller', prompt, resourceName, functionName);
}
//# sourceMappingURL=handleController%20copy.js.map