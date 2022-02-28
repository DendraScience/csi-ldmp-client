/**
 * Main tests
 */

describe('Module', function () {
  this.timeout(60000)

  const tables = [
    {
      station: 'ucbo_blueoak',
      table: 'TenMin',
      order_option: 'logged-with-holes',
      start_option: 'at-oldest'
    }
  ]
  const records = []
  const errors = []
  let ldmp
  let client

  after(function () {
    return client.disconnect()
  })

  it('should import', function () {
    ldmp = require('../../dist')

    expect(ldmp).to.have.property('LDMPClient')
  })

  it('should format client spec', function () {
    const f = require('../../dist/formatters')
    const buf = f.ClientSpecFormatter.format({
      output_format: 'xml',
      tables: [
        {
          station: 'HelloKitty',
          table: 'Meow',
          order_option: 'logged-with-holes',
          start_option: 'at-time',
          time_stamp: '1 jan 1990'
        },
        {
          station: 'Cartman',
          table: 'CheesyPoof',
          order_option: 'logged-with-holes',
          start_option: 'relative-to-newest',
          backfill_seconds: 3000
        },
        {
          station: 'Homer',
          table: 'Doh',
          order_option: 'logged-with-holes',
          start_option: 'at-newest'
        }
      ]
    })

    expect(buf.toString()).to.equal(
      '--output-format=xml {HelloKitty Meow --order-option=logged-with-holes --start-option={at-time {1 jan 1990}}} {Cartman CheesyPoof --order-option=logged-with-holes --start-option={relative-to-newest 3000}} {Homer Doh --order-option=logged-with-holes --start-option=at-newest} ;\r'
    )
  })

  it('should create client', function () {
    client = new ldmp.LDMPClient()

    expect(client).to.respondTo('specify')
  })

  it('should connect', function () {
    return client.connect().then(() => {
      expect(client).to.have.property('isConnected', true)

      client.on('error', err => errors.push(err))
      client.on('record', rec => records.push(rec))
    })
  })

  it('should specify', function () {
    return client.specify(tables).then(res => {
      expect(res).to.equal(
        '--output-format=xml {ucbo_blueoak TenMin --order-option=logged-with-holes --start-option=at-oldest} ;\r'
      )
    })
  })

  it('should return record 1', function () {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(records.length).to.equal(1)
        expect(records).to.have.nested.property('0.station', 'ucbo_blueoak')
        expect(records).to.have.nested.property('0.table', 'TenMin')
        expect(records).to.have.nested.property('0.timeString')
        expect(records).to.have.nested.property('0.fields')

        client.ack()
        resolve()
      }, 1000)
    })
  })

  it('should return record 2', function () {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(records.length).to.equal(2)
        expect(records).to.have.nested.property('1.station', 'ucbo_blueoak')
        expect(records).to.have.nested.property('1.table', 'TenMin')
        expect(records).to.have.nested.property('1.timeString')
        expect(records).to.have.nested.property('1.fields')

        client.ack()
        resolve()
      }, 1000)
    })
  })

  it('should return record 3', function () {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(records.length).to.equal(3)
        expect(records).to.have.nested.property('2.station', 'ucbo_blueoak')
        expect(records).to.have.nested.property('2.table', 'TenMin')
        expect(records).to.have.nested.property('2.timeString')
        expect(records).to.have.nested.property('2.fields')

        resolve()
      }, 1000)
    })
  })
})
