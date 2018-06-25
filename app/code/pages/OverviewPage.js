const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")
const Statistics = require("../Statistics.js")
const Chart = require("chart.js")
const HtmlEntities = require("../utils/HtmlEntities.js")
const AmountFormatter = require("../ui/AmountFormatter.js")

class OverviewPage extends Page
{
    constructor(app)
    {
        super(app)

        this.menu = new Menu(this.app, this.refs.menu, "overview")

        this.stats = new Statistics(this.app.file)

        this.setupCurrentState()
        this.setupDailyState()
    }

    template()
    {
        return `
            <div ref="menu"></div>
            <div class="page-container overview-page">
                <h3 class="heading">Current state:</h3>
                <table ref="currentState" class="table current-state"></table>

                <h3 class="heading">State over time:</h3>
                <div class="over-time">
                    <canvas ref="daily" width="400" height="200"></canvas>
                </div>
            </div>
        `
    }

    setupCurrentState()
    {
        let accountsHtml = ""

        for (let i = 0; i < this.app.file.accounts.length; i++)
        {
            let account = this.app.file.accounts[i]

            accountsHtml += `
                <tr>
                    <td>${HtmlEntities.escape(account.title)}</td>
                    <td>${AmountFormatter.format(this.stats.currentStates[account.id])}</td>
                </tr>
            `
        }

        this.refs.currentState.innerHTML = `
            <tr>
                <th>Account</th>
                <th>Current state</th>
            </tr>
            ${accountsHtml}
            <tr>
                <th>Total</th>
                <th>${AmountFormatter.format(this.stats.currentTotalState)}</th>
            </tr>
        `
    }

    setupDailyState()
    {
        const colors = [
            { background: "rgba(41, 162, 181, 0.5)", border: "rgba(31, 138, 154, 0.8)" }, // cyan
            { background: "rgba(255, 99, 71, 0.5)", border: "rgba(212, 77, 53, 0.8)" }, // red
            { background: "rgba(12, 148, 10, 0.5)", border: "rgba(11, 107, 9, 0.8)" }, // green
            { background: "rgba(210, 185, 8, 0.5)", border: "rgba(169, 149, 9, 0.8)" }, // yellow
        ]

        let datasets = []
        
        for (let i = 0; i < this.app.file.accounts.length; i++)
        {
            let account = this.app.file.accounts[i]

            datasets.push({
                label: account.title,
                backgroundColor: colors[i % colors.length].background,
                borderColor: colors[i % colors.length].border,
                data: this.stats.daily.map(x => { return {
                    t: x.date.toDate(),
                    y: x.states[account.id]
                }})
            })
        }

        // prevent area-fill overlapping
        if (datasets.length > 0)
            datasets[0].fill = "origin"

        this.dailyChart = new Chart(this.refs.daily.getContext("2d"), {
            type: "line",
            data: {
                datasets: datasets
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: x => datasets[x.datasetIndex].label + ": " + AmountFormatter.format(x.yLabel)
                    }
                },
                scales: {
                    xAxes: [{
                        type: "time"
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            callback: x => AmountFormatter.format(x)
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0,
                        fill: "-1" // prevent area-fill overlapping
                    }
                }
            }
        })
    }
}

module.exports = OverviewPage