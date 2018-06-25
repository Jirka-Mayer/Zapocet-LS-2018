const moment = require("moment")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const AccountPicker = require("./AccountPicker.js")
const DatePicker = require("./DatePicker.js")
const AmountField = require("./AmountField.js")
const TextField = require("./TextField.js")

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
        cssClass(this.element, "transaction-creator", true)
        this.element.innerHTML = `
            <div class="row">
                <div ref="title"></div>
            </div>
            <div class="row">
                <div ref="date"></div>
                <div ref="account"></div>
                <div ref="amount"></div>
            </div>
            <div class="row">
                <div ref="description"></div>
                <button ref="create" class="button big">Create</button>
            </div>
        `

        this.refs = getRefs(this.element)

        // event listeners
        this.refs.create.addEventListener("click", this.onCreateClick.bind(this))

        // instantiate fields
        this.refs.date = new DatePicker(this.refs.date, "Date:")
        this.refs.account = new AccountPicker(this.refs.account, "Account:", this.app.file)
        this.refs.amount = new AmountField(this.refs.amount, "Amount:")
        this.refs.title = new TextField(this.refs.title, "Title:", false)
        this.refs.description = new TextField(this.refs.description, "Description:", true)

        this.refs.title.focus()

        this.refs.title.onSubmit = this.onCreateClick.bind(this)
        this.refs.description.onSubmit = this.onCreateClick.bind(this)
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
        this.refs.amount.value = 0
        this.refs.title.value = null
        this.refs.description.value = null

        this.refs.account.refreshOptions()
        this.refs.account.selectDefault()
    }
}

module.exports = TransactionCreator