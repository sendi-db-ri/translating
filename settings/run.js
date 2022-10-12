'use strict'

const fs = require('fs')
const flat = require('flat')

const raw = () => {
  let trans = ['enEn', 'idId', 'myMy', 'enMy']
  
  const nextTrans = trans.map((tran) => {
    try {
      let string = fs.readFileSync(`${tran}.json`)
      return [tran, JSON.parse(string)]
    } catch {
      return null
    }
  })
  
  let target = fs.readFileSync('./unflated.json')
  target = JSON.parse(target)
  target = flat(target)
  target = Object.entries(target)
  
  const objectNextTrans = Object.fromEntries(nextTrans)
  
  nextTrans.forEach((tran) => {
    if (tran) {
      const [k, tranT] = tran
      let scs = target.map(([key, value]) => {
        let val = tranT[value]
        const enVer = objectNextTrans.enEn?.[value]
        if (!val) val = enVer
        if (!val) {
          console.log({ key, enVer })
          val = false
        }
        return [key, val]
      })
      scs = scs.filter(([, val]) => !!val)
      scs = Object.fromEntries(scs)
      const res = flat.unflatten(scs)
      fs.writeFileSync(`${k}-trans.json`, JSON.stringify(res, null, 2))
    }
  })
}

module.exports = raw;
