const moment = require("moment")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const AccountPicker = require("./AccountPicker.js")
const DatePicker = require("./DatePicker.js")
const AmountPicker = require("./AmountPicker.js")

class TransactionCreator
{
    constructor(app, element, transactionDidCreate)
    {
        /**
         * App reference
         */
        this.app = app

        /**
         * Root html element
         */
        this.element = element

        /**
         * Callback after transaction has been created
         */
        this.transactionDidCreate = transactionDidCreate

        // template
        this.element.innerHTML = `
            <input ref="date" type="text" placeholder="Date">
            <select ref="account"></select>
            <input ref="amount" type="text" placeholder="Amount">
            <input ref="title" type="text" placeholder="Title">
            <textarea ref="description" placeholder="Description"></textarea>
            <button ref="create">Create</button>
        `

        this.refs = getRefs(this.element)

        // event listeners
        this.refs.create.addEventListener("click", this.onCreateClick.bind(this))

        // instantiate pickers
        this.refs.date = new DatePicker(this.refs.date)
        this.refs.account = new AccountPicker(this.app.file, this.refs.account)
        this.refs.amount = new AmountPicker(this.refs.amount)
    }

    /**
     * CreateButton click handler
     */
    onCreateClick()
    {
        if (!this.validateInput())
        {
            alert("Input is invalid.")
            return
        }

        let transaction = this.app.file.createTransaction(
            this.refs.date.value,
            this.refs.account.value,
            this.refs.amount.value,
            this.refs.title.value,
            this.refs.description.value
        )

        this.refresh()

        this.transactionDidCreate(transaction)
    }

    /**
     * Validates the user input
     */
    validateInput()
    {
        return this.refs.date.isValid() && this.refs.amount.isValid()
    }

    /**
     * Update DOM
     */
    refresh()
    {
        this.refs.date.setNow()
        this.refs.amount.value = ""
        this.refs.title.value = ""
        this.refs.description.value = ""

        this.refs.account.refreshOptions()
        this.refs.account.selectDefault()
    }
}

module.exports = TransactionCreator