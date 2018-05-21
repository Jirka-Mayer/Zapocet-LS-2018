const Page = require("./Page.js")

class TransactionPage extends Page
{
    constructor(app, container)
    {
        super(app, container)
    }

    template()
    {
        return `
            <h1>Transaction page</h1>
        `
    }
}

module.exports = TransactionPage