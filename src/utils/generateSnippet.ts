
import { FileType } from '../extension';
import templates from '../templates'
import insertSnippet from './insertSnippet'
import { getPrompt, getResource, replaceResource } from './string'

interface GenerateSnippet {
  type: FileType
  prompt: string 
  options?: string | null | undefined
  resourceName: string 
  functionName?: string
  fileResourceName?: string
}

const generateSnippet = async ({ type, prompt, resourceName, functionName, fileResourceName, options} : GenerateSnippet) => {
  const template = templates.find(template => template.type === type && template.prompt === prompt);
  if (!template) return null;

  const snippetText = replaceResource(
      template.template, 
      resourceName, 
      functionName || null, 
      fileResourceName || null,
      options || null
    );
  await insertSnippet(snippetText)
}

export default generateSnippet;