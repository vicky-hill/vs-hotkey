"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const templates_1 = __importDefault(require("../templates"));
const insertSnippet_1 = __importDefault(require("./insertSnippet"));
const string_1 = require("./string");
const generateSnippet = async ({ type, prompt, resourceName, functionName, options, fileResourceName }) => {
    const template = templates_1.default.find(template => template.type === type && template.prompt === prompt);
    if (!template)
        return null;
    const snippetText = (0, string_1.replaceResource)(template.template, resourceName, functionName || null, options || null, fileResourceName || null);
    await (0, insertSnippet_1.default)(snippetText);
};
exports.default = generateSnippet;
//# sourceMappingURL=generateSnippet.js.map