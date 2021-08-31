const inquirer = require("inquirer");


function satici(connection) {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Item Name',
            name: 'itemName'
        },
        {
            type: 'input',
            message: 'Enter Item category',
            name: 'itemCategory'
        },
        {
            type: 'number',
            message: 'Enter starting Bid',
            name: 'startingBid'
        }
    ]).then((answer) => {
        console.log(answer)
        connection.query(`insert into auctions (item_name,category,starting_bid,highest_bid) values(?,?,?,?)`, [answer.itemName, answer.itemCategory, answer.startingBid, answer.startingBid], (err,res) => {
            if (err) {
                throw new Error('err',err.message)
            }
            console.log(res)
        })
    })
}

module.exports = satici