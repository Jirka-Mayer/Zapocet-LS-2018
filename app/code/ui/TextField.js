const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class TextField
{
    constructor(element, label, multiline)
    {
        this.element = element
        this.label = label || "Unlabeled:"
        this.multiline = multiline || false

        /**
         * Set this field (from outside) to handle the submit event
         */
        this.onSubmit = null

        cssClass(this.element, "input-wrapper", true)

        if (this.multiline)
        {
            this.element.innerHTML = `
                <label class="input-label">${this.label}</label>
                <form ref="form">
                    <textarea class="input-field" ref="field" type="text" rows="2"></textarea>
                </form>
            `
        }
        else
        {
            this.element.innerHTML = `
                <label class="input-label">${this.label}</label>
                <form ref="form">
                    <input class="input-field" ref="field" type="text" size="5">
                </form>
            `
        }

        this.refs = getRefs(this.element)

        this.refs.form.addEventListener("submit", this.handleSubmit.bind(this))
    }

    get value()
    {
        if (this.refs.field.value == "")
            return null

        return this.refs.field.value
    }

    set value(v)
    {
        this.refs.field.value = v || ""
    }

    /**
     * Call this to focus the field
     */
    focus()
    {
        this.refs.field.focus()
    }

    /**
     * Handles form submit
     */
    handleSubmit(e)
    {
        e.preventDefault()

        if (this.onSubmit)
            this.onSubmit()

        return false
    }
}

module.exports = TextField