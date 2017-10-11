'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _formatters = require('./formatters');

var _parsers = require('./parsers');

var _taskQueue = require('@dendra-science/task-queue');

var tq = _interopRequireWildcard(_taskQueue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ACK = Buffer.from('\r');

/**
 * A client class for communicating with a LDMP server over TCP.
 */
class LDMPClient extends _events.EventEmitter {
  constructor(options) {
    super();

    this.options = Object.assign({
      port: 1024
    }, options);

    this.queue = new tq.TaskQueue();
    this.parser = new _parsers.FrameParser({
      matchChar: Buffer.from('\0'),
      matchEncoding: 'ascii'
    });
    this.parser.pipe(new _parsers.XMLRecordParser()).on('data', this._onDataHandler.bind(this));
  }

  /**
   * Cancel processing immediately and clean up.
   *
   * NOTE: It's recommended to call disconnect first!
   */
  destroy() {
    this.queue.destroy();

    this.queue = null;
    this.parser = null;
  }

  _onCloseHandler() {
    this.isConnected = false;
    this.socket.removeAllListeners();
    this.socket.unpipe();
    this.socket.unref();

    const item = this.queue.head;
    if (item && item.task === this._disconnectTask) {
      item.done();
    }
  }

  _onConnectHandler() {
    this.isConnected = true;

    const item = this.queue.head;
    if (item && item.task === this._connectTask) {
      item.done(this.socket);
    }
  }

  _onDataHandler(data) {
    this.emit('record', data);
  }

  _onErrorHandler(err) {
    const item = this.queue.head;
    if (this.socket.connecting && item && item.task === this._connectTask) {
      item.error(err);
    }
  }

  _connectTask({ data, done, error }) {
    const client = data.client;

    if (client.isConnected) return done();

    const sock = client.socket = new _net2.default.Socket();
    sock.once('close', client._onCloseHandler.bind(client));
    sock.once('connect', client._onConnectHandler.bind(client));
    sock.once('error', client._onErrorHandler.bind(client));
    sock.pipe(client.parser);
    sock.connect(client.options.port, client.options.host);
  }

  /**
   * Open a connection to the LDMP server.
   */
  connect() {
    return this.queue.push(this._connectTask, {
      client: this
    });
  }

  _ackTask({ data, done, error }) {
    const client = data.client;

    if (!client.isConnected) return error(new Error('Not connected'));

    client.socket.write(ACK);
    done();
  }

  /**
   * Send a record acknowledgement to the server.
   */
  ack() {
    return this.queue.push(this._ackTask, {
      client: this
    });
  }

  _disconnectTask({ data, done, error }) {
    const client = data.client;

    if (!client.isConnected) return done();

    client.socket.destroy();
  }

  /**
   * Close a connection to the LDMP server.
   */
  disconnect() {
    return this.queue.push(this._disconnectTask, {
      client: this
    });
  }

  _specifyTask({ data, done, error }) {
    const client = data.client;

    if (!client.isConnected) return error(new Error('Not connected'));

    const spec = _formatters.ClientSpecFormatter.format({
      output_format: 'xml',
      tables: data.tables
    });

    client.socket.write(spec);
    done(spec.toString());
  }

  /**
   * Send a client specification to the server.
   */
  specify(tables) {
    return this.queue.push(this._specifyTask, {
      client: this,
      tables
    });
  }
}
exports.default = LDMPClient;