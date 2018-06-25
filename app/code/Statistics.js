const moment = require("moment")

const DATE_FORMAT = "YYYY-MM-DD"

class Statistics
{
    constructor(file)
    {
        /**
         * Source file instance
         */
        this.file = file

        /**
         * Daily state of all accounts together
         */
        this.daily = this.computeDaily()

        /**
         * Time span of recording
         */
        this.firstDay = this.daily[0].date.clone()
        this.lastDay = this.daily[this.daily.length - 1].date.clone()
        this.duration = this.firstDay.diff(this.lastDay)

        /**
         * Current state of all accounts
         */
        this.currentTotalState = this.daily[this.daily.length - 1].totalState
        this.currentStates = Object.assign({}, this.daily[this.daily.length - 1].states)

        /**
         * Total spendings / income
         */
        this.totalSpendings = 0
        this.totalIncome = 0

        this.computeTotals()
    }

    /**
     * Computes total spendings and income
     */
    computeTotals()
    {
        if (this.file.transactions.length == 0)
            return

        this.totalSpendings = this.file.transactions
            .map(x => Math.min(x.amount, 0))
            .reduce((acc, x) => acc + x)

        this.totalIncome = this.file.transactions
            .map(x => Math.max(x.amount, 0))
            .reduce((acc, x) => acc + x)
    }

    /**
     * Computes daily state (state at the end of each day)
     */
    computeDaily()
    {
        let states = []

        let date = this.file.transactions.length > 0
            ? this.file.transactions[0].date.clone().subtract(1, "days")
            : moment()

        let totalAcumulator = 0
        let accumulator = {}
        for (let i = 0; i < this.file.accounts.length; i++)
        {
            accumulator[this.file.accounts[i].id] = this.file.accounts[i].initialAmount
            totalAcumulator += this.file.accounts[i].initialAmount
        }

        for (let i = 0; i < this.file.transactions.length; i++)
        {
            if (!this.file.transactions[i].date.isSame(date))
            {
                states.push({
                    date: date,
                    totalState: totalAcumulator,
                    states: Object.assign({}, accumulator)
                })

                date = this.file.transactions[i].date.clone()
            }

            totalAcumulator += this.file.transactions[i].amount
            accumulator[this.file.transactions[i].account.id] += this.file.transactions[i].amount
        }

        states.push({
            date: date,
            totalState: totalAcumulator,
            states: Object.assign({}, accumulator)
        })

        return states
    }
}

module.exports = Statistics