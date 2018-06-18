const Modal = require("./Modal.js")
const AccountPicker = require("./AccountPicker.js")
const DatePicker = require("./DatePicker.js")

class TransactionDetailModal extends Modal
{
    constructor(transaction, file, submitCallback)
    {
        super()

        /**
         * Transaction, that's being edited
         */
        this.transaction = transaction

        /**
         * File instance
         */
        this.file = file

        /**
         * Function to call on modal submit
         */
        this.submitCallback = submitCallback
    }

    contents()
    {
        return `
            <label>Date</label>
            <input ref="date" type="text">
            <br>

            <label>Account</label>
            <select ref="account"></select>
            <br>

            <label>Amount</label>
            <input ref="amount" type="text">
            <br>

            <label>Title</label>
            <input ref="title" type="text">
            <br>

            <label>Description</label>
            <textarea ref="description"></textarea>
            <br>

            <hr>

            <button ref="cancel">Cancel</button>
            <button ref="submit">Change</button>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.date = new DatePicker(this.refs.date)
        this.refs.account = new AccountPicker(this.file, this.refs.account)

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

        this.submitCallback()

        this.close()
    }
}

module.exports = TransactionDetailModal