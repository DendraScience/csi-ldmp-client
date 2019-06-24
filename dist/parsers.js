'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XMLRecordParser = exports.FrameParser = undefined;

var _xmldom = require('xmldom');

var _stream = require('stream');

/**
 * A set of transform streams to aid in the parsing of records.
 */
class FrameParser extends _stream.Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      readableObjectMode: true,
      writableObjectMode: false
    }));

    this.matchChar = options.matchChar;
    this.matchEncoding = options.matchEncoding;
  }

  _transform(chunk, encoding, callback) {
    let i;
    let s = 0;

    // console.log('FrameParser._transform chunk', chunk)

    try {
      this._buf = this._buf ? Buffer.concat([this._buf, chunk], this._buf.length + chunk.length) : chunk;

      while ((i = this._buf.indexOf(this.matchChar, s, this.matchEncoding)) > -1) {
        if (i > s) this.push({ frame: this._buf.slice(s, i) });
        s = i + this.matchChar.length;
      }

      this._buf = s < this._buf.length ? this._buf.slice(s, this._buf.length) : null;
    } catch (err) {
      console.log('Error [FrameParser._transform]:', { err });
    }

    callback();
  }
}

exports.FrameParser = FrameParser; /**
                                    * Helpers for getting and casting attributes.
                                    */

function assignIntAttr(el, name, obj, prop) {
  const val = el.getAttribute(name);
  if (val > '') obj[prop || name] = val | 0;
}

function assignStrAttr(el, name, obj, prop) {
  const val = el.getAttribute(name);
  if (val > '') obj[prop || name] = val;
}

class XMLRecordParser extends _stream.Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true
    }));
  }

  _transform(chunk, encoding, callback) {
    const errors = [];
    const obj = {};

    // console.log('XMLRecordParser._transform chunk', chunk)

    try {
      const xmlDoc = new _xmldom.DOMParser({
        errorHandler: {
          error(msg) {
            errors.push(msg);
          }
        }
      }).parseFromString(chunk.frame.toString(), 'text/xml');

      const recordEls = xmlDoc.getElementsByTagName('record');

      for (let i = 0; i < recordEls.length; i++) {
        const recordEl = recordEls[i];

        assignIntAttr(recordEl, 'record-no', obj, 'recordNumber');
        assignStrAttr(recordEl, 'station', obj);
        assignStrAttr(recordEl, 'table', obj);
        assignStrAttr(recordEl, 'time', obj, 'timeString');

        obj.fields = [];

        const fieldEls = recordEl.getElementsByTagName('field');

        for (let j = 0; j < fieldEls.length; j++) {
          const fieldEl = fieldEls[j];
          const field = {
            name: `col_${j + 1}`
          };

          assignStrAttr(fieldEl, 'name', field);
          assignStrAttr(fieldEl, 'process', field);
          assignStrAttr(fieldEl, 'type', field);
          assignStrAttr(fieldEl, 'units', field);

          const nd = fieldEl.firstChild;
          if (nd) {
            const val = nd.nodeValue;
            field.value = val > '' ? parseFloat(val) : null;
          }

          obj.fields.push(field);
        }
      }

      if (errors.length > 0) obj.parseErrors = errors;
      if (Object.keys(obj).length > 0) this.push(obj);
    } catch (err) {
      console.log('Error [XMLRecordParser._transform]:', { err, obj });
    }

    callback();
  }
}
exports.XMLRecordParser = XMLRecordParser;