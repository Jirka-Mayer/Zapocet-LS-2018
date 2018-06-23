const cssClass = require("../utils/cssClass.js")
const getRefs = require("../utils/getRefs.js")

class AccountPicker
{
    constructor(element, label, file)
    {
        this.element = element
        this.label = label || "Unlabeled:"
        this.file = file

        cssClass(this.element, "input-wrapper", true)
        this.element.innerHTML = `
            <label class="input-label">${this.label}</label>
            <select class="input-field" ref="field">
            </select>
        `

        this.refs = getRefs(this.element)

        this.refreshOptions()
        this.selectDefault()
    }

    refreshOptions()
    {
        this.refs.field.innerHTML = this.file.accounts
            .map(x => `<option value="${x.id}">${x.title}</option>`)
            .join("")
    }

    selectDefault()
    {
        this.value = this.file.getDefaultAccount()
    }

    /**
     * Registers an event handler
     */
    onChange(callback)
    {
        this.refs.field.addEventListener("change", callback)
    }

    get value()
    {
        return this.file.getAccount(this.refs.field.value)
    }

    set value(id)
    {
        if (typeof(id) == "object")
            id = id.id

        this.refs.field.value = id
    }
}

module.exports = AccountPicker