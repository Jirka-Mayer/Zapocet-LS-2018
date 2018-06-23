const Modal = require("./Modal.js")
const AmountField = require("./AmountField.js")

class AccountDetailModal extends Modal
{
    constructor(account, file, submitCallback, cancelCallback)
    {
        super()

        /**
         * Transaction, that's being edited
         */
        this.account = account

        /**
         * File instance
         */
        this.file = file

        /**
         * Callbacks
         */
        this.submitCallback = submitCallback
        this.cancelCallback = cancelCallback
    }

    contents()
    {
        return `
            <label>Title</label>
            <input ref="title" type="text">
            <br>

            <label>Initial amount</label>
            <input ref="initialAmount" type="text">
            <br>

            <hr>

            <button ref="cancel">Cancel</button>
            <button ref="submit">Change</button>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.initialAmount = new AmountField(this.refs.initialAmount)

        this.loadAccountValues()

        this.refs.cancel.addEventListener("click", this.close.bind(this))
        this.refs.submit.addEventListener("click", this.submit.bind(this))
    }

    loadAccountValues()
    {
        this.refs.initialAmount.value = this.account.initialAmount
        this.refs.title.value = this.account.title
    }

    storeAccountValues()
    {
        this.account.initialAmount = this.refs.initialAmount.value
        this.account.title = this.refs.title.value
    }

    validate()
    {
        return this.refs.initialAmount.isValid()
    }

    submit()
    {
        if (!this.validate())
        {
            alert("Input is invalid.")
            return
        }

        this.storeAccountValues()

        this.submitCallback()

        super.close() // super, because we want to avoid cancel callback
    }

    close(submitted)
    {
        this.cancelCallback()
        super.close()
    }
}

module.exports = AccountDetailModal