# Installation Guide

## Install the Extension in VS Code

You now have a `.vsix` file: `hotkey-0.0.1.vsix`

### Method 1: Install via VS Code UI (Easiest)

1. Open VS Code
2. Click on the **Extensions** icon in the sidebar (or press `Cmd+Shift+X`)
3. Click the **three dots** (`...`) at the top of the Extensions panel
4. Select **"Install from VSIX..."**
5. Navigate to `/Users/vicky/Documents/Repos/vshotkey/`
6. Select `hotkey-0.0.1.vsix`
7. Click **Install**
8. Reload VS Code when prompted

### Method 2: Install via Command Line

```bash
code --install-extension /Users/vicky/Documents/Repos/vshotkey/hotkey-0.0.1.vsix
```

## Verify Installation

1. Press `Cmd+Shift+P` to open Command Palette
2. Type "Hot Key" - you should see your commands:
   - Hot Key: Hello World
   - Hot Key: Create Route Folders

## Using the Extension

### Text Expansion (-- trigger)
1. Type any line starting with `--` (e.g., `-- getMilk`)
2. Press **Enter**
3. A code snippet will be inserted

### Create Route Folders
1. Press `Cmd+Shift+P`
2. Type "Hot Key: Create Route Folders"
3. Select the target folder
4. Enter the route name (e.g., "products")
5. Four files will be created:
   - `products.controller.ts`
   - `products.functions.ts`
   - `products.model.ts`
   - `products.routes.ts`

### Hello World
- Press `Cmd+Shift+H` to show a greeting message

## Uninstall

1. Go to Extensions panel (`Cmd+Shift+X`)
2. Search for "Hot Key"
3. Click the gear icon
4. Select "Uninstall"

## Update the Extension

When you make changes:

1. Make your code changes
2. Run: `npm run compile`
3. Run: `npx vsce package`
4. Uninstall the old version
5. Install the new `.vsix` file

## Publish to Marketplace (Optional)

To share with others:

1. Create a publisher account at https://marketplace.visualstudio.com/manage
2. Update `publisher` in `package.json`
3. Run: `npx vsce publish`
