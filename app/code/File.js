const Account = require("./Account.js")
const Transaction = require("./Transaction.js")

class File
{
    constructor()
    {
        /**
         * Metadata about the file
         * (a "key -> value" datastructure)
         */
        this.meta = {
            "accounts.next-id": 0,
            "transactions.next-id": 0,
            "settings.default-account": null
        }

        /**
         * List of accounts
         */
        this.accounts = []

        /**
         * List of transactions
         */
        this.transactions = []

        // initialize file content
        let cashAccount = this.createAccount("Cash", 0)
        this.setDefaultAccount(cashAccount)
    }

    /**
     * Loads the file from a serialized string
     */
    static deserialize(fileString)
    {
        let f = new File()

        let data = JSON.parse(fileString)

        return f
    }

    /**
     * Serializes the file into a string
     */
    serialize()
    {
        let data = {}

        return JSON.stringify(data)
    }

    //////////////
    // Accounts //
    //////////////

    /**
     * Returns new unique account ID
     */
    getNewAccountId()
    {
        let id = this.meta["accounts.next-id"]
        this.meta["accounts.next-id"] = id + 1
        return id
    }

    /**
     * Creates and returns a new account
     */
    createAccount(title, initialAmount)
    {
        let account = new Account(
            this.getNewAccountId(),
            title,
            initialAmount
        )

        this.accounts.push(account)

        return account
    }

    /**
     * Remove an account from the file
     * (associated transactions stay in place)
     */
    removeAccount(id)
    {
        if (typeof(id) == "object")
            id = id.id

        let index = this.accounts.findIndex(x => x.id == id)

        if (index == -1)
            return

        this.accounts.splice(index, 1)
    }

    /**
     * Set an account as the default one
     */
    setDefaultAccount(id)
    {
        if (typeof(id) == "object")
            id = id.id

        this.meta["settings.default-account"] = id
    }

    /**
     * Returns an account of the provided ID
     */
    getAccount(id)
    {
        if (typeof(id) == "object")
            id = id.id

        return this.accounts.find(x => x.id == id) || null
    }

    //////////////////
    // Transactions //
    //////////////////

    /**
     * Returns new unique transaction ID
     */
    getNewTransactionId()
    {
        let id = this.meta["transactions.next-id"]
        this.meta["transactions.next-id"] = id + 1
        return id
    }

    /**
     * Inserts a transaction into the file
     * (while keeping it ordered)
     */
    insertTransaction(transaction)
    {
        // splice it in front of the first element, that is greater
        for (let i = 0; i < this.transactions.length; i++)
        {
            if (transaction.compare(this.transactions[i]) == -1)
            {
                this.transactions.splice(i, 0, transaction)
                return
            }
        }

        // else stick it at the end
        this.transactions.push(transaction)
    }

    /**
     * Creates a new transaction in the file and returns it
     */
    createTransaction(date, account, amount, title, description)
    {
        let transaction = new Transaction(
            this.getNewTransactionId(),
            date,
            this.getAccount(account),
            amount,
            title,
            description
        )

        this.insertTransaction(transaction)

        return transaction
    }

    /**
     * Removes transaction from the file
     */
    removeTransaction(id)
    {
        if (typeof(id) == "object")
            id = id.id

        let index = this.transactions.findIndex(x => x.id == id)

        if (index == -1)
            return

        this.transactions.splice(index, 1)
    }

    /**
     * Returns a transaction of the provided ID
     */
    getTransaction(id)
    {
        if (typeof(id) == "object")
            id = id.id

        return this.transactions.find(x => x.id == id) || null
    }
}

module.exports = File