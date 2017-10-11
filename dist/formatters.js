'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A set of formatter functions to prepare a client specification.
 */

class SpecFormatter {
  static format() {}
}

class TableSpecFormatter extends SpecFormatter {
  static format(options) {
    const bufs = [];

    if (options.station && options.table) {
      bufs.push(Buffer.from(`{${options.station} ${options.table}`));

      if (options.order_option) bufs.push(Buffer.from(` --order-option=${options.order_option}`));
      switch (options.start_option) {
        case 'at-time':
          if (options.time_stamp) bufs.push(Buffer.from(` --start-option={${options.start_option} {${options.time_stamp}}}`));
          break;
        case 'relative-to-newest':
          if (typeof options.backfill_seconds === 'number') bufs.push(Buffer.from(` --start-option={${options.start_option} ${options.backfill_seconds}}`));
          break;
        default:
          if (options.start_option) bufs.push(Buffer.from(` --start-option=${options.start_option}`));
      }

      bufs.push(Buffer.from('} '));
    }

    return Buffer.concat(bufs);
  }
}

exports.TableSpecFormatter = TableSpecFormatter;
class ClientSpecFormatter extends SpecFormatter {
  static format(options) {
    const bufs = [];

    if (options.output_format) bufs.push(Buffer.from(`--output-format=${options.output_format} `));
    if (options.tables) options.tables.forEach(opts => bufs.push(TableSpecFormatter.format(opts)));

    bufs.push(Buffer.from(';\r'));

    return Buffer.concat(bufs);
  }
}
exports.ClientSpecFormatter = ClientSpecFormatter;