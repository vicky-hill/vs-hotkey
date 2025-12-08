# Hot Key - VS Code Extension

A VS Code extension that provides custom hotkeys for common editing operations.

## Features

This extension provides a simple demo command to get you started with VS Code extension development.

- **Hello World**: Display a greeting message

## Keyboard Shortcuts

### Windows/Linux

- `Ctrl+Shift+H` - Show Hello World message

### macOS

- `Cmd+Shift+H` - Show Hello World message

## Installation

### From Source

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile the extension
4. Press `F5` in VS Code to open a new window with the extension loaded

### From VSIX

1. Package the extension: `vsce package`
2. Install the `.vsix` file in VS Code

## Development

### Prerequisites

- Node.js (v20.x or higher)
- VS Code (v1.85.0 or higher)

### Building

```bash
npm install
npm run compile
```

### Testing

```bash
npm run test
```

### Watching for Changes

```bash
npm run watch
```

## Commands

All commands are available through the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- `Hot Key: Hello World`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Release Notes

### 0.0.1

Initial release with demo functionality:
- Hello World command
