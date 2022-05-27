
<div align="center">
    <!-- <img src="docs/readme-logo.png"> -->
    <h1>cypress-plugin-tab <kbd>beta</kbd></h1>
    <a href="https://www.npmjs.com/package/cypress-plugin-tab"><img src="https://img.shields.io/npm/v/cypress-plugin-tab.svg?style=flat"></a>
    <a href="https://www.npmjs.com/package/cypress-plugin-tab"><img src="https://img.shields.io/npm/dt/cypress-plugin-tab.svg"></a>
    <a href="https://github.com/bkucera/cypress-plugin-tab/blob/master/LICENSE"><img src="https://img.shields.io/github/license/bkucera/cypress-plugin-tab.svg"></a>
<p>A Cypress plugin to add a tab command</p>

</div>

> :warning: this module is in beta, and might cause some strange failures. Please report bugs in the issues of this repo.

> Note: [please refer to this issue for updates about official cypress tab support](https://github.com/cypress-io/cypress/issues/299)

![](docs/readme-screenshot.png)
![](docs/readme-demo.gif)

### Installation

Add the plugin to `devDependencies`
```bash
npm install -D cypress-plugin-tab
```

At the top of **`cypress/support/index.js`**:
```js
require('cypress-plugin-tab')
```


### Usage

- `.tab()` must be chained off of a tabbable(focusable) subject, or the `body`
- `.tab()` changes the subject to the newly focused element after pressing `tab`
- `.tab({ shift: true })` sends a shift-tab to the element

```js
  cy.get('input').type('foo').tab().type('bar') // type foo, then press tab, then type bar
  cy.get('body').tab() // tab into the first tabbable element on the page
  cy.focused().tab() // tab into the currently focused element
```

shift+tab:

```js
cy.get('input')
  .type('foop').tab()
  .type('bar').tab({ shift: true })
  .type('foo') // correct your mistake
```

### License
[MIT](LICENSE)
