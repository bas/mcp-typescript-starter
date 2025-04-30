const { defineHelloTool } = require('./lib/tools');
const { defineExampleResource } = require('./lib/resources');
const { defineExamplePrompt } = require('./lib/prompts');

describe('MCP Server', () => {
  it('hello tool returns greeting', async () => {
    const toolDef = defineHelloTool('TestHello');
    const result = await toolDef.handler({ name: 'World' }, {});
    expect(result.content[0].text).toBe('TestHello, World!');
  });

  it('example resource returns markdown', async () => {
    const resourceDef = defineExampleResource();
    const result = await resourceDef.handler(new URL('example://md'));
    expect(result.contents[0].text).toContain('Example Markdown Resource');
  });

  it('greeting prompt returns prompt message', () => {
    const promptDef = defineExamplePrompt();
    const result = promptDef.handler({ name: 'Alice' }, {});
    expect(result.messages[0].content.text).toContain('Alice');
  });
});
