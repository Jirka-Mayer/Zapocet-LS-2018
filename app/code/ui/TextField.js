const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class TextField
{
    constructor(element, label, multiline)
    {
        this.element = element
        this.label = label || "Unlabeled:"
        this.multiline = multiline || false

        cssClass(this.element, "input-wrapper", true)

        if (this.multiline)
        {
            this.element.innerHTML = `
                <label class="input-label">${this.label}</label>
                <textarea class="input-field" ref="field" type="text" rows="2"></textarea>
            `
        }
        else
        {
            this.element.innerHTML = `
                <label class="input-label">${this.label}</label>
                <input class="input-field" ref="field" type="text" size="5">
            `
        }

        this.refs = getRefs(this.element)
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
}

module.exports = TextField