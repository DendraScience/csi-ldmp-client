'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _formatters = require('./formatters');

var _parsers = require('./parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {FrameParser} from './parsers'

const ACK = Buffer.from('\r');

const DEFAULT_PORT = 1024;
const DEFAULT_TIMEOUT = 30000;

/**
 * A client class for communicating with a LDMP server over TCP.
 */
class LDMPClient extends _events.EventEmitter {
  constructor(options) {
    super();

    this.options = Object.assign({
      port: DEFAULT_PORT
    }, options);
  }

  /**
   * Cancel processing immediately and clean up.
   */
  cancel() {
    if (!this.socket) return;

    this.isConnected = false;

    this.socket.removeAllListeners();
    this.socket.unpipe();
    this.socket.destroy();
    this.socket.unref();

    this.socket = null;
  }

  destroy() {
    this.cancel();
  }

  _onCloseHandler() {
    this.isConnected = false;

    this.socket.removeAllListeners();
    this.socket.unpipe();
    this.socket.unref();

    this.emit('closed');
  }

  _connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) return resolve();

      const sock = this.socket = new _net2.default.Socket();

      sock.once('connect', () => {
        console.log('LDMPClient connect!');

        sock.removeAllListeners();

        sock.pipe(new _parsers.FrameParser({
          matchChar: Buffer.from('\0'),
          matchEncoding: 'ascii'
        })).pipe(new _parsers.XMLRecordParser()).on('data', data => {
          this.emit('record', data);
        });

        // sock.pipe(new FrameParser({
        //   matchChar: Buffer.from('\0'),
        //   matchEncoding: 'ascii'
        // })).on('data', data => {
        //   this.emit('record', data.frame.toString())
        // })

        resolve(sock);
      });
      sock.once('error', reject);

      // sock.pipe(new FrameParser({
      //   matchChar: Buffer.from('\0'),
      //   matchEncoding: 'ascii'
      // })).pipe(new XMLRecordParser()).on('data', data => {
      //   this.emit('record', data)
      // })

      sock.connect(this.options.port, this.options.host);
    });
  }

  /**
   * Open a connection to the LDMP server.
   */
  connect(timeout = DEFAULT_TIMEOUT) {
    return Promise.race([this._connect(), new Promise((resolve, reject) => setTimeout(reject, timeout, new Error('Connect timeout')))]).then(sock => {
      this.isConnected = true;
      sock.once('close', this._onCloseHandler.bind(this));
      this.emit('connected', sock);
      return sock;
    }).catch(err => {
      this.cancel();
      throw err;
    });
  }

  /**
   * Send a record acknowledgement to the server.
   */
  ack() {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) console.log('LDMPClient ack not connected');
      if (!this.isConnected) return reject(new Error('Not connected'));

      try {
        this.socket.write(ACK);

        console.log('LDMPClient ack sent');

        resolve();
      } catch (err) {
        console.log('LDMPClient ack error', err);

        reject(err);
      }
    });
  }

  _disconnect() {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) return reject(new Error('Not connected'));

      const sock = this.socket;

      this.once('closed', () => resolve(sock));
      sock.once('error', reject);

      sock.destroy();
    });
  }

  /**
   * Close a connection to the LDMP server.
   */
  disconnect(timeout = DEFAULT_TIMEOUT) {
    return Promise.race([this._disconnect(), new Promise((resolve, reject) => setTimeout(reject, timeout, new Error('Disconnect timeout')))]).then(sock => {
      this.emit('disconnected', sock);
      return sock;
    }).catch(err => {
      this.cancel();
      throw err;
    });
  }

  /**
   * Send a client specification to the server.
   */
  specify(tables) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) return reject(new Error('Not connected'));

      const spec = _formatters.ClientSpecFormatter.format({
        output_format: 'xml',
        tables
      });

      console.log('LDMPClient specify', `${spec}`);

      this.socket.write(spec);

      resolve(spec.toString());
    });
  }
}
exports.default = LDMPClient;