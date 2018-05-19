const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class Page
{
    constructor(app, container)
    {
        this.app = app

        /**
         * Container DOM element
         */
        this.container = container

        /**
         * Page element
         */
        this.element = this.app.document.createElement("div")

        /**
         * Is the page visible? (get only)
         */
        this.visible = false
        this.element.style.display = "none"

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
     * Shows the page
     */
    show()
    {
        this.element.style.display = "block"
        this.visible = true
    }

    /**
     * Hides the page
     */
    hide()
    {
        this.element.style.display = "none"
        this.visible = false
    }
}

module.exports = Page