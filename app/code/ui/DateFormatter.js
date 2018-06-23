const moment = require("moment")

class DateFormatter
{
    static format(momentInstance)
    {
        return momentInstance.format("D. MMMM YYYY")
    }

    static formatFancy(momentInstance)
    {
        if (momentInstance.isSame(moment(), "day"))
            return "Today"

        if (momentInstance.isSame(moment().subtract(1, "days"), "day"))
            return "Yesterday"

        if (momentInstance.isSame(moment().add(1, "days"), "day"))
            return "Tomorrow"

        return DateFormatter.format(momentInstance)
    }

    static parse(str)
    {
        str = str.toLowerCase()

        if (str == "today")
            return moment()

        if (str == "yesterday")
            return moment().subtract(1, "days")

        if (str == "tomorrow")
            return moment().add(1, "days")

        return moment(str, "D. MMMM YYYY")
    }
}

module.exports = DateFormatter