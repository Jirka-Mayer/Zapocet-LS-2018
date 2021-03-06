const moment = require("moment")
const Account = require("./Account.js")

class Transaction
{
    constructor(id, dateString, account, amount, title, description)
    {
        if (typeof(account) != "object")
            throw new Error("Provided account value is of wrong type.")

        /**
         * Transaction id (unique, generated by the File object)
         */
        this.id = id

        /**
         * Date (a moment.js instance; only date is important)
         */
        this.date = moment(dateString, "YYYY-MM-DD")

        /**
         * Account, where the transaction took place
         */
        this.account = account

        /**
         * Amount of money being transfered
         */
        this.amount = amount

        /**
         * Short title
         */
        this.title = title || null

        /**
         * Longer optional description
         */
        this.description = description || null
    }

    /**
     * Returns serialization in the form of a javascript object
     */
    serialize()
    {
        return {
            id: this.id,
            date: this.date.format("YYYY-MM-DD"),
            account: this.account.id,
            amount: this.amount,
            title: this.title,
            description: this.description
        }
    }

    /**
     * Creates an instance from serialized data
     */
    static deserialize(data, resolveAccountId)
    {
        return new Transaction(
            data.id,
            data.date,
            resolveAccountId(data.account),
            data.amount,
            data.title,
            data.description
        )
    }

    /**
     * Compare the transaction against another one for sorting
     */
    compare(that)
    {
        // compare dates
        if (this.date.isBefore(that.date)) return -1
        if (this.date.isAfter(that.date)) return 1

        // else if same, compare IDs
        if (this.id < that.id) return -1
        if (this.id > that.id) return 1

        // else same records
        return 0
    }

    /**
     * Returns true if the transaction is synchronizing
     */
    isSynchronizing()
    {
        return this.title == ":sync:"
    }
}

module.exports = Transaction