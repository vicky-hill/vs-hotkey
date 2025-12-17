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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFindQueryOptions = exports.isOption = void 0;
exports.default = getPromptOptions;
const string_1 = require("./string");
const vscode = __importStar(require("vscode"));
/* Function options
    w where
    i include
    a attributes
    o order
    p plain
*/
/* Controller options
    p params
    q query
    b body
*/
const isOption = (string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log('No editor');
        return;
    }
    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileType = filename.split('.')[1];
    if (fileType === 'functions' || fileType === 'utils') {
        return ['include', 'attributes', 'where', 'i', 'a', 'w', 'o', 'p'].includes(string);
    }
    return false;
};
exports.isOption = isOption;
function getPromptOptions(prompt, fileType) {
    const getOptionName = (option) => {
        if (fileType === 'functions') {
            switch (option) {
                case "i":
                    return "include";
                case "a":
                    return "attributes";
                case "o":
                    return "order";
                case "w":
                    return "where";
                default:
                    return option;
            }
        }
        if (fileType === 'controller') {
            switch (option) {
                case "p":
                    return "params";
                case "q":
                    return "query";
                case "b":
                    return "body";
                default:
                    return option;
            }
        }
        return option;
    };
    if (fileType === 'functions') {
        const fields = prompt
            .replaceAll(",", "")
            .replaceAll(" p ", "")
            .replaceAll("  ", " ")
            .replaceAll("include", "i")
            .replaceAll("attributes", "a")
            .replaceAll("where", "w")
            .split(" ");
        const options = [];
        let currentOption = null;
        fields.forEach((field, i, arr) => {
            if (field.length === 1) {
                const nextField = arr[i + 1];
                if (!nextField || nextField.length === 1) {
                    if (currentOption?.fields?.length) {
                        options.push({ ...currentOption });
                        currentOption.name = getOptionName(field);
                        currentOption.fields = [];
                    }
                    options.push({ name: getOptionName(field), fields: [] });
                    return;
                }
                if (currentOption) {
                    options.push({ ...currentOption });
                    currentOption.name = getOptionName(field);
                    currentOption.fields = [];
                }
                else {
                    currentOption = {
                        name: getOptionName(field),
                        fields: []
                    };
                }
                return;
            }
            if (currentOption) {
                currentOption.fields.push(field);
            }
            if (arr.length === i + 1 && currentOption) {
                options.push({ ...currentOption });
            }
        });
        if (fileType === 'functions' && options) {
            return (0, exports.getFindQueryOptions)(options);
        }
        return null;
    }
}
const getFindQueryOptions = (promptOptions) => {
    const getAttributeFields = (fields, isFirst) => {
        const space = isFirst ? '' : '        ';
        if (!fields?.length)
            return `${space}attributes: [],`;
        const stringFields = fields.map((field) => `'${field}'`).join(", ");
        return `${space}attributes: [${stringFields}],`;
    };
    const getIncludeFields = (fields, isFirst) => {
        const space = isFirst ? '' : '        ';
        if (!fields?.length)
            return `${space}include: [
            {
                model: ,
                as: ''
            }
        ],`;
        const stringFields = fields
            .map((f, i, arr) => {
            if (i === 0) {
                return `        { 
                model: ${(0, string_1.capitalize)((0, string_1.unpluralize)(f))}Model,
                as: '${(0, string_1.uncapitalize)(f)}'
            },`;
            }
            return `            { 
                model: ${(0, string_1.capitalize)((0, string_1.unpluralize)(f))}Model,
                as: '${(0, string_1.uncapitalize)(f)}' 
            },`;
        })
            .join("\n");
        return `${space}include: [
    ${stringFields}
        ],`;
    };
    const getWhereFields = (fields, isFirst) => {
        const space = isFirst ? '' : '        ';
        if (!fields?.length) {
            return `${space}where: { },`;
        }
        const stringFields = fields.map((field) => `${field}`).join(", ");
        return `${space}where: { ${stringFields} },`;
    };
    const getOrderFields = (fields, isFirst) => {
        const space = isFirst ? '' : '        ';
        if (!fields?.length) {
            return `${space}order: [['createdAt', 'DESC']]`;
        }
        const stringFields = fields.map((field) => `['${field}', 'DESC']`).join(", ");
        return `${space}order: [${stringFields}]`;
    };
    const stringOptions = promptOptions
        .map((f, i) => {
        const isFirst = i === 0;
        switch (f.name) {
            case "where":
                return getWhereFields(f.fields, isFirst);
            case "include":
                return getIncludeFields(f.fields, isFirst);
            case "attributes":
                return getAttributeFields(f.fields, isFirst);
            case "order":
                return getOrderFields(f.fields, isFirst);
        }
    })
        .join("\n");
    return stringOptions;
};
exports.getFindQueryOptions = getFindQueryOptions;
//# sourceMappingURL=getPromptOptions.js.map