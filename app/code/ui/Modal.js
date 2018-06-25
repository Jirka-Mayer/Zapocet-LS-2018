const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const HtmlEntities = require("../utils/HtmlEntities.js")

class Modal
{
    constructor(title)
    {
        /**
         * Modal title
         */
        this.title = title
    }

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

        // escape pressing
        this.element.addEventListener("keydown", (e) => {
            if (e.key == "Escape")
                this.handleEscape()
        })

        // background clicking
        this.element.addEventListener("click", (e) => {
            if (e.target == this.element)
                this.handleBackgroundClick()
        })
    }

    /**
     * Modal html
     */
    template()
    {
        let headContents = this.headContents()
        let head = `
            <div class="modal-head">
                ${headContents}
            </div>
            <hr class="modal-splitter">
        `

        let footContents = this.footContents()
        let foot = `
            <hr class="modal-splitter">
            <div class="modal-foot">
                ${footContents}
            </div>
        `

        return `
            <div class="modal-window">
                ${headContents ? head : ""}
                <div class="modal-contents">
                    ${this.contents()}
                </div>
                ${footContents ? foot : ""}
            </div>
        `
    }

    /**
     * Modal head contents
     */
    headContents()
    {
        return `
            <h3 class="modal-title">
                ${HtmlEntities.escape(this.title)}
            </h3>
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
     * Modal foot contents
     */
    footContents()
    {
        return null
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

    /**
     * Called when escape is pressed
     */
    handleEscape()
    {
        this.close()
    }

    /**
     * Called when background is clicked
     */
    handleBackgroundClick()
    {
        this.close()
    }
}

module.exports = Modal