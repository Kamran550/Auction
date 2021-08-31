const connection = require('./connection')
const satici = require('./satici')
const alici = require('./alici')


if (process.argv.length != 3) {
    console.error('Zehmet olmasa kim oldugunuzu qeyd edin.[satici | alici]')
    process.exit()
} else if (process.argv[2] === 'satici') {
    satici(connection)
} else if (process.argv[2] === 'alici') {
    alici(connection)
}

