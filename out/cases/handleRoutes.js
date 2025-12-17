"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleRoutes;
const editor_1 = require("../utils/editor");
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const insertSnippet_1 = __importDefault(require("../utils/insertSnippet"));
async function handleRoutes(input) {
    let fileResourceName = (0, editor_1.getFileResourceName)();
    let resourceName = fileResourceName;
    let prompt = '';
    // f
    // full
    if (input === 'f' || input === 'full') {
        prompt = 'full';
    }
    // e
    // empty
    else if (input === 'e' || input === 'empty') {
        prompt = 'empty';
    }
    // get
    // get /products
    // options: p protect
    else if (input.startsWith('get') || input.startsWith('post') || input.startsWith('put') || input.startsWith('delete')) {
        const words = input.split(' ');
        const protect = words.includes('p');
        if (words.length > 1) {
            const method = words[0];
            const route = words[1].startsWith('/') ? words[1] : `/${words[1]}`;
            const snippet = protect ? `router.route('${route}').${method}(protect, )` : `router.route('${route}').${method}()`;
            await (0, insertSnippet_1.default)(snippet);
            return;
        }
        else {
            const method = words[0];
            const snippet = protect ? `router.route('/').${method}(protect, )` : `router.route('/').${method}()`;
            await (0, insertSnippet_1.default)(snippet);
            return;
        }
    }
    await (0, generateSnippet_1.default)({
        type: 'routes',
        prompt,
        resourceName,
        fileResourceName
    });
}
//# sourceMappingURL=handleRoutes.js.map