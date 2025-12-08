# Quick Start Guide

## Testing the Extension

1. **Open the project in VS Code**
   ```bash
   code /Users/vicky/Documents/Repos/vshotkey
   ```

2. **Press F5** to launch the Extension Development Host
   - This will open a new VS Code window with your extension loaded

3. **Test the command**:
   - Open any file in the new window
   - Try the keyboard shortcut:
     - `Cmd+Shift+H` - Show Hello World message

4. **Or use Command Palette**:
   - Press `Cmd+Shift+P`
   - Type "Hot Key" to see all available commands

## Development Workflow

### Watch Mode
Run this in a terminal to automatically recompile on changes:
```bash
npm run watch
```

### Manual Compilation
```bash
npm run compile
```

### Linting
```bash
npm run lint
```

## Packaging for Distribution

1. **Install vsce** (VS Code Extension Manager):
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Package the extension**:
   ```bash
   vsce package
   ```
   This creates a `.vsix` file you can share or publish

3. **Install locally**:
   - In VS Code: Extensions → ... → Install from VSIX
   - Select the generated `.vsix` file

## Publishing to Marketplace

1. **Create a publisher** at https://marketplace.visualstudio.com/manage

2. **Update package.json** with your publisher name

3. **Get a Personal Access Token** from Azure DevOps

4. **Login and publish**:
   ```bash
   vsce login your-publisher-name
   vsce publish
   ```

## Customization

### Adding New Commands

1. Add command to `package.json` under `contributes.commands`
2. Add keybinding to `package.json` under `contributes.keybindings`
3. Implement handler in `src/extension.ts`
4. Register in `context.subscriptions.push()`

### Modifying Keybindings

Edit the `keybindings` section in `package.json` to change shortcuts.

## Troubleshooting

- **Extension not loading**: Check the Debug Console for errors
- **Commands not working**: Verify `when` clauses in keybindings
- **TypeScript errors**: Run `npm install` and `npm run compile`
