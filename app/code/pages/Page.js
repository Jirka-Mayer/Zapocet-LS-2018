const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class Page
{
    constructor(app)
    {
        this.app = app

        /**
         * Container DOM element
         */
        this.container = this.app.element

        /**
         * Page element
         */
        this.element = this.app.document.createElement("div")

        // set proper css class
        cssClass(this.element, "ui-page", true)

        // initialize element content
        this.element.innerHTML = this.template()

        // get refs
        this.refs = getRefs(this.element)

        // insert page into the container
        this.container.appendChild(this.element)
    }

    /**
     * Returns the HTML template of the page
     */
    template()
    {
        return `Empty page. Override this.`
    }

    /**
     * Closes the page
     */
    close()
    {
        this.container.removeChild(this.element)
    }
}

module.exports = Page