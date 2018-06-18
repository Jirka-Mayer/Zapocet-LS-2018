const FilePage = require("./pages/FilePage.js")
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
         * Current application page
         */
        this.page = null

        // show the initial page
        this.gotoPage(FilePage)

        /**
         * Openned file
         */
        this.file = null

        this.initializeModals()
    }

    gotoPage(PageContructor)
    {
        // close current page
        if (this.page)
        {
            this.page.close()
            this.page = null
        }

        // show new page
        this.page = new PageContructor(this)
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