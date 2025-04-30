# MCP TypeScript Starter

A starter MCP server implementation using TypeScript, inspired by the Go version.

## Setup

```
npm install
```

## Running the Server

```
# Run in development mode (using ts-node)
npm run dev

# Or use the script
./script/ts-run

# Build and run the compiled version
npm run build
npm start
```

## Environment Variables

- `MCP_GREETING`: Customizes the greeting used by the hello_world tool (default: "Hello")


## Features

### Tools

- `hello`: Says hello to someone (uses MCP_GREETING)

### Resources

- `example://md`: Serves the markdown file in `src/resources/example.md`

### Prompts

- `greeting-prompt`: A prompt that greets the user by name

## License

MIT
