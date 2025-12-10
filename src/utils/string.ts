export const actions = [
  "getAll",
  "getUser",
  "by",
  "get",
  "create",
  "update",
  "delete",
];

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const uncapitalize = (value: string) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
};

export const pluralize = (value: string) => {
  if (value.endsWith("y")) {
    return value.slice(0, -1) + "ies";
  } else {
    return value.endsWith("s") ? value : value + "s";
  }
};

export const unpluralize = (value: string) => {
  if (value.toLowerCase().endsWith("s")) {
    return value.slice(0, -1);
  }

  return value;
};

export const getPrompt = (value: string) => {
  if (value === 'full' || value === 'empty') return value;

  if ((value.includes('By') || !value.endsWith('s')) && (!value.includes('create') && !value.includes('update') && !value.includes('delete'))) return 'getBy'
  if (value.startsWith('get')) return 'get'
  if (value.startsWith('create')) return 'create'
  if (value.startsWith('update')) return 'update'
  if (value.startsWith('delete')) return 'delete'
}

export const getResource = (value: string, filename: string) => {
  if (value === 'getUser') return 'user';
  if (value === 'full' || value === 'empty') return unpluralize(uncapitalize(filename.split('.')[0]));

  const usedAction = actions.find((action) => value.includes(action));

  const resource = value.replace(`${usedAction}`, '')

  if (resource.includes("By")) {
    return unpluralize(resource.split("By")[0]);
  }

  return unpluralize(uncapitalize(resource));
};

export const replaceResource = (template: any, resource: string, functionName: string | null, fileResourceName: string | null) => {
  let snippet = template
    .replaceAll("Product", unpluralize(capitalize(resource)))
    .replaceAll("product", unpluralize(uncapitalize(resource)))
    .replaceAll("Products", pluralize(capitalize(resource)))
    .replaceAll("products", pluralize(uncapitalize(resource)))

  if (fileResourceName) {
    snippet = snippet
      .replaceAll("FileResourceName", unpluralize(capitalize(fileResourceName)))
      .replaceAll("fileResourceName", unpluralize(uncapitalize(fileResourceName)))
  }

  if (functionName) {
    snippet = snippet
      .replaceAll("functionName", functionName)
  }

  return snippet;
};
