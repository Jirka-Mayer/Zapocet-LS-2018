const Modal = require("./Modal.js")

class TransactionDetailModal extends Modal
{
    constructor(transaction, submitCallback)
    {
        super()

        /**
         * Transaction, that's being edited
         */
        this.transaction = transaction

        /**
         * Function to call on modal submit
         */
        this.submitCallback = submitCallback
    }

    contents()
    {
        return `
            <label>Date</label>
            <input type="text">

            <br>
            <br>

            <button ref="cancel">Cancel</button>
            <button ref="submit">Change</button>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.cancel.addEventListener("click", this.close.bind(this))
        this.refs.submit.addEventListener("click", this.submit.bind(this))
    }

    submit()
    {
        // update the transaction
        //this.transaction._ = _

        // call the callback
        this.submitCallback()

        // close the modal
        this.close()
    }
}

module.exports = TransactionDetailModal