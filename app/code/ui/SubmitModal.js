const Modal = require("./Modal.js")

class SubmitModal extends Modal
{
    constructor(title, submitCallback, cancelCallback)
    {
        super(title)

        /**
         * Callbacks
         */
        this.submitCallback = submitCallback || null
        this.cancelCallback = cancelCallback || null
    }

    footContents()
    {
        return `
            <button class="button primary" ref="submit">OK</button>
            <button class="button" ref="cancel">Cancel</button>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.cancel.addEventListener("click", this.cancel.bind(this))
        this.refs.submit.addEventListener("click", this.submit.bind(this))
    }

    /**
     * Override this to specify modal submitCallback arguments
     */
    returns()
    {
        return []
    }

    /**
     * Call this to submit the modal
     */
    submit()
    {
        if (this.submitCallback)
            this.submitCallback(...this.returns())

        // calling super to avoid calling cancel callback
        this.close()
    }

    /**
     * Call this to cancel the modal
     */
    cancel()
    {
        if (this.cancelCallback)
            this.cancelCallback()

        this.close()
    }

    /**
     * Called when escape is pressed
     * (overriden)
     */
    handleEscape()
    {
        this.cancel()
    }

    /**
     * Called when background is clicked
     * (overriden)
     */
    handleBackgroundClick()
    {
        this.cancel()
    }
}

module.exports = SubmitModal