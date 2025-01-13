# WIQIPEDIA

Wiqipedia is a fun demo project made to practice building a site using just
raw HTML, CSS, and JS.  Or, raw XHTML5, technically.

## FILE STRUCTURE

- `index.xhtml` is the core page and the only page that is ever loaded by
  the user.  It contains the document head and xml declaration, along with
  the navbar, error page, and home page.

  - `index.xhtml.css` contains all styles for `index.xhtml`.  This includes
    both a light and a dark mode, as well as numerous custom tags.
  - `index.xhtml.js` contains all javascript for `index.xhtml`.  The script
    waits until the `DOMContentLoaded` event has fired, and then:

    1.  Recursively fills all `wiqi-include`s macro style, in an extremely
        simple imitation of PHP's includes.  This process is async using
        `XMLHttpRequest`; all include bodies come from the `xhttp`
        folder and end with .XHTML.
    2.  If no page search paramter is given or the page is 'home', then it
        opens the home page.  Otherwise, it attempts to load the page
        from `xhttp/pages` and open it (then fill its `wiqi-include`s).  If
        the page can't be found, it opens an error page.

- `images` stores all images and icons for the site.
- `xhttp` stores all .XHTML include bodies loaded via `XMLHttpRequest`.

  - `xhttp/pages` stores all non-standard pages.

- `hosted` has nothing to do with the website, it is merely used to host images
  or other documents that can then be referenced by URL somewhere else.

## PAGE STRUCTURE AND CUSTOM TAGS

Example structure of a page in `xhttp/pages` using every custom element.

```xhtml
<wiqi-page id="page name, same as file name">
  <section id="section name">
    <h1>Page Title</h1>

    <wiqi-content>
      <p>
        text
      </p>
      <p>
        text
      </p>
    </wiqi-content>

    <wiqi-side-bar>
      <wiqi-link-tree>
        <h2>Links</h2>
        <nav>
          <a href="#section-id" title="#section-id">section on same page</a>
          <a href="?page=other-page" title="?page=other-page">other page</a>
          <a href="https://foo.com"
             title="https://foo.com"
             rel="external"
             >external page</a>  <!--angle brackets on same line for spans-->
        </nav>
      </wiqi-link-tree>
    </wiqi-side-bar>
  </section>

  <section id="section name">
    <h2>Section Title</h2>

    <wiqi-content>
      <p>
        text
      </p>

      <wiqi-quote>
        <q data-speaker="1">statement</q>
        <q data-speaker="2">response</q>
        <q data-speaker="1">response to response</q>
        <q data-speaker="3">interjection</q>
      </wiqi-quote>
    </wiqi-content>

    <wiqi-side-bar>
      <wiqi-profile>
        <h2>Profile</h2>

        <img src="./images/foo.png"
             alt="alt text"
             title="alt text" />

        <table>
          <tr>
            <td>name</td>
            <td>value</td>
          </tr>
          <tr>
            <td>name</td>
            <td>value</td>
          </tr>
        </table>
      </wiqi-profile>
    </wiqi-side-bar>
  </section>

  <section id="section name">
    <details>
      <summary>Collapsible Section Title</summary>

      <wiqi-content>
        <p>
          text <code data-lang="css">color:red;</code> text
        </p>
        <p>
          individual keyboard key: <kbd>@</kbd>
        </p>

        <code data-lang="c">
<pre>#include &lt;stdio.h&gt;

int
main(void)
{
    printf("Hell World!");
    return 0;
}</pre>
        </code>
      </wiqi-content>

      <wiqi-side-bar>
        <wiqi-profile>
          <h2>Profile</h2>

          <img src="./images/foo.png"
               alt="alt text"
               title="alt text"
               class="bordered" />

          <table>
            <tr>
              <td>name</td>
              <td>value</td>
            </tr>
          </table>
        </wiqi-profile>
      </wiqi-side-bar>
    </details>
  </section>
</wiqi-page>
```
