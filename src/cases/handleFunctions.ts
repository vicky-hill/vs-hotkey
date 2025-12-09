import generateSnippet from '../utils/generateSnippet'
import { uncapitalize } from '../utils/string'

export default async function handleFunctions(input: string, fileResourceName: string) {
    const lowerCaseInput = input.toLocaleLowerCase();

    let resourceName = '';
    let functionName = '';
    let prompt = '';

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
    } else if ((lowerCaseInput.includes('by') || (input.startsWith('get') && !input.endsWith('s'))) && (!lowerCaseInput.includes('create') && !lowerCaseInput.includes('update') && !lowerCaseInput.includes('delete'))) {
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

        // sendMessage
        // applyCodeToCart
        else {
            resourceName = fileResourceName
            functionName = input.replace(/^--\s*/, "")
            prompt = 'custom'
        }
    }

    await generateSnippet({
        type: 'functions',
        prompt,
        resourceName,
        functionName,
        fileResourceName
    });
}