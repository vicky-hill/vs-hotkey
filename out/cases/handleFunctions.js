"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleFunctions;
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const string_1 = require("../utils/string");
const insertSnippet_1 = __importDefault(require("../utils/insertSnippet"));
const getPromptOptions_1 = __importStar(require("../utils/getPromptOptions"));
const editor_1 = require("../utils/editor");
async function handleFunctions(input) {
    const untrimmedInput = input;
    input = input.trim();
    const lowerCaseInput = input.toLocaleLowerCase();
    let fileResourceName = (0, editor_1.getFileResourceName)();
    let resourceName = fileResourceName;
    let functionName = '';
    let prompt = '';
    let options = null;
    if (untrimmedInput.includes('    ')) {
        //   create
        //   c
        //   note create
        //   note c
        //   create note 
        //   c note
        if (lowerCaseInput.includes('create') || lowerCaseInput.startsWith('c ') || lowerCaseInput.endsWith(' c') || lowerCaseInput === 'c') {
            const words = input.split(' ');
            if (words.length === 2) {
                resourceName = ['create', 'c'].includes(words[0]) ? words[1] : words[0];
            }
            else {
                resourceName = fileResourceName;
            }
            prompt = 'createMethod';
        }
        //   update
        //   u
        //   note update
        //   note u
        //   update note 
        //   u note
        else if (lowerCaseInput.includes('update') || lowerCaseInput.startsWith('u ') || lowerCaseInput.endsWith(' u') || lowerCaseInput === 'u') {
            const words = input.split(' ');
            if (words.length === 2) {
                resourceName = ['update', 'u'].includes(words[0]) ? words[1] : words[0];
            }
            else {
                resourceName = fileResourceName;
            }
            prompt = 'updateMethod';
        }
        //   delete
        //   d
        //   note delete
        //   note d
        //   delete note 
        //   d note
        else if (lowerCaseInput.includes('delete') || lowerCaseInput.startsWith('d ') || lowerCaseInput.endsWith(' d') || lowerCaseInput === 'd') {
            const words = input.split(' ');
            if (words.length === 2) {
                resourceName = ['delete', 'd'].includes(words[0]) ? words[1] : words[0];
            }
            else {
                resourceName = fileResourceName;
            }
            prompt = 'deleteMethod';
        }
    }
    // full
    // empty
    // get, getall, getone, getby, getbyid
    // create, update, delete
    else if (['full', 'empty', 'get', 'getall', 'getone', 'getby', 'getbyid', 'create', 'update', 'delete'].includes(lowerCaseInput)) {
        resourceName = fileResourceName;
        prompt = lowerCaseInput;
        if (['get', 'getall'].includes(lowerCaseInput)) {
            prompt = 'get';
        }
        if (['getone', 'getby', 'getbyid'].includes(lowerCaseInput)) {
            prompt = 'getBy';
        }
    }
    // getProductById
    // getproductbyid
    // getProduct
    // getproduct
    else if ((lowerCaseInput.includes('by') || (input.startsWith('get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete') && !lowerCaseInput.includes('findbypk'))) {
        const match1 = input.match(/^get(.*)by/i);
        const match2 = input.match(/^get(.*)/i);
        resourceName = match1 ? (0, string_1.uncapitalize)(match1[1]) : match2 ? (0, string_1.uncapitalize)(match2[1]) : fileResourceName;
        prompt = 'getBy';
    }
    // f full
    // e empty
    // g get
    // c create
    // u update
    // d delete
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
    // getProductById
    // getproductbyid
    // getProduct
    // getproduct
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
        // include
        // i
        // include user 
        // i user posts
        else if (lowerCaseInput.startsWith('include') || lowerCaseInput.startsWith('i ') || lowerCaseInput === 'i') {
            options = (0, getPromptOptions_1.default)(input, 'functions');
            await (0, insertSnippet_1.default)(`        ${options}`);
            return;
        }
        // attributes
        // a 
        // attributes userId name
        // a userId name
        else if (lowerCaseInput.startsWith('attributes') || lowerCaseInput.startsWith('a ') || lowerCaseInput === 'a') {
            options = (0, getPromptOptions_1.default)(input, 'functions');
            await (0, insertSnippet_1.default)(`${options}`);
            return;
        }
        // order
        // o 
        // order createdAt
        // o createdAt
        else if (lowerCaseInput.startsWith('order') || lowerCaseInput.startsWith('o ') || lowerCaseInput === 'o') {
            options = (0, getPromptOptions_1.default)(input.replace('order', 'o'), 'functions');
            await (0, insertSnippet_1.default)(`${options}`);
            return;
        }
        // where
        // w
        // where userId active
        // w userId, active
        else if (lowerCaseInput.startsWith('where') || lowerCaseInput.startsWith('w ') || lowerCaseInput === 'w') {
            options = (0, getPromptOptions_1.default)(input, 'functions');
            await (0, insertSnippet_1.default)(`${options}`);
            return;
        }
        // findbypk
        // pk
        // product findbypk
        // product pk
        // findbypk product
        // pk productk
        // options: i include, a attributes, o order, p plain
        else if (lowerCaseInput.includes('findbypk') || lowerCaseInput.startsWith('pk') || lowerCaseInput.includes(' pk')) {
            const isPlain = input.includes(' p ') || input.endsWith(' p');
            const firstWord = lowerCaseInput.split(' ')[0];
            const secondWord = lowerCaseInput.split(' ')[1];
            if ((0, getPromptOptions_1.isOption)(secondWord) || !secondWord) {
                resourceName = fileResourceName;
            }
            else {
                resourceName = firstWord.includes('pk') ? secondWord : firstWord;
            }
            prompt = isPlain ? 'findByPkPlain' : 'findByPk';
            options = (0, getPromptOptions_1.default)(input, 'functions');
            if (options) {
                prompt = isPlain ? 'findByPkWithOptionsPlain' : 'findByPkWithOptions';
            }
        }
        // findone
        // one
        // product findone
        // product one
        // findone product
        // one product
        // options: i include, a attributes, p plain
        else if (lowerCaseInput.includes('findone') || lowerCaseInput.startsWith('one') || lowerCaseInput.includes(' one') || lowerCaseInput === 'one') {
            const isPlain = input.includes(' p ') || input.endsWith(' p');
            const firstWord = lowerCaseInput.split(' ')[0];
            const secondWord = lowerCaseInput.split(' ')[1];
            if ((0, getPromptOptions_1.isOption)(secondWord) || !secondWord) {
                resourceName = fileResourceName;
            }
            else {
                resourceName = firstWord.includes('one') ? secondWord : firstWord;
            }
            prompt = isPlain ? 'findOnePlain' : 'findOne';
            options = (0, getPromptOptions_1.default)(input, 'functions');
            if (options) {
                prompt = isPlain ? 'findOneWithOptionsPlain' : 'findOneWithOptions';
            }
        }
        // findall
        // all
        // product findall
        // product all
        // findall product
        // all product
        // options: w where, i include, a attributes, o order, p plain
        else if (lowerCaseInput.includes('findall') || lowerCaseInput.startsWith('all') || lowerCaseInput.includes(' all') || lowerCaseInput === 'all') {
            const isPlain = input.includes(' p ') || input.endsWith(' p');
            const firstWord = lowerCaseInput.split(' ')[0];
            const secondWord = lowerCaseInput.split(' ')[1];
            if ((0, getPromptOptions_1.isOption)(secondWord) || !secondWord) {
                resourceName = fileResourceName;
            }
            else {
                resourceName = firstWord.includes('one') ? secondWord : firstWord;
            }
            prompt = isPlain ? 'findAllPlain' : 'findAll';
            options = (0, getPromptOptions_1.default)(input, 'functions');
            if (options) {
                prompt = isPlain ? 'findAllWithOptionsPlain' : 'findAllWithOptions';
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
    await (0, generateSnippet_1.default)({
        type: 'functions',
        prompt,
        options,
        resourceName,
        functionName
    });
}
//# sourceMappingURL=handleFunctions.js.map