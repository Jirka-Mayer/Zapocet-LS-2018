const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class Modal
{
    /**
     * Somewhat like a constructor, but called by the modal container
     */
    initialize(document, closeCallback)
    {
        /**
         * Root html element
         * @type {[type]}
         */
        this.element = document.createElement("div")

        cssClass(this.element, "modal", true)
        this.element.innerHTML = this.template()

        /**
         * Callback for closing the modal
         */
        this.closeCallback = closeCallback
    }

    /**
     * Modal html
     */
    template()
    {
        return `
            ${this.contents()}
        `
    }

    /**
     * Modal content html to override
     */
    contents()
    {
        return `
            <i>Empty modal</i><br>
            <b>Override me!</b>
        `
    }

    /**
     * Hook called by the container after mounting
     */
    modalDidMount()
    {
        this.refs = getRefs(this.element)
    }

    /**
     * Close the modal (in a "cancel" way)
     */
    close()
    {
        this.closeCallback()
    }
}

module.exports = Modal