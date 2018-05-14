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
    }

    /**
     * Dummy function
     */
    sayHello()
    {
        alert("hello")
    }
}

module.exports = Application