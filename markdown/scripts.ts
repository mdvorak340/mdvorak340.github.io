function updateOutput(input: HTMLTextAreaElement): void {
    console.log(input.value);
}

function loadExampleIntoInput(input: HTMLTextAreaElement): void {
    input.value = exampleFile;
    console.log(input.value);
}

const exampleFile = `# Mozzie's Markdown Demo

Markdown is a pretty simple format --- or, it *started* as a simple format, and quickly grew out of control.  I will attempt (and fail) to be brief but thorough as I explain how it is implemented here.

As I parse it, it consists of "blocks" seperated by empty lines, like this:

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

Each block represents something like a paragraph, a quote, block of code, etc.

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

[Paragraphs]{id="p"}
: The "standard unit" of text.  The default type of block; simply seperate them with blank lines.

\`\`\`md
first paragraph

second paragraph
that is a little
longer

third paragraph
\`\`\`

---

[Headers]{id="hx"}
: Used for section and document titles.  Begin them with \`#\`s; the more hashes the smaller the header.

\`\`\`md
# h1

## h2

### h3

...

###### h6
\`\`\`

---

[Definition lists]{id="dl"}
: Useful for defining terms, or for lists of "key / value" pairs.  Follow the "key" with the "value" preceded by a colon on a seperate line.

\`\`\`md
poika
: boy

mies
: man

boksi
: box

poikamies
: bachelor

poikamiesboksi
: bachelor box
: an apartment inhabited by a single adult man
\`\`\`

---

[Lists]{id="li"}
: Unordered lists --- "bullet points" --- can be made by starting lines with dashes or asterisks.
: Ordered lists can be made by starting lines with numbers --- the specific numbers don't matter, the program will number them automatically.

\`\`\`md
- unordered
- unordered
  - unordered
  - unordered
    - unordered
- unordered

1.  ordered
1.  ordered
  1.  ordered
  1.  ordered
1.  ordered
1.  ordered
\`\`\`

---

[Block quotes]{id="blockquote"}
: Used to quote large amounts of text.  Precede each line with \`>\`.

\`\`\`md
> I was on the Apollo 11 spacecraft.
> I have sailed the seven seas.
> I have lived a thousand lives,
> and through it all, I have seen
> the Truth.  And the Truth is crypto.
> Invest now.
\`\`\`

---

[Code blocks]{id="pre"}
: Used to display large amounts of code.  Open one by typing a number of backticks greater than two on a line, and close it with the same number of backticks.

\`\`\`\`md
\`\`\`haskell
qSort :: (Ord a) => [a] -> [a]
qSort [] = []
qSort (x:xs) =
    let less = qSort $ filter (<= x) xs
        more = qSort $ filter (> x)  xs
    in  less ++ [x] ++ more
\`\`\`
\`\`\`\`

---

[Context breaks]{id="hr"}
: Used to separate the document into different contexts.  Signal one with a line that contains nothing but three or more dashes.

\`\`\`md
one context

---

another context
\`\`\`

## Markup
`
