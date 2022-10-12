
/**
 * @cypress/react18 v0.0.0-development
 * (c) 2022 Cypress.io
 * Released under the MIT License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ReactDOM = require('react-dom/client');
var React = require('react');
require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var React__namespace = /*#__PURE__*/_interopNamespace(React);

const cachedDisplayNames = new WeakMap();
/**
 * Gets the display name of the component when possible.
 * @param type {JSX} The type object returned from creating the react element.
 * @param fallbackName {string} The alias, or fallback name to use when the name cannot be derived.
 * @link https://github.com/facebook/react-devtools/blob/master/backend/getDisplayName.js
 */
function getDisplayName(type, fallbackName = 'Unknown') {
    const nameFromCache = cachedDisplayNames.get(type);
    if (nameFromCache != null) {
        return nameFromCache;
    }
    let displayName = null;
    // The displayName property is not guaranteed to be a string.
    // It's only safe to use for our purposes if it's a string.
    // github.com/facebook/react-devtools/issues/803
    if (typeof type.displayName === 'string') {
        displayName = type.displayName;
    }
    if (!displayName) {
        displayName = type.name || fallbackName;
    }
    // Facebook-specific hack to turn "Image [from Image.react]" into just "Image".
    // We need displayName with module name for error reports but it clutters the DevTools.
    const match = displayName.match(/^(.*) \[from (.*)\]$/);
    if (match) {
        const componentName = match[1];
        const moduleName = match[2];
        if (componentName && moduleName) {
            if (moduleName === componentName ||
                moduleName.startsWith(`${componentName}.`)) {
                displayName = componentName;
            }
        }
    }
    try {
        cachedDisplayNames.set(type, displayName);
    }
    catch (e) {
        // do nothing
    }
    return displayName;
}

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

/**
 * Inject custom style text or CSS file or 3rd party style resources
 */
const injectStyles = (options) => {
    return () => {
        const el = getContainerEl();
        return injectStylesBeforeElement(options, document, el);
    };
};
let mountCleanup;
/**
 * Create an `mount` function. Performs all the non-React-version specific
 * behavior related to mounting. The React-version-specific code
 * is injected. This helps us to maintain a consistent public API
 * and handle breaking changes in React's rendering API.
 *
 * This is designed to be consumed by `npm/react{16,17,18}`, and other React adapters,
 * or people writing adapters for third-party, custom adapters.
 */
const makeMountFn = (type, jsx, options = {}, rerenderKey, internalMountOptions) => {
    if (!internalMountOptions) {
        throw Error('internalMountOptions must be provided with `render` and `reactDom` parameters');
    }
    mountCleanup = internalMountOptions.cleanup;
    // Get the display name property via the component constructor
    // @ts-ignore FIXME
    const componentName = getDisplayName(jsx.type, options.alias);
    const displayName = options.alias || componentName;
    const jsxComponentName = `<${componentName} ... />`;
    const message = options.alias
        ? `${jsxComponentName} as "${options.alias}"`
        : jsxComponentName;
    return cy
        .then(injectStyles(options))
        .then(() => {
        var _a, _b, _c;
        const reactDomToUse = internalMountOptions.reactDom;
        const el = getContainerEl();
        if (!el) {
            throw new Error([
                `[@cypress/react] 🔥 Hmm, cannot find root element to mount the component. Searched for ${ROOT_SELECTOR}`,
            ].join(' '));
        }
        const key = rerenderKey !== null && rerenderKey !== void 0 ? rerenderKey : 
        // @ts-ignore provide unique key to the the wrapped component to make sure we are rerendering between tests
        (((_c = (_b = (_a = Cypress === null || Cypress === void 0 ? void 0 : Cypress.mocha) === null || _a === void 0 ? void 0 : _a.getRunner()) === null || _b === void 0 ? void 0 : _b.test) === null || _c === void 0 ? void 0 : _c.title) || '') + Math.random();
        const props = {
            key,
        };
        const reactComponent = React__namespace.createElement(options.strict ? React__namespace.StrictMode : React__namespace.Fragment, props, jsx);
        // since we always surround the component with a fragment
        // let's get back the original component
        const userComponent = reactComponent.props.children;
        internalMountOptions.render(reactComponent, el, reactDomToUse);
        if (options.log !== false) {
            Cypress.log({
                name: type,
                type: 'parent',
                message: [message],
                // @ts-ignore
                $el: el.children.item(0),
                consoleProps: () => {
                    return {
                        // @ts-ignore protect the use of jsx functional components use ReactNode
                        props: jsx.props,
                        description: type === 'mount' ? 'Mounts React component' : 'Rerenders mounted React component',
                        home: 'https://github.com/cypress-io/cypress',
                    };
                },
            }).snapshot('mounted').end();
        }
        return (
        // Separate alias and returned value. Alias returns the component only, and the thenable returns the additional functions
        cy.wrap(userComponent, { log: false })
            .as(displayName)
            .then(() => {
            return cy.wrap({
                component: userComponent,
                rerender: (newComponent) => makeMountFn('rerender', newComponent, options, key, internalMountOptions),
                unmount: internalMountOptions.unmount,
            }, { log: false });
        })
            // by waiting, we delaying test execution for the next tick of event loop
            // and letting hooks and component lifecycle methods to execute mount
            // https://github.com/bahmutov/cypress-react-unit-test/issues/200
            .wait(0, { log: false }));
        // Bluebird types are terrible. I don't think the return type can be carried without this cast
    });
};
/**
 * Create an `unmount` function. Performs all the non-React-version specific
 * behavior related to unmounting.
 *
 * This is designed to be consumed by `npm/react{16,17,18}`, and other React adapters,
 * or people writing adapters for third-party, custom adapters.
 */
const makeUnmountFn = (options) => {
    return cy.then(() => {
        var _a;
        const wasUnmounted = mountCleanup === null || mountCleanup === void 0 ? void 0 : mountCleanup();
        if (wasUnmounted && options.log) {
            Cypress.log({
                name: 'unmount',
                type: 'parent',
                message: [(_a = options.boundComponentMessage) !== null && _a !== void 0 ? _a : 'Unmounted component'],
                consoleProps: () => {
                    return {
                        description: 'Unmounts React component',
                        parent: getContainerEl().parentNode,
                        home: 'https://github.com/cypress-io/cypress',
                    };
                },
            });
        }
    });
};
// Cleanup before each run
// NOTE: we cannot use unmount here because
// we are not in the context of a test
const preMountCleanup = () => {
    mountCleanup === null || mountCleanup === void 0 ? void 0 : mountCleanup();
};
// Side effects from "import { mount } from '@cypress/<my-framework>'" are annoying, we should avoid doing this
// by creating an explicit function/import that the user can register in their 'component.js' support file,
// such as:
//    import 'cypress/<my-framework>/support'
// or
//    import { registerCT } from 'cypress/<my-framework>'
//    registerCT()
// Note: This would be a breaking change
// it is required to unmount component in beforeEach hook in order to provide a clean state inside test
// because `mount` can be called after some preparation that can side effect unmount
// @see npm/react/cypress/component/advanced/set-timeout-example/loading-indicator-spec.js
setupHooks(preMountCleanup);

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {};

var debug_1 = debug;

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';

const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991;

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;

var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH,
};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

createCommonjsModule(function (module, exports) {
const { MAX_SAFE_COMPONENT_LENGTH } = constants;

exports = module.exports = {};

// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;

const createToken = (name, value, isGlobal) => {
  const index = R++;
  debug_1(name, index, value);
  t[name] = index;
  src[index] = value;
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
};

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`);

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`);

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`);

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`);

createToken('FULL', `^${src[t.FULLPLAIN]}$`);

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`);

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

createToken('GTLT', '((?:<|>)?=?)');

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`);

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`);

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`);

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`);

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
});

// @ts-expect-error
let root;
const cleanup = () => {
    if (root) {
        root.unmount();
        root = null;
        return true;
    }
    return false;
};
function mount(jsx, options = {}, rerenderKey) {
    const internalOptions = {
        reactDom: ReactDOM__default["default"],
        render: (reactComponent, el) => {
            if (!root) {
                root = ReactDOM__default["default"].createRoot(el);
            }
            return root.render(reactComponent);
        },
        unmount,
        cleanup,
    };
    return makeMountFn('mount', jsx, Object.assign({ ReactDom: ReactDOM__default["default"] }, options), rerenderKey, internalOptions);
}
function unmount(options = { log: true }) {
    return makeUnmountFn(options);
}

exports.mount = mount;
exports.unmount = unmount;
