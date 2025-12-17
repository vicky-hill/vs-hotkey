"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleController;
const editor_1 = require("../utils/editor");
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const string_1 = require("../utils/string");
const insertSnippet_1 = __importDefault(require("../utils/insertSnippet"));
async function handleController(input) {
    const lowerCaseInput = input.toLocaleLowerCase();
    const fileResourceName = (0, editor_1.getFileResourceName)();
    let resourceName = fileResourceName;
    let functionName = '';
    let prompt = '';
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
    else if ((lowerCaseInput.includes('by') || (input.startsWith('get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete'))) {
        const match1 = input.match(/^get(.*)by/i);
        const match2 = input.match(/^get(.*)/i);
        resourceName = match1 ? (0, string_1.uncapitalize)(match1[1]) : match2 ? (0, string_1.uncapitalize)(match2[1]) : fileResourceName;
        prompt = 'getBy';
        // f full
        // e empty
        // g get
        // c create
        // u update
        // d delete
    }
    else if (['f', 'e', 'g', 'c', 'u', 'd'].includes(input)) {
        switch (input) {
            case 'f':
                prompt = 'full';
                break;
            case 'e':
                prompt = 'empty';
                break;
            case 'g':
                prompt = 'get';
                break;
            case 'c':
                prompt = 'create';
                break;
            case 'u':
                prompt = 'update';
                break;
            case 'd':
                prompt = 'delete';
                break;
        }
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
        // p params
        else if (input === 'p') {
            await (0, insertSnippet_1.default)('    const {  } = req.params;');
            return;
        }
        // q query
        else if (input === 'q') {
            await (0, insertSnippet_1.default)('    const {  } = req.query;');
            return;
        }
        // i userId
        else if (input === 'i') {
            await (0, insertSnippet_1.default)('    const { userId } = req.user;');
            return;
        }
        else {
            // sendMessage
            // applyCodeToCart
            // options: p params, q query, i userId
            resourceName = fileResourceName;
            functionName = input.replace(/^--\s*/, "");
            prompt = 'custom';
        }
    }
    await (0, generateSnippet_1.default)({
        type: 'controller',
        prompt,
        resourceName,
        functionName
    });
}
//# sourceMappingURL=handleController.js.map