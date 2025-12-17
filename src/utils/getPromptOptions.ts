import { FileType } from '../extension'
import { capitalize, uncapitalize, unpluralize } from './string';
import * as vscode from 'vscode';
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
    p plain
*/

/* Controller options
    p params
    q query
    b body
*/

export const isOption = (string: string) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        console.log('No editor')
        return;
    }

    const filename = editor.document.fileName.split('/').pop() || 'untitled';
    const fileType: FileType = filename.split('.')[1] as FileType;

    if (fileType === 'functions' || fileType === 'utils') {
        return ['include', 'attributes', 'where', 'i', 'a', 'w', 'o', 'p'].includes(string);
    }

    return false;
}


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

    if (fileType === 'functions') {
        const fields = prompt
            .replaceAll(",", "")
            .replaceAll(" p ", "")
            .replaceAll("  ", " ")
            .replaceAll("include", "i")
            .replaceAll("attributes", "a")
            .replaceAll("where", "w")
            .split(" ");

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
    const getAttributeFields = (fields: string[], isFirst: boolean) => {
        const space = isFirst ? '' : '        ';
        if (!fields?.length) return `${space}attributes: [],`;

        const stringFields = fields.map((field) => `'${field}'`).join(", ");

        return `${space}attributes: [${stringFields}],`;
    };

    const getIncludeFields = (fields: string[], isFirst: boolean) => {
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

        return `${space}include: [
    ${stringFields}
        ],`;
    };

    const getWhereFields = (fields: string[], isFirst: boolean) => {
        const space = isFirst ? '' : '        ';

        if (!fields?.length) {
            return `${space}where: { },`;
        }

        const stringFields = fields.map((field) => `${field}`).join(", ");
        return `${space}where: { ${stringFields} },`
    };

    const getOrderFields = (fields: string[], isFirst: boolean) => {
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
}