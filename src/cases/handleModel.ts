import insertSnippet from '../utils/insertSnippet';
import { capitalize, pluralize, uncapitalize, unpluralize } from '../utils/string'

interface Parsed {
    name: string
    type: string
    options: string[] | null
}

export default async function handleModel(input: string, modelName: string) {
    const fields = input.replace(/ /g, "").split(",");

    const className = `${capitalize(unpluralize(modelName))}Model`;
    const tableName = uncapitalize(pluralize(modelName.replace("Model", "")));
    const schemaName = `${uncapitalize(unpluralize(modelName))}Schema`;
    const interfaceName = capitalize(unpluralize(modelName));
    const id = `${uncapitalize(unpluralize(modelName))}Id`;

    function parseField(field: string) {
        let type = "string";
        let name = field;
        let options = null;

        if (field.startsWith("#")) {
            type = "number";
            name = field.slice(1);
        } else if (field.startsWith("?")) {
            type = "boolean";
            name = field.slice(1);
        } else if (field.startsWith(":")) {
            type = "enum";
            name = field.slice(1).split(":")[0];
            options = field.split(":");
        }

        if (options) {
            options.shift();
            options.shift();
        }

        return { name, type, options };
    }

    const parsed: Parsed[] = [modelName, ...fields].map(parseField);

    const enumOptions = (options: string[] | null, location: 'type' | 'values') => {
        let string = "";
        if (!options) return string;

        if (location === "type") {
            options
                .map((option) => `'${option.trim()}'`)
                .forEach(
                    (option, i, arr) =>
                        (string = string + (arr.length === i + 1 ? option : `${option} | `))
                );
        }

        if (location === "values") {
            options
                .map((option) => `'${option.trim()}'`)
                .forEach(
                    (option, i, arr) =>
                        (string = string + (arr.length === i + 1 ? option : `${option}, `))
                );
        }

        return string;
    };

    // Generate TS declarations inside the class
    const classFields = parsed
        .map((f, i) => {
            if (i === 0) {
                return `    declare ${id}: CreationOptional<number>`;
            }
            switch (f.type) {
                case "string":
                    return `    declare ${f.name}: string`;
                case "number":
                    return `    declare ${f.name}: number`;
                case "boolean":
                    return `    declare ${f.name}: boolean`;
                case "enum":
                    return `    declare ${f.name}: ${enumOptions(f.options, "type")}`;
            }
        })
        .join("\n");

    // Generate Sequelize field schema
    const schemaFields = parsed
        .map((f, i) => {
            let name = f.name;
            if (i === 0) name = id;

            let type;
            switch (f.type) {
                case "string":
                    type = "Sequelize.STRING";
                    break;
                case "number":
                    type = "Sequelize.INTEGER";
                    break;
                case "boolean":
                    type = "Sequelize.BOOLEAN";
                    break;
                case "enum":
                    type = `Sequelize.ENUM({ values: [${enumOptions(f.options, "values")}] })`;
                    break;
            }

            const extras =
                f.name === "product"
                    ? ",\n        primaryKey: true,\n        autoIncrement: true"
                    : "";

            return `    ${name}: {\n        type: ${type}${extras}\n    }`;
        })
        .join(",\n");

    const interfaceFields = parsed
        .map((f, i) => {
            if (i === 0) {
                return `    ${id}: number`;
            }
            switch (f.type) {
                case "string":
                    return `    ${f.name}: string`;
                case "number":
                    return `    ${f.name}: number`;
                case "boolean":
                    return `    ${f.name}: boolean`;
                case "enum":
                    return `    ${f.name}: ${enumOptions(f.options, "type")}`;
            }
        })
        .join("\n");

    const snippet = `
import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

export interface ${interfaceName} {
${interfaceFields}
}

class ${className} extends Model<InferAttributes<${className}>, InferCreationAttributes<${className}>> {
${classFields}
}

const ${schemaName} = {
${schemaFields}
}

${className}.init(${schemaName}, {
  sequelize,
  modelName: "${capitalize(unpluralize(modelName))}",
  tableName: "${tableName}",
  timestamps: false
})

export default ${className};
`;

    await insertSnippet(snippet);
}