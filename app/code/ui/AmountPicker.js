class AmountPicker
{
    constructor(element)
    {
        this.element = element
    }

    isValid()
    {
        return !Number.isNaN(this.value)
    }

    get value()
    {
        if (this.element.value == "")
            return 0

        return Number.parseInt(this.element.value)
    }

    set value(v)
    {
        if (v == "" || v == 0)
        {
            this.element.value = ""
            return
        }

        this.element.value = Math.floor(v).toString()
    }
}

module.exports = AmountPicker