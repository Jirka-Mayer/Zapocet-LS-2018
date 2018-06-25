const SubmitModal = require("./SubmitModal.js")
const AmountField = require("./AmountField.js")
const TextField = require("./TextField.js")

class AccountDetailModal extends SubmitModal
{
    constructor(account, submitCallback, cancelCallback)
    {
        super("Account detail", submitCallback, cancelCallback)

        /**
         * Transaction, that's being edited
         */
        this.account = account
    }

    contents()
    {
        return `
            <div ref="title" style="display: block; margin-bottom: 20px"></div>
            <div ref="initialAmount" style="display: block; margin-bottom: 20px"></div>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.title = new TextField(this.refs.title, "Title:")
        this.refs.initialAmount = new AmountField(this.refs.initialAmount, "Initial amount:")

        this.refs.title.focus()

        this.refs.title.onSubmit = this.submit.bind(this)
        this.refs.initialAmount.onSubmit = this.submit.bind(this)

        this.loadAccountValues()
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

        super.submit()
    }
}

module.exports = AccountDetailModal