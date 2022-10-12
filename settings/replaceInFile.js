'use strict'
const fs = require('fs')

const dir = fs.readdirSync('../raiz-react-mys/src/pages/Settings')

const targetFile = require('./targetFile.js');

targetFile.forEach(([pathToFile, str]) => {
  const targetFile = `../raiz-react-mys/src/${pathToFile}`
  const targetFileContent = fs.readFileSync(targetFile, 'utf8')
  const replacedString = targetFileContent.replace(/\[translationKey\]/g, str)
  fs.writeFileSync(targetFile, replacedString)
})
