import { getFileResourceName } from '../utils/editor'
import generateSnippet from '../utils/generateSnippet';
import insertSnippet from '../utils/insertSnippet';

export default async function handleRoutes(input: string) {
    let fileResourceName = getFileResourceName();
    let resourceName = fileResourceName;
    let prompt = '';

    // f
    // full
    if (input === 'f' || input === 'full') {
        prompt = 'full'
    }

    // e
    // empty
    else if (input === 'e' || input === 'empty') {
        prompt = 'empty'
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
            const snippet = protect ? `router.route('${route}').${method}(protect, )` : `router.route('${route}').${method}()`

            await insertSnippet(snippet);
            return;
        }

        else {
            const method = words[0];
            const snippet = protect ? `router.route('/').${method}(protect, )` : `router.route('/').${method}()`

            await insertSnippet(snippet);
            return;
        }
    }


    await generateSnippet({
        type: 'routes',
        prompt,
        resourceName,
        fileResourceName
    });
}