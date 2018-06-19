const File = require("../app/code/File.js")
const Statistics = require("../app/code/Statistics.js")

describe("Statistics", () => {

    it("contains daily state", () => {
        let file = new File()
        let cash = file.getDefaultAccount()
        let bank = file.createAccount("Bank", 100)
        cash.initialAmount = 1200
        file.createTransaction("2018-02-15", cash, -12, "Lolipop", "Of a red color.")
        file.createTransaction("2018-03-15", bank, -40, "Stuff")
        file.createTransaction("2018-04-15", cash, 6, ":sync:")
        file.createTransaction("2018-04-15", bank, 6, ":sync:")

        let stats = new Statistics(file)

        let daily = stats.daily.map(x => {
            x.date = x.date.format("YYYY-MM-DD")
            return x
        })

        expect(daily).toEqual([
            { date: "2018-02-14", totalState: 1300, states: { "0": 1200, "1": 100 } },
            { date: "2018-02-15", totalState: 1288, states: { "0": 1188, "1": 100 } },
            { date: "2018-03-15", totalState: 1248, states: { "0": 1188, "1": 60 } },
            { date: "2018-04-15", totalState: 1260, states: { "0": 1194, "1": 66 } },
        ])

        expect(stats.currentTotalState).toEqual(1260)
        expect(stats.currentStates).toEqual({ "0": 1194, "1": 66 })

        expect(stats.firstDay.format("YYYY-MM-DD")).toEqual("2018-02-14")
        expect(stats.lastDay.format("YYYY-MM-DD")).toEqual("2018-04-15")

        expect(stats.totalSpendings).toEqual(-52)
        expect(stats.totalIncome).toEqual(12)
    })

})