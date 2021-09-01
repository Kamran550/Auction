const inquirer = require('inquirer')
const chalk = require('chalk')
var mehsullar = []

console.log('salam')
function alici(connection) {
    connection.query('select category from auctions group by category', function (err, result) {

        if (err) {
            console.log('err:', err)

        }
        // console.log(result)
        for (var item of result) {
            // console.log(item)
            mehsullar.push(item.category)
        }
        // console.log(mehsullar)

        inquirer.prompt([
            {
                type: 'list',
                message: 'Bu categoriyalarindan birini sechhin',
                name: 'category',
                choices: mehsullar
            }
        ]).then((answer) => {
            // console.log(answer)
            if (answer.category) {
                connection.query(`select * from auctions where category = '${answer.category}'`, (err, res) => {
                    if (err) {
                        console.log('err', err)
                    }
                    var auksiyon = []

                    for (var prod of res) {
                        auksiyon.push(chalk.yellow('id: ') + chalk.green(prod.id) + ' product: ' + prod.item_name, ' baslangic deyer: ' + prod.starting_bid, ' en yuksek deyer ' + prod.highest_bid)
                    }
                    var netice = auksiyon.join('\n')
                    console.log('neticeye bax: ', netice.id)
                    inquirer.prompt([
                        {
                            message: netice + '\n' + chalk.red('Auksiniyona cixmaq istediyiniz mehsulun id-sini sechin secin'),
                            type: 'number',
                            name: 'product',
                        }
                    ]).then((cavab) => {
                        console.log('cavab:' + cavab.product)
                        
                        connection.query(`select * from auctions where id = '${cavab.product}' and category = '${answer.category}'`, (err, result) => {
                            if (err) {
                                console.log('err', err)
                            }
                            console.log('res:', result[0].starting_bid)
                            inquirer.prompt([
                                {
                                    type: 'number',
                                    message: result[0].item_name + ' mehsulunun ilkin qiymeti ' + result[0].starting_bid + ' En yuksek teklif ise ' + result[0].highest_bid + '. Bes sizin teklifiniz nedir?',
                                    name: 'high'
                                }
                            ]).then((cavab) => {
                                console.log('Sifaris ', cavab.high)
                                if (cavab.high>result[0].highest_bid) {
                                    connection.query(`update auctions set highest_bid = '${cavab.high}' where id = '${result[0].id}'`, (err, sonHal) => {
                                        if (err) {
                                            console.log('err', err)
                                        }
                                        console.log('databasenin son hali: ', sonHal)
                                    })
                                }else{
                                    console.log('Sizin yazdiginiz deyer ilkin deyerden asagidir')
                                }

                            })
                        })

                    })
                })
            }
        })
    })
}


module.exports = alici