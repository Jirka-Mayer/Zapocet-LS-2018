const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")
const TransactionCreator = require("../ui/TransactionCreator.js")
const TransactionList = require("../ui/TransactionList.js")
const TransactionDetailModal = require("../ui/TransactionDetailModal.js")

class TransactionPage extends Page
{
    constructor(app)
    {
        super(app)

        this.menu = new Menu(this.refs.menu, "transactions")

        this.transactionCreator = new TransactionCreator(
            this.app,
            this.refs.transactionCreator,
            this.transactionDidCreate.bind(this)
        )

        this.transactionList = new TransactionList(
            this.refs.transactionList,
            this.removeTransaction.bind(this),
            this.editTransaction.bind(this)
        )

        // init
        this.transactionCreator.refresh()
        this.refreshTransactionList()
    }

    template()
    {
        return `
            <div ref="menu"></div>
            <h1>Transaction page</h1>
            <div ref="transactionCreator" style="border: 2px solid black; margin: 10px"></div>
            <div ref="transactionList"></div>
        `
    }

    /**
     * Refreshes transaction list (DOM)
     */
    refreshTransactionList()
    {
        let transactions = this.app.file.transactions

        this.transactionList.refresh(transactions)
    }

    /**
     * Called when a new transaction is created
     */
    transactionDidCreate(transaction)
    {
        this.refreshTransactionList()
    }

    /**
     * Called when transaction detail is clicked
     */
    editTransaction(id)
    {
        this.app.modals.show(
            new TransactionDetailModal(
                this.app.file.getTransaction(id),
                this.app.file,
                this.refreshTransactionList.bind(this) // submit callback
            )
        )
    }

    /**
     * Called when remove transaction is clicked
     */
    removeTransaction(id)
    {
        this.app.file.removeTransaction(id)
        this.refreshTransactionList()
    }
}

module.exports = TransactionPage