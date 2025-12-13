import { FileType } from '../extension'
import { capitalize, uncapitalize, unpluralize } from './string';
type OptionLetter = "i" | "a" | "o" | "w" | "p" | "b" | "q" | "p" 

interface Option {
    name: string
    fields: string[]
}

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


export default function getPromptOptions(prompt: string, fileType: FileType) {
    const getOptionName = (option: OptionLetter) => {
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
        const options: Option[] = [];

        let currentOption: Option | null = null;

        fields.forEach((field: string, i: number, arr: string[]) => {
            if (field.length === 1) {
                const nextField = arr[i + 1];

                if (!nextField || nextField.length === 1) {
                    if (currentOption?.fields?.length) {
                        options.push({ ...currentOption });
                        currentOption.name = getOptionName(field as OptionLetter);
                        currentOption.fields = [];
                    }

                    options.push({ name: getOptionName(field as OptionLetter), fields: [] });
                    return;
                }

                if (currentOption) {
                    options.push({ ...currentOption });
                    currentOption.name = getOptionName(field as OptionLetter);
                    currentOption.fields = [];
                } else {
                    currentOption = {
                        name: getOptionName(field as OptionLetter),
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
            return getFindQueryOptions(options);
        }

        return null
    }
}

export const getFindQueryOptions = (promptOptions: Option[]) => {
    const getAttributeFields = (fields: string[]) => {
        if (!fields?.length) return `        attributes: [],`;

        const stringFields = fields.map((field) => `'${field}'`).join(", ");

        return `        attributes: [${stringFields}],`;
    };

    const getIncludeFields = (fields: string[]) => {
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
                model: ${capitalize(unpluralize(f))}Model,
                as: '${uncapitalize(f)}'
            },`;
                }
                return `            { 
                model: ${capitalize(unpluralize(f))}Model,
                as: '${uncapitalize(f)}' 
            },`;
            })
            .join("\n");

        return `include: [
    ${stringFields}
        ],`;
    };

    const getWhereFields = (fields: string[]) => {
        if (!fields?.length) {
            return "   where: { }";
        }
    };

    const getOrderFields = (fields: string[]) => {
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
}