const FilePage = require("./pages/FilePage.js")

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
            file: new FilePage(this.element, this.document)
        }

        // show the initial page
        this.pages.file.show()
    }
}

module.exports = Application