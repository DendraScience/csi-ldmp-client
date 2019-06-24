/**
 * Main tests
 */

describe('Long running', function () {
  this.timeout(3600000)

  // const tables = [ { station: 'Station8_wx', table: 'Hydra', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'Station8_wx', table: 'Raw', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'Station8_wx', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'ucac_angelo', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucab_anzaborrego', table: 'Audit', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:44:00.00' }, { station: 'ucab_anzaborrego', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'whpt_bigcreekwhale', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucbo_blueoak', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucde_boyddeepcanyon', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucel_elliotchaparral', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucha_hastings', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucja_james', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 12 12:10:00.00' }, { station: 'ucmc_mclaughlin', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 16 09:40:00.00' }, { station: 'ucmo_motterimrock', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucrm_norrisranchomarino', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'Hydra', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'Raw', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucsc_santacruzisle', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucse_sedgwick', table: 'Audit', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:43:30.00' }, { station: 'ucse_sedgwick', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucsh_snarl', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucyl_youngerlagoon', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'fonr_FortOrd', table: 'Audit', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:42:15.00' }, { station: 'fonr_FortOrd', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucqr_quailridge', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 14:40:00.00' }, { station: 'hipk_bigcreekhighlands', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'bcgh_bigcreekgatehouse', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' } ]
  const tables = [ { station: 'Station8_wx', table: 'Hydra', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'Station8_wx', table: 'Raw', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'Station8_wx', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:10:00.00' }, { station: 'ucac_angelo', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucab_anzaborrego', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'whpt_bigcreekwhale', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucbo_blueoak', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucde_boyddeepcanyon', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucel_elliotchaparral', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucha_hastings', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucja_james', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 12 12:10:00.00' }, { station: 'ucmc_mclaughlin', table: 'TenMin', order_option: 'collected', start_option: 'at-time', time_stamp: '2019 06 16 09:40:00.00' }, { station: 'ucmo_motterimrock', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucrm_norrisranchomarino', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'Hydra', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'Raw', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'sagh_sagehen', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucsc_santacruzisle', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucse_sedgwick', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucsh_snarl', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucyl_youngerlagoon', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'fonr_FortOrd', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'ucqr_quailridge', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 14:40:00.00' }, { station: 'hipk_bigcreekhighlands', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' }, { station: 'bcgh_bigcreekgatehouse', table: 'TenMin', order_option: 'logged-with-holes', start_option: 'at-time', time_stamp: '2019 06 17 17:40:00.00' } ]
  let ldmp
  let client
  let stop

  after(function () {
    return client.disconnect()
  })

  it('should import', function () {
    ldmp = require('../../dist')

    expect(ldmp).to.have.property('LDMPClient')
  })

  it('should create client', function () {
    client = new ldmp.LDMPClient({ port: '1024' })

    expect(client).to.respondTo('specify')
  })

  it('should connect', function () {
    return client.connect().then(() => {
      expect(client).to.have.property('isConnected', true)

      client.on('error', err => {
        console.log('err', err)
      })
      client.on('record', rec => {
        if (stop) return

        // console.log('==================== rec\n', rec)

        if (rec.parseErrors) {
          console.log('rec.parseErrors', rec.parseErrors)
        } else {
          console.log('rec', rec.timeString, rec.station, rec.table)
        }

        client.ack()
      })
    })
  })

  it('should specify', function () {
    return client.specify(tables).then(res => {
      expect(res).to.equal('--output-format=xml {Station8_wx Hydra --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:10:00.00}}} {Station8_wx Raw --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:10:00.00}}} {Station8_wx TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:10:00.00}}} {ucac_angelo TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucab_anzaborrego TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {whpt_bigcreekwhale TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucbo_blueoak TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucde_boyddeepcanyon TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucel_elliotchaparral TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucha_hastings TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucja_james TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 12 12:10:00.00}}} {ucmc_mclaughlin TenMin --order-option=collected --start-option={at-time {2019 06 16 09:40:00.00}}} {ucmo_motterimrock TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucrm_norrisranchomarino TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {sagh_sagehen Hydra --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {sagh_sagehen Raw --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {sagh_sagehen TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucsc_santacruzisle TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucse_sedgwick TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucsh_snarl TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucyl_youngerlagoon TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {fonr_FortOrd TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {ucqr_quailridge TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 14:40:00.00}}} {hipk_bigcreekhighlands TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} {bcgh_bigcreekgatehouse TenMin --order-option=logged-with-holes --start-option={at-time {2019 06 17 17:40:00.00}}} ;\r')
    })
  })

  it('should wait for records', function () {
    return new Promise(resolve => {
      setTimeout(() => {
        stop = true

        resolve()
      }, 30 * 60 * 1000)
    })
  })
})
