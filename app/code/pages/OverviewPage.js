const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")
const Statistics = require("../Statistics.js")
const Chart = require("chart.js")

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
            <h1>Overview page</h1>

            <h2>Current state</h2>
            <table ref="currentState"></table>

            <h2>State over time</h2>
            <div style="position: relative; width: 100%">
                <canvas ref="daily" width="400" height="200"></canvas>
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
                    <td>${account.title}</td>
                    <td>${this.stats.currentStates[account.id]}</td>
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
                <td><b>Total</b></td>
                <td><b>${this.stats.currentTotalState}</b></td>
            </tr>
        `
    }

    setupDailyState()
    {
        let datasets = []
        
        for (let i = 0; i < this.app.file.accounts.length; i++)
        {
            let account = this.app.file.accounts[i]

            datasets.push({
                label: account.title,
                data: this.stats.daily.map(x => { return {
                    t: x.date.toDate(),
                    y: x.states[account.id]
                }})
            })
        }

        this.dailyChart = new Chart(this.refs.daily.getContext("2d"), {
            type: "line",
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            unit: "day"
                        }
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }
        })
    }
}

module.exports = OverviewPage