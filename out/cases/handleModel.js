"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleModel;
const insertSnippet_1 = __importDefault(require("../utils/insertSnippet"));
const string_1 = require("../utils/string");
const generateSnippet_1 = __importDefault(require("../utils/generateSnippet"));
const editor_1 = require("../utils/editor");
const generateModel = async (input, modelName, projectName, repoName) => {
    // const fields = input.replace(/ /g, "").split(",");
    const fields = input.split(' ');
    const className = `${(0, string_1.capitalize)((0, string_1.unpluralize)(modelName))}`;
    const tableName = (0, string_1.uncapitalize)((0, string_1.pluralize)(modelName));
    const schemaName = `${(0, string_1.uncapitalize)((0, string_1.unpluralize)(modelName))}Schema`;
    const id = `${(0, string_1.uncapitalize)((0, string_1.unpluralize)(modelName))}Id`;
    const shopApiImports = `import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../config/westgate.db.config'
    `;
    const masterApiImports = `import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/${projectName}.db.config'`;
    const imports = repoName === 'shopwestgateapi' ? shopApiImports : masterApiImports;
    function parseField(field, i) {
        let type = "string";
        let name = field;
        let options = null;
        if (i === 0 && name === 'userId') {
            type = 'string';
            name = field;
        }
        else if (i === 0) {
            type = 'number';
            name = id;
        }
        else if (field.startsWith("#")) {
            type = "number";
            name = field.slice(1);
        }
        else if (field.startsWith("?")) {
            type = "boolean";
            name = field.slice(1);
        }
        else if (field.startsWith(":")) {
            type = "enum";
            name = field.slice(1).split(":")[0];
            options = field.split(":");
        }
        else if (field.startsWith('.')) {
            type = "decimal";
            name = field.slice(1).split(":")[0];
        }
        else if (field === 'userId') {
            type = "string";
            name = field;
        }
        else if (field.endsWith('Id')) {
            type = "number";
            name = field;
        }
        if (options) {
            options.shift();
            options.shift();
        }
        return { name, type, options };
    }
    const parsed = [modelName, ...fields].map(parseField);
    const enumOptions = (options, location) => {
        let string = "";
        if (!options)
            return string;
        if (location === "type") {
            options
                .map((option) => `'${option.trim()}'`)
                .forEach((option, i, arr) => (string = string + (arr.length === i + 1 ? option : `${option} | `)));
        }
        if (location === "values") {
            options
                .map((option) => `'${option.trim()}'`)
                .forEach((option, i, arr) => (string = string + (arr.length === i + 1 ? option : `${option}, `)));
        }
        return string;
    };
    // Generate TS declarations inside the class
    const classFields = parsed
        .map((f, i) => {
        if (i === 0) {
            return null;
            return `    declare ${id}: CreationOptional<number>`;
        }
        switch (f.type) {
            case "string":
                return `    declare ${f.name}: string`;
            case "number":
            case "decimal":
                return `    declare ${f.name}: number`;
            case "boolean":
                return `    declare ${f.name}: boolean`;
            case "enum":
                return `    declare ${f.name}: ${enumOptions(f.options, "type")}`;
        }
    })
        .filter(f => f)
        .join("\n");
    // Generate Sequelize field schema
    const schemaFields = parsed
        .map((f, i) => {
        let name = f.name;
        let type = f.type;
        switch (f.type) {
            case "string":
                type = "Sequelize.STRING";
                break;
            case "number":
                type = "Sequelize.INTEGER";
                break;
            case "decimal":
                type = "Sequelize.DECIMAL";
                break;
            case "boolean":
                type = "Sequelize.BOOLEAN";
                break;
            case "enum":
                type = `Sequelize.ENUM({ values: [${enumOptions(f.options, "values")}] })`;
                break;
        }
        const extras = (i === 0)
            ? ",\n        primaryKey: true,\n        autoIncrement: true"
            : "";
        return `    ${name}: {\n        type: ${type}${extras}\n    }`;
    })
        .join(",\n");
    const snippet = `${imports}

export type ${className}Attributes = InferAttributes<${className}, omit>
export type omit = { omit: 'createdAt' | 'updatedAt' }

class ${className} extends Model<InferAttributes<${className}, omit>, InferCreationAttributes<${className}, omit>> {
    declare ${id}: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
${classFields}
}

const ${schemaName} = {
${schemaFields}
}

${className}.init(${schemaName}, {
  sequelize,
  modelName: "${(0, string_1.unpluralize)(modelName)}",
  tableName: "${tableName}",
  timestamps: true
})

export default ${className};
`;
    await (0, insertSnippet_1.default)(snippet);
};
async function handleModel(input) {
    const lowerCaseInput = input.toLocaleLowerCase();
    const projectName = (0, editor_1.getProjectName)();
    const repoName = (0, editor_1.getRepoName)();
    let fileResourceName = (0, editor_1.getFileResourceName)();
    let resourceName = '';
    let prompt = '';
    let functionName = '';
    // hasone image
    // hasOne project
    // hasOne cartItem
    if (lowerCaseInput.startsWith('hasone')) {
        resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(input.split(' ')[1]));
        prompt = 'hasOne';
    }
    // product hasone image
    // cart hasOnce cartItem
    else if (lowerCaseInput.includes(' hasone ')) {
        const [first, hasone, second] = input.split(' ');
        fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(first));
        resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(second));
        prompt = 'hasOne';
    }
    // hasMany images
    // hasmany cartItems
    else if (lowerCaseInput.startsWith('hasmany')) {
        resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(input.split(' ')[1]));
        prompt = 'hasMany';
    }
    // product hasMany images
    // cart hasmany cartItems
    else if (lowerCaseInput.includes(' hasmany ')) {
        const [first, hasMany, second] = input.split(' ');
        fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(first));
        resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(second));
        prompt = 'hasMany';
    }
    // profile belongsto user
    // posts belongsto user
    // belongsto user
    else if (lowerCaseInput.includes('belongsto')) {
        // profile belongsto user
        if (input.split(' ').length === 3) {
            const [first, belongsto, second] = input.split(' ');
            fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(second));
            resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(first));
            prompt = first.endsWith('s') ? 'hasMany' : 'hasOne';
        }
        // belongsto user
        else {
            resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(fileResourceName));
            fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(input.split(' ')[1]));
            prompt = 'hasOne';
        }
    }
    // posts belongto user
    // belongto user
    else if (lowerCaseInput.includes('belongto')) {
        // posts belongto user
        if (input.split(' ').length === 3) {
            const [first, belongsto, second] = input.split(' ');
            fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(second));
            resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(first));
        }
        // belongto user
        else {
            resourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(fileResourceName));
            fileResourceName = (0, string_1.unpluralize)((0, string_1.uncapitalize)(input.split(' ')[1]));
        }
        prompt = 'hasMany';
    }
    // notes, userId, layoutId, text, #sort, .price, ?deleted, :status:active:inactive
    else {
        await generateModel(input, fileResourceName, projectName, repoName);
        return;
    }
    await (0, generateSnippet_1.default)({
        type: 'model',
        prompt,
        resourceName,
        functionName,
        fileResourceName
    });
}
//# sourceMappingURL=handleModel.js.map