"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFindQueryOptions = void 0;
exports.default = getPromptOptions;
const string_1 = require("./string");
/* Function options
    w where
    i include
    a attributes
    o order
    
*/
/* Controller options
    p params
    q query
    b body
*/
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
    if (prompt.includes("findbypk")) {
        const fields = prompt.replaceAll(",", "").split(" ");
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
    const getAttributeFields = (fields) => {
        if (!fields?.length)
            return `        attributes: [],`;
        const stringFields = fields.map((field) => `'${field}'`).join(", ");
        return `        attributes: [${stringFields}],`;
    };
    const getIncludeFields = (fields) => {
        if (!fields?.length)
            return `include: [
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
        return `include: [
    ${stringFields}
        ],`;
    };
    const getWhereFields = (fields) => {
        if (!fields?.length) {
            return "   where: { }";
        }
    };
    const getOrderFields = (fields) => {
        if (!fields?.length) {
            return "        order: [['createdAt', 'DESC']]";
        }
        const stringFields = fields.map((field) => `['${field}', 'DESC']`).join(", ");
        return `        order: [${stringFields}]`;
    };
    const stringOptions = promptOptions
        .map((f) => {
        switch (f.name) {
            case "where":
                return getWhereFields(f.fields);
            case "include":
                return getIncludeFields(f.fields);
            case "attributes":
                return getAttributeFields(f.fields);
            case "order":
                return getOrderFields(f.fields);
        }
    })
        .join("\n");
    return stringOptions;
};
exports.getFindQueryOptions = getFindQueryOptions;
//# sourceMappingURL=getPromptOptions.js.map