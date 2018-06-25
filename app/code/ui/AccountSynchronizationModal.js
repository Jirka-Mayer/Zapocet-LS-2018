const SubmitModal = require("./SubmitModal.js")
const AmountField = require("./AmountField.js")
const moment = require("moment")

class AccountSynchronizationModal extends SubmitModal
{
    constructor(account, file, submitCallback)
    {
        super("Synchronize account", submitCallback, null)

        this.account = account
        this.file = file

        /**
         * Used for returning value from modal; set in submit method
         */
        this.synchronizingTransaction = null

        /**
         * Current state of the account according to the file
         */
        this.currentState = this.obtainCurrentState()
    }

    contents()
    {
        return `
            <div ref="state" style="display: block; margin-bottom: 20px"></div>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.state = new AmountField(this.refs.state, "Current account state:")

        this.refs.state.value = this.currentState
        this.refs.state.focus()
        this.refs.state.onSubmit = this.submit.bind(this)
    }

    returns()
    {
        return [this.synchronizingTransaction]
    }

    submit()
    {
        this.synchronizingTransaction = this.file.createTransaction(
            moment(),
            this.account,
            this.refs.state.value - this.currentState,
            ":sync:",
            null
        )

        super.submit()
    }

    /**
     * Returns current state of the account
     */
    obtainCurrentState()
    {
        let state = this.account.initialAmount

        for (let i = 0; i < this.file.transactions.length; i++)
        {
            let t = this.file.transactions[i]

            if (t.account == this.account)
                state += t.amount
        }

        return state
    }
}

module.exports = AccountSynchronizationModal