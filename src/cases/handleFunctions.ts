import generateSnippet from '../utils/generateSnippet'
import { uncapitalize, capitalize, unpluralize } from '../utils/string';
import insertSnippet from '../utils/insertSnippet';
import templates from '../templates';
import getPromptOptions from '../utils/getPromptOptions';

export default async function handleFunctions(input: string, fileResourceName: string) {
    const lowerCaseInput = input.toLocaleLowerCase();

    let resourceName = '';
    let functionName = '';
    let prompt = '';
    let options = null;

    if (['full', 'empty', 'get', 'getall', 'getone', 'getby', 'getbyid', 'create', 'update', 'delete'].includes(lowerCaseInput)) {
        resourceName = fileResourceName;
        prompt = lowerCaseInput;

        if (['get', 'getall'].includes(lowerCaseInput)) {
            prompt = 'get'
        }

        if (['getone', 'getby', 'getbyid'].includes(lowerCaseInput)) {
            prompt = 'getBy'
        }

        // getProductById
        // getproductbyid
        // getProduct
        // getproduct
    } else if ((lowerCaseInput.includes('by') || (input.startsWith('get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete') && !lowerCaseInput.includes('findbypk'))) {
        const match1 = input.match(/^get(.*)by/i);
        const match2 = input.match(/^get(.*)/i);
        resourceName = match1 ? uncapitalize(match1[1]) : match2 ? uncapitalize(match2[1]) : fileResourceName;
        prompt = 'getBy'

    } else {

        // getProducts
        // getproducts
        if (input.startsWith('get')) {
            prompt = 'get'
            resourceName = input.replace('get', '');
        }

        // createProduct
        // createproduct
        else if (input.startsWith('create')) {
            prompt = 'create'
            resourceName = input.replace('create', '');
        }

        // updateProduct
        // updateproduct
        else if (input.startsWith('update')) {
            prompt = 'update'
            resourceName = input.replace('update', '');
        }

        // deleteProduct
        // deleteproduct
        else if (input.startsWith('delete')) {
            prompt = 'delete'
            resourceName = input.replace('delete', '');
        }

        // include user
        // i user
        else if (lowerCaseInput.startsWith('include') || lowerCaseInput.startsWith('i ')) {
            resourceName = uncapitalize(input.split(' ')[1]);

            const template: any = templates.find(template => template.type === 'functions' && template.prompt === 'include');
            const snippetText = template?.template
                .replaceAll("Product", unpluralize(capitalize(resourceName)))
                .replaceAll("product", uncapitalize(resourceName))
            await insertSnippet(snippetText);

            return;
        }

        // findbypk
        // post findbypk
        else if (lowerCaseInput.includes('findbypk')) {
            resourceName = lowerCaseInput.startsWith('findbypk') ? fileResourceName : input.split(' ')[0];
            prompt = 'findByPk'
            options = getPromptOptions(input, 'functions') 

            if (options) {
                prompt = 'findByPkWithOptions'
            }
        }

        // sendMessage
        // applyCodeToCart
        else {
            resourceName = fileResourceName
            functionName = input.replace(/^--\s*/, "")
            prompt = 'custom'
        }
    }

    console.log('prompt', prompt)

    await generateSnippet({
        type: 'functions',
        prompt,
        options,
        resourceName,
        functionName,
        fileResourceName
    });
}