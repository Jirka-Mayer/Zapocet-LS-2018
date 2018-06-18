class AccountPicker
{
    constructor(file, element)
    {
        this.element = element

        this.file = file

        this.refreshOptions()

        this.selectDefault()
    }

    refreshOptions()
    {
        this.element.innerHTML = this.file.accounts
            .map(x => `<option value="${x.id}">${x.title}</option>`)
            .join("")
    }

    selectDefault()
    {
        this.value = this.file.getDefaultAccount()
    }

    get value()
    {
        return this.file.getAccount(this.element.value)
    }

    set value(id)
    {
        if (typeof(id) == "object")
            id = id.id

        this.element.value = id
    }
}

module.exports = AccountPicker