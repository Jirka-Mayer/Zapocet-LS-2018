class AmountFormatter
{
    static format(amount)
    {
        let negative = amount < 0

        amount = amount.toString()

        let spaceCount = Math.ceil(amount.length / 3) - (negative ? 1 : 0)

        for (let i = 0; i < spaceCount; i++)
        {
            let splitPoint = amount.length - i * 4
            amount = amount.substring(0, splitPoint) + " "
                + amount.substring(splitPoint, amount.length)
        }

        return amount + ",-"
    }
}

module.exports = AmountFormatter