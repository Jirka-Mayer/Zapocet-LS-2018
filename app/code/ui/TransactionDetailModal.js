const SubmitModal = require("./SubmitModal.js")
const AccountPicker = require("./AccountPicker.js")
const DatePicker = require("./DatePicker.js")
const AmountField = require("./AmountField.js")
const TextField = require("./TextField.js")

class TransactionDetailModal extends SubmitModal
{
    constructor(transaction, file, submitCallback)
    {
        super("Transaction detail", submitCallback, null)

        /**
         * Transaction, that's being edited
         */
        this.transaction = transaction

        /**
         * File instance
         */
        this.file = file
    }

    contents()
    {
        return `
            <div ref="title" style="display: block; margin-bottom: 20px"></div>
            <div ref="amount" style="display: block; margin-bottom: 20px"></div>
            <div ref="date" style="display: block; margin-bottom: 20px"></div>
            <div ref="account" style="display: block; margin-bottom: 20px"></div>
            <div ref="description" style="display: block; margin-bottom: 20px"></div>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.date = new DatePicker(this.refs.date, "Date:")
        this.refs.account = new AccountPicker(this.refs.account, "Account:", this.file)
        this.refs.amount = new AmountField(this.refs.amount, "Amount:")
        this.refs.title = new TextField(this.refs.title, "Title:")
        this.refs.description = new TextField(this.refs.description, "Description:", true)

        this.loadTransactionValues()

        this.refs.cancel.addEventListener("click", this.close.bind(this))
        this.refs.submit.addEventListener("click", this.submit.bind(this))
    }

    loadTransactionValues()
    {
        this.refs.date.value = this.transaction.date
        this.refs.account.value = this.transaction.account
        this.refs.amount.value = this.transaction.amount
        this.refs.title.value = this.transaction.title
        this.refs.description.value = this.transaction.description
    }

    storeTransactionValues()
    {
        this.transaction.date = this.refs.date.value
        this.transaction.account = this.refs.account.value
        this.transaction.amount = this.refs.amount.value
        this.transaction.title = this.refs.title.value
        this.transaction.description = this.refs.description.value
    }

    validate()
    {
        return this.refs.date.isValid() && this.refs.amount.isValid()
    }

    submit()
    {
        if (!this.validate())
        {
            alert("Input is invalid.")
            return
        }

        this.storeTransactionValues()

        super.submit()
    }
}

module.exports = TransactionDetailModal