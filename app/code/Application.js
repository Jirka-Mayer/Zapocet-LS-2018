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
        this.fileDescriptor = null

        this.initializeModals()

        // listen for window closing
        this.window.addEventListener("beforeunload", this.beforeUnload.bind(this))
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
        if (PageContructor != null)
            this.page = new PageContructor(this)

        return this.page
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

    saveAndCloseFile()
    {
        this.gotoPage(FilePage)

        this.page.saveFile(this.fileDescriptor, this.file)

        this.file = null
        this.fileDescriptor = null
    }

    /**
     * Called before the page is closed
     */
    beforeUnload()
    {
        // save file if openned
        if (this.file != null)
            this.saveAndCloseFile()
    }
}

module.exports = Application