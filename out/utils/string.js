"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceResource = exports.getResource = exports.getPrompt = exports.unpluralize = exports.pluralize = exports.uncapitalize = exports.capitalize = exports.actions = void 0;
exports.actions = [
    "getAll",
    "getUser",
    "by",
    "get",
    "create",
    "update",
    "delete",
];
const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
exports.capitalize = capitalize;
const uncapitalize = (value) => {
    return value.charAt(0).toLowerCase() + value.slice(1);
};
exports.uncapitalize = uncapitalize;
const pluralize = (value) => {
    if (value.endsWith("y")) {
        return value.slice(0, -1) + "ies";
    }
    else {
        return value.endsWith("s") ? value : value + "s";
    }
};
exports.pluralize = pluralize;
const unpluralize = (value) => {
    if (value.toLocaleLowerCase().endsWith("ies")) {
        return `${value.slice(0, -3)}y`;
    }
    if (value.toLowerCase().endsWith("s")) {
        return value.slice(0, -1);
    }
    return value;
};
exports.unpluralize = unpluralize;
const getPrompt = (value) => {
    if (value === 'full' || value === 'empty')
        return value;
    if ((value.includes('By') || !value.endsWith('s')) && (!value.includes('create') && !value.includes('update') && !value.includes('delete')))
        return 'getBy';
    if (value.startsWith('get'))
        return 'get';
    if (value.startsWith('create'))
        return 'create';
    if (value.startsWith('update'))
        return 'update';
    if (value.startsWith('delete'))
        return 'delete';
};
exports.getPrompt = getPrompt;
const getResource = (value, filename) => {
    if (value === 'getUser')
        return 'user';
    if (value === 'full' || value === 'empty')
        return (0, exports.unpluralize)((0, exports.uncapitalize)(filename.split('.')[0]));
    const usedAction = exports.actions.find((action) => value.includes(action));
    const resource = value.replace(`${usedAction}`, '');
    if (resource.includes("By")) {
        return (0, exports.unpluralize)(resource.split("By")[0]);
    }
    return (0, exports.unpluralize)((0, exports.uncapitalize)(resource));
};
exports.getResource = getResource;
const replaceResource = (template, resource, functionName, fileResourceName, options) => {
    let snippet = template
        .replaceAll("Product", (0, exports.unpluralize)((0, exports.capitalize)(resource)))
        .replaceAll("product", (0, exports.unpluralize)((0, exports.uncapitalize)(resource)))
        .replaceAll("Products", (0, exports.pluralize)((0, exports.capitalize)(resource)))
        .replaceAll("products", (0, exports.pluralize)((0, exports.uncapitalize)(resource)));
    if (fileResourceName) {
        snippet = snippet
            .replaceAll("FileResourceName", (0, exports.unpluralize)((0, exports.capitalize)(fileResourceName)))
            .replaceAll("fileResourceName", (0, exports.unpluralize)((0, exports.uncapitalize)(fileResourceName)));
    }
    if (functionName) {
        snippet = snippet
            .replaceAll("functionName", functionName);
    }
    if (options) {
        snippet = snippet
            .replace("options", options);
    }
    return snippet;
};
exports.replaceResource = replaceResource;
//# sourceMappingURL=string.js.map