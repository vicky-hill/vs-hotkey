import { getFileResourceName } from '../utils/editor'
import generateSnippet from '../utils/generateSnippet'
import { uncapitalize } from '../utils/string'
import insertSnippet from '../utils/insertSnippet';


export default async function handleController(input: string) {
    const lowerCaseInput = input.toLocaleLowerCase();
    const fileResourceName = getFileResourceName();

    let resourceName = fileResourceName;
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

        // f full
        // e empty
        // g get
        // c create
        // u update
        // d delete
    } else if (['f', 'e', 'g', 'c', 'u', 'd'].includes(input)) {
        switch (input) {
            case 'f':
                prompt = 'full'
                break;
            case 'e':
                prompt = 'empty'
                break;
            case 'g':
                prompt = 'get'
                break;
            case 'c':
                prompt = 'create'
                break;
            case 'u':
                prompt = 'update'
                break;
            case 'd':
                prompt = 'delete'
                break;
        }

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

        // p params
        else if (input === 'p') {
            await insertSnippet('    const {  } = req.params;');
            return;
        }

        // q query
        else if (input === 'q') {
            await insertSnippet('    const {  } = req.query;');
            return;
        }

        // i userId
        else if (input === 'i') {
            await insertSnippet('    const { userId } = req.user;');
            return;
        }

   

        else {
            // sendMessage
            // applyCodeToCart
            // options: p params, q query, i userId
            resourceName = fileResourceName
            functionName = input.replace(/^--\s*/, "")
            prompt = 'custom'
        }
    }

    await generateSnippet({
        type: 'controller',
        prompt,
        resourceName,
        functionName
    });
}