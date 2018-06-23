const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const AmountFormatter = require("./AmountFormatter.js")

class AmountField
{
    constructor(element, label)
    {
        this.element = element
        this.label = label || "Unlabeled:"

        cssClass(this.element, "input-wrapper", true)
        this.element.innerHTML = `
            <label class="input-label">${this.label}</label>
            <input class="input-field" ref="field" type="text" size="5">
            <div class="input-state" ref="state"></div>
        `

        this.refs = getRefs(this.element)

        this.value = 0
        this.handleFieldChange()

        this.refs.field.addEventListener("change", this.handleFieldChange.bind(this))
        this.refs.field.addEventListener("keyup", this.handleFieldChange.bind(this))
    }

    isValid()
    {
        return !Number.isNaN(this.value)
    }

    get value()
    {
        if (this.refs.field.value == "")
            return 0

        let val = this.refs.field.value.replace(/[^-0-9]/g, "")

        return Number.parseInt(val)
    }

    set value(v)
    {
        if (v == "" || v == 0)
        {
            this.refs.field.value = ""
            return
        }

        this.refs.field.value = Math.floor(v).toString()
    }

    handleFieldChange()
    {
        if (this.isValid())
        {
            cssClass(this.refs.state, "invalid", false)

            if (this.value <= 0)
                this.refs.state.innerText = "Spent " + AmountFormatter.format(-this.value)
            else
                this.refs.state.innerText = "Gained " + AmountFormatter.format(this.value)
        }
        else
        {
            cssClass(this.refs.state, "invalid", true)
            this.refs.state.innerText = "Invalid input"
        }
    }
}

module.exports = AmountField