function updateOutput(input: HTMLTextAreaElement): void {
    console.log(input.value);
}

const exampleFile = `# Mozzie's Markdown Demo

Markdown is a pretty simple format --- or, it *started* as a simple format, and quickly grew out of control.

As I parse it, it consists of "blocks" separarted by empty lines, like this:

\`\`\`\`md
# Section Header

Paragraph paragraph paragraph.

- List
- List
- List

\`\`\`js
console.log('code');
\`\`\`
\`\`\`\`

Each block represents something like a paragraph, a quote, and block of code, etc.

Within these blocks is text that contains "markup", like *italics*, **boldface**, ^^smallcaps^^, \`code\`, and more.

## Blocks

There are seven blocks I recognize here:

1.  [Paragraphs](#p).
2.  [Headers](#hx).
3.  [Definition lists](#dl).
4.  [Lists (Ordered and Unordered)](#li).
5.  [Block quotes](#blockquote).
6.  [Code blocks](#pre).
7.  [Context breaks](#hr).
`
