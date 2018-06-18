const FilePage = require("./pages/FilePage.js")
const TransactionPage = require("./pages/TransactionPage.js")
const File = require("./File.js")
const ModalContainer = require("./ui/ModalContainer.js")

class Application
{
    constructor(window, document, elementSelector)
    {
        // window and document are passed as a reference to allow
        // for easy testing (dependecy injection)
        this.window = window
        this.document = document

        /**
         * Root DOM element of the application
         */
        this.element = this.document.querySelector(elementSelector)

        /**
         * Application pages
         */
        this.pages = {
            file: new FilePage(this, this.element),
            transaction: new TransactionPage(this, this.element)
        }

        // show the initial page
        this.pages.file.show()

        /**
         * Openned file
         */
        this.file = null

        this.initializeModals()
    }

    initializeModals()
    {
        let div = this.document.createElement("div")
        this.element.appendChild(div)

        /**
         * Basically a modal controller
         */
        this.modals = new ModalContainer(this.document, div)
    }
}

module.exports = Application