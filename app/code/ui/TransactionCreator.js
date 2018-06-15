const moment = require("moment")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

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
            <select ref="account">
                <option value="1">lorem<option>
            </select>
            <input ref="amount" type="text" placeholder="Amount">
            <input ref="title" type="text" placeholder="Title">
            <textarea ref="description" placeholder="Description"></textarea>
            <button ref="create">Create</button>
        `

        this.refs = getRefs(this.element)

        // event listeners
        this.refs.create.addEventListener("click", this.onCreateClick.bind(this))
    }

    /**
     * CreateButton click handler
     */
    onCreateClick()
    {
        if (!this.validateInput())
            return

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
        console.warn("TODO: validation")

        return true
    }

    /**
     * Update DOM
     */
    refresh()
    {
        this.refs.date.value = moment().format("YYYY-MM-DD")
        this.refs.amount.value = ""
        this.refs.title.value = ""

        this.refs.account.value = this.app.file.getDefaultAccount().id.toString()
        this.refs.account.innerHTML = this.app.file.accounts
            .map(x => `<option value="${x.id}">${x.title}</option>`)
            .join("")
    }
}

module.exports = TransactionCreator