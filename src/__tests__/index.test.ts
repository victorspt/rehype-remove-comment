import { describe, expect, test } from '@jest/globals';
import rehypeRaw from 'rehype-raw';
import rehypeRemoveComment from '../index.ts';
// @ts-expect-error The next dependency has unrecognized export.
import { serialize } from 'next-mdx-remote/serialize';

const mdContent =
  '---\n' +
  'title: Test Title\n' +
  'layout: testLayout.hbs\n' +
  '---\n' +
  '\n' +
  '<!-- HTML comment. -->\n' +
  '\n' +
  '<!--\n' +
  '\n' +
  'Multiline HTML comment.\n' +
  '\n' +
  'Testing.\n' +
  '\n' +
  'Testing more.\n' +
  '\n' +
  '-->\n' +
  '\n' +
  '---\n' +
  '\n' +
  '# Level-1 heading\n' +
  '\n' +
  '## Level-2 heading\n' +
  '\n' +
  'Markdown paragraph. Testing `inline code`.\n' +
  '\n' +
  '<section class="note">\n' +
  '### Level-3 heading inside HTML\n' +
  '  <p>Paragraph inside &lt;section&gt;</p>\n' +
  '</section>\n' +
  '\n' +
  '<!--\n' +
  'HTML multiline comment.\n' +
  '\n' +
  '```javascript\n' +
  "import { numbersUrl } from './constants.js';\n" +
  "import { mapNumber, isValid } from './functions.js';\n" +
  '\n' +
  '// Javascript line comment inside HTML multiline comment. "Test."\n' +
  '\n' +
  '/**\n' +
  ' * Javascript JSdoc inside HTML comment.\n' +
  ' */\n' +
  'async function getResult() {\n' +
  '  const response = await fetch(numbersUrl);\n' +
  '  const numbers = await response.json();\n' +
  '  const result = numbers\n' +
  '    .map(mapNumber)\n' +
  '    .reduce((accu /* Javascript inline comment. */, curr) => {\n' +
  '      return (isValid`${curr}`) ? accu + curr : accu;\n' +
  '    });\n' +
  '  return result;\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '```python\n' +
  'from db import db\n' +
  '\n' +
  '# Python line comment inside HTML comment.\n' +
  '\n' +
  'def sendNumbers():\n' +
  '    """\n' +
  '    Python multiline comment inside HTML comment.\n' +
  '    Testing.\n' +
  '    """\n' +
  '    return db.getNumbers()\n' +
  '```\n' +
  '\n' +
  '  <!-- HTML line comment inside an HTML multiline comment. -->\n' +
  '\n' +
  '-->\n' +
  '\n' +
  '## Level-2 heading\n' +
  '\n' +
  'Markdown Paragraph.\n' +
  '\n' +
  '- Markdown list item 1.\n' +
  '- Markdown list item 2.\n' +
  '- Markdown list item 3.\n' +
  '- Markdown list item 4.\n' +
  '\n' +
  '<table class="table-test">\n' +
  '  <tr>\n' +
  '    <td>HTML table cell.</td>\n' +
  '  </tr>\n' +
  '</table>\n' +
  '\n' +
  '<!-- HTML comment. -->\n' +
  '\n' +
  '[Markdown link](https://example.com)\n';

const optionsRemoveComments = {
  mdxOptions: {
    format: 'md',
    rehypePlugins: [rehypeRaw, rehypeRemoveComment],
  },
};

const optionsPreserveComments = {
  mdxOptions: {
    format: 'md',
    rehypePlugins: [rehypeRaw],
  },
};

describe('The rehype-remove-comment plugin', () => {
  test('removes HTML comments from the md file', async () => {
    const { compiledSource } = await serialize(
      mdContent,
      optionsRemoveComments,
    );
    expect(compiledSource).toMatchSnapshot();
  });

  test('when not applied preserve the HTML comments in the md file', async () => {
    const { compiledSource } = await serialize(
      mdContent,
      optionsPreserveComments,
    );
    expect(compiledSource).toMatchSnapshot();
  });
});
