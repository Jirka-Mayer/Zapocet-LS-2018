const moment = require("moment")
const FORMAT = "YYYY-MM-DD"

class DatePicker
{
    constructor(element)
    {
        this.element = element

        this.setNow()
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
        return moment(this.element.value, FORMAT)
    }

    set value(date)
    {
        if (typeof(date) == "object")
            date = date.format(FORMAT)

        this.element.value = date
    }
}

module.exports = DatePicker