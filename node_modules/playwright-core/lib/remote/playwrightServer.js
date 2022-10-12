"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Semaphore = exports.PlaywrightServer = void 0;

var _utilsBundle = require("../utilsBundle");

var _http = _interopRequireDefault(require("http"));

var _playwright = require("../server/playwright");

var _playwrightConnection = require("./playwrightConnection");

var _utils = require("../utils");

var _manualPromise = require("../utils/manualPromise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const debugLog = (0, _utilsBundle.debug)('pw:server');
let lastConnectionId = 0;
const kConnectionSymbol = Symbol('kConnection');

function newLogger() {
  const id = ++lastConnectionId;
  return message => debugLog(`[id=${id}] ${message}`);
}

class PlaywrightServer {
  constructor(mode, options) {
    this._preLaunchedPlaywright = null;
    this._wsServer = void 0;
    this._mode = void 0;
    this._options = void 0;
    this._mode = mode;
    this._options = options;

    if (mode === 'use-pre-launched-browser') {
      (0, _utils.assert)(options.preLaunchedBrowser);
      this._preLaunchedPlaywright = options.preLaunchedBrowser.options.rootSdkObject;
    }

    if (mode === 'reuse-browser') this._preLaunchedPlaywright = (0, _playwright.createPlaywright)('javascript');
  }

  preLaunchedPlaywright() {
    return this._preLaunchedPlaywright;
  }

  async listen(port = 0) {
    const server = _http.default.createServer((request, response) => {
      response.end('Running');
    });

    server.on('error', error => debugLog(error));
    const wsEndpoint = await new Promise((resolve, reject) => {
      server.listen(port, () => {
        const address = server.address();

        if (!address) {
          reject(new Error('Could not bind server socket'));
          return;
        }

        const wsEndpoint = typeof address === 'string' ? `${address}${this._options.path}` : `ws://127.0.0.1:${address.port}${this._options.path}`;
        resolve(wsEndpoint);
      }).on('error', reject);
    });
    debugLog('Listening at ' + wsEndpoint);
    this._wsServer = new _utilsBundle.wsServer({
      server,
      path: this._options.path
    });
    const semaphore = new Semaphore(this._options.maxConcurrentConnections);

    this._wsServer.on('connection', (ws, request) => {
      if (semaphore.requested() >= this._options.maxIncomingConnections) {
        ws.close(1013, 'Playwright Server is busy');
        return;
      }

      const url = new URL('http://localhost' + (request.url || ''));
      const browserHeader = request.headers['x-playwright-browser'];
      const browserName = url.searchParams.get('browser') || (Array.isArray(browserHeader) ? browserHeader[0] : browserHeader) || null;
      const proxyHeader = request.headers['x-playwright-proxy'];
      const proxyValue = url.searchParams.get('proxy') || (Array.isArray(proxyHeader) ? proxyHeader[0] : proxyHeader);
      const enableSocksProxy = this._options.enableSocksProxy && proxyValue === '*';
      const launchOptionsHeader = request.headers['x-playwright-launch-options'] || '';
      let launchOptions = {};

      try {
        launchOptions = JSON.parse(Array.isArray(launchOptionsHeader) ? launchOptionsHeader[0] : launchOptionsHeader);
      } catch (e) {}

      const log = newLogger();
      log(`serving connection: ${request.url}`);
      const connection = new _playwrightConnection.PlaywrightConnection(semaphore.aquire(), this._mode, ws, {
        enableSocksProxy,
        browserName,
        launchOptions
      }, {
        playwright: this._preLaunchedPlaywright,
        browser: this._options.preLaunchedBrowser || null
      }, log, () => semaphore.release());
      ws[kConnectionSymbol] = connection;
    });

    return wsEndpoint;
  }

  async close() {
    const server = this._wsServer;
    if (!server) return;
    debugLog('closing websocket server');
    const waitForClose = new Promise(f => server.close(f)); // First disconnect all remaining clients.

    await Promise.all(Array.from(server.clients).map(async ws => {
      const connection = ws[kConnectionSymbol];
      if (connection) await connection.close();

      try {
        ws.terminate();
      } catch (e) {}
    }));
    await waitForClose;
    debugLog('closing http server');
    await new Promise(f => server.options.server.close(f));
    this._wsServer = undefined;
    debugLog('closed server');
  }

}

exports.PlaywrightServer = PlaywrightServer;

class Semaphore {
  constructor(max) {
    this._max = void 0;
    this._aquired = 0;
    this._queue = [];
    this._max = max;
  }

  aquire() {
    const lock = new _manualPromise.ManualPromise();

    this._queue.push(lock);

    this._flush();

    return lock;
  }

  requested() {
    return this._aquired + this._queue.length;
  }

  release() {
    --this._aquired;

    this._flush();
  }

  _flush() {
    while (this._aquired < this._max && this._queue.length) {
      ++this._aquired;

      this._queue.shift().resolve();
    }
  }

}

exports.Semaphore = Semaphore;