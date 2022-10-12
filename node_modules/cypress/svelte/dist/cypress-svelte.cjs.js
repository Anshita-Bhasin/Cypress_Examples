
/**
 * @cypress/svelte v0.0.0-development
 * (c) 2022 Cypress.io
 * Released under the MIT License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ROOT_SELECTOR = '[data-cy-root]';
const getContainerEl = () => {
    const el = document.querySelector(ROOT_SELECTOR);
    if (el) {
        return el;
    }
    throw Error(`No element found that matches selector ${ROOT_SELECTOR}. Please add a root element with data-cy-root attribute to your "component-index.html" file so that Cypress can attach your component to the DOM.`);
};
/**
 * Remove any style or extra link elements from the iframe placeholder
 * left from any previous test
 *
 */
function cleanupStyles() {
    const styles = document.body.querySelectorAll('[data-cy=injected-style-tag]');
    styles.forEach((styleElement) => {
        if (styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
    const links = document.body.querySelectorAll('[data-cy=injected-stylesheet]');
    links.forEach((link) => {
        if (link.parentElement) {
            link.parentElement.removeChild(link);
        }
    });
}
/**
 * Insert links to external style resources.
 */
function insertStylesheets(stylesheets, document, el) {
    stylesheets.forEach((href) => {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;
        link.dataset.cy = 'injected-stylesheet';
        document.body.insertBefore(link, el);
    });
}
/**
 * Inserts a single stylesheet element
 */
function insertStyles(styles, document, el) {
    styles.forEach((style) => {
        const styleElement = document.createElement('style');
        styleElement.dataset.cy = 'injected-style-tag';
        styleElement.appendChild(document.createTextNode(style));
        document.body.insertBefore(styleElement, el);
    });
}
function insertSingleCssFile(cssFilename, document, el, log) {
    return cy.readFile(cssFilename, { log }).then((css) => {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.body.insertBefore(style, el);
    });
}
/**
 * Reads the given CSS file from local file system
 * and adds the loaded style text as an element.
 */
function insertLocalCssFiles(cssFilenames, document, el, log) {
    return Cypress.Promise.mapSeries(cssFilenames, (cssFilename) => {
        return insertSingleCssFile(cssFilename, document, el, log);
    });
}
/**
 * Injects custom style text or CSS file or 3rd party style resources
 * into the given document.
 */
const injectStylesBeforeElement = (options, document, el) => {
    if (!el)
        return;
    // first insert all stylesheets as Link elements
    let stylesheets = [];
    if (typeof options.stylesheet === 'string') {
        stylesheets.push(options.stylesheet);
    }
    else if (Array.isArray(options.stylesheet)) {
        stylesheets = stylesheets.concat(options.stylesheet);
    }
    if (typeof options.stylesheets === 'string') {
        options.stylesheets = [options.stylesheets];
    }
    if (options.stylesheets) {
        stylesheets = stylesheets.concat(options.stylesheets);
    }
    insertStylesheets(stylesheets, document, el);
    // insert any styles as <style>...</style> elements
    let styles = [];
    if (typeof options.style === 'string') {
        styles.push(options.style);
    }
    else if (Array.isArray(options.style)) {
        styles = styles.concat(options.style);
    }
    if (typeof options.styles === 'string') {
        styles.push(options.styles);
    }
    else if (Array.isArray(options.styles)) {
        styles = styles.concat(options.styles);
    }
    insertStyles(styles, document, el);
    // now load any css files by path and add their content
    // as <style>...</style> elements
    let cssFiles = [];
    if (typeof options.cssFile === 'string') {
        cssFiles.push(options.cssFile);
    }
    else if (Array.isArray(options.cssFile)) {
        cssFiles = cssFiles.concat(options.cssFile);
    }
    if (typeof options.cssFiles === 'string') {
        cssFiles.push(options.cssFiles);
    }
    else if (Array.isArray(options.cssFiles)) {
        cssFiles = cssFiles.concat(options.cssFiles);
    }
    return insertLocalCssFiles(cssFiles, document, el, options.log);
};
function setupHooks(optionalCallback) {
    // Consumed by the framework "mount" libs. A user might register their own mount in the scaffolded 'commands.js'
    // file that is imported by e2e and component support files by default. We don't want CT side effects to run when e2e
    // testing so we early return.
    // System test to verify CT side effects do not pollute e2e: system-tests/test/e2e_with_mount_import_spec.ts
    if (Cypress.testingType !== 'component') {
        return;
    }
    // When running component specs, we cannot allow "cy.visit"
    // because it will wipe out our preparation work, and does not make much sense
    // thus we overwrite "cy.visit" to throw an error
    Cypress.Commands.overwrite('visit', () => {
        throw new Error('cy.visit from a component spec is not allowed');
    });
    // @ts-ignore
    Cypress.on('test:before:run', () => {
        optionalCallback === null || optionalCallback === void 0 ? void 0 : optionalCallback();
        cleanupStyles();
    });
}

const DEFAULT_COMP_NAME = 'unknown';
let componentInstance;
const cleanup = () => {
    componentInstance === null || componentInstance === void 0 ? void 0 : componentInstance.$destroy();
};
// Extract the component name from the object passed to mount
const getComponentDisplayName = (Component) => {
    if (Component.name) {
        const [_, match] = /Proxy\<(\w+)\>/.exec(Component.name) || [];
        return match || Component.name;
    }
    return DEFAULT_COMP_NAME;
};
/**
 * Mounts a Svelte component inside the Cypress browser
 *
 * @param {SvelteConstructor<T>} Component Svelte component being mounted
 * @param {MountReturn<T extends SvelteComponent>} options options to customize the component being mounted
 * @returns Cypress.Chainable<MountReturn>
 *
 * @example
 * import Counter from './Counter.svelte'
 * import { mount } from 'cypress/svelte'
 *
 * it('should render', () => {
 *   mount(Counter, { props: { count: 42 } })
 *   cy.get('button').contains(42)
 * })
 */
function mount(Component, options = {}) {
    return cy.then(() => {
        const target = getContainerEl();
        injectStylesBeforeElement(options, document, target);
        const ComponentConstructor = (Component.default || Component);
        componentInstance = new ComponentConstructor(Object.assign({ target }, options));
        // by waiting, we are delaying test execution for the next tick of event loop
        // and letting hooks and component lifecycle methods to execute mount
        return cy.wait(0, { log: false }).then(() => {
            if (options.log !== false) {
                const mountMessage = `<${getComponentDisplayName(Component)} ... />`;
                Cypress.log({
                    name: 'mount',
                    message: [mountMessage],
                }).snapshot('mounted').end();
            }
        })
            .wrap({ component: componentInstance }, { log: false });
    });
}
// Side effects from "import { mount } from '@cypress/<my-framework>'" are annoying, we should avoid doing this
// by creating an explicit function/import that the user can register in their 'component.js' support file,
// such as:
//    import 'cypress/<my-framework>/support'
// or
//    import { registerCT } from 'cypress/<my-framework>'
//    registerCT()
// Note: This would be a breaking change
setupHooks(cleanup);

exports.mount = mount;
