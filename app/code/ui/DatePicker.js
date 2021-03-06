const moment = require("moment")
const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")
const DateFormatter = require("./DateFormatter.js")

class DatePicker
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

        this.setNow()
        this.handleFieldChange()

        this.refs.field.addEventListener("change", this.handleFieldChange.bind(this))
        this.refs.field.addEventListener("keyup", this.handleFieldChange.bind(this))
    }

    isValid()
    {
        return this.value.isValid()
    }

    setNow()
    {
        this.value = moment()
    }

    get value()
    {
        if (this.refs.field.value == "")
            return moment()

        return DateFormatter.parse(this.refs.field.value)
    }

    set value(date)
    {
        if (typeof(date) == "object")
            date = DateFormatter.format(date)

        this.refs.field.value = date
    }

    handleFieldChange()
    {
        if (this.isValid())
        {
            cssClass(this.refs.state, "invalid", false)
            this.refs.state.innerText = DateFormatter.formatFancy(this.value)
        }
        else
        {
            cssClass(this.refs.state, "invalid", true)
            this.refs.state.innerText = "Invalid input"
        }
    }
}

module.exports = DatePicker