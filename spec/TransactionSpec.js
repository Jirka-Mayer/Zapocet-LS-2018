const File = require("../app/code/File.js")
const Transaction = require("../app/code/Transaction.js")

/**
 * It's more like File->Transactions test suite
 */
describe("Transaction", () => {

    it("can serialize and deserialize", () => {
        let file = new File()
        let a = new Transaction(
            0, "2018-06-15", file.accounts[0], -10, "Lolipop", "A red one."
        )
        let sa = a.serialize()

        let b = Transaction.deserialize(sa, x => file.accounts[0])
        let sb = b.serialize()

        expect(sa).toEqual({
            id: 0,
            date: "2018-06-15",
            account: file.accounts[0].id,
            amount: -10,
            title: "Lolipop",
            description: "A red one."
        })
        expect(sa).toEqual(sb)
    })

    it("can be created", () => {
        let f = new File()
        f.createTransaction("2018-06-15", f.accounts[0], -10, "Lolipop")

        expect(f.transactions.length).toEqual(1)

        expect(f.transactions[0].id).toEqual(0)
        expect(f.transactions[0].title).toEqual("Lolipop")
        expect(f.transactions[0].account).toEqual(f.accounts[0])
        expect(f.transactions[0].description).toEqual(null)
    })

    it("can be removed", () => {
        // by id
        let f = new File()
        let t = f.createTransaction("2018-06-15", f.accounts[0], -10, "Lolipop")
        f.removeTransaction(t.id)
        expect(f.transactions.length).toEqual(0)

        // by instance
        f = new File()
        t = f.createTransaction("2018-06-15", f.accounts[0], -10, "Lolipop")
        f.removeTransaction(t)
        expect(f.transactions.length).toEqual(0)
    })

    it("can be compared", () => {
        let f = new File()
        
        // a < b < c
        let a = f.createTransaction("2018-02-15", f.accounts[0], 0, "A")
        let b = f.createTransaction("2018-06-15", f.accounts[0], 0, "B")
        let c = f.createTransaction("2018-06-15", f.accounts[0], 0, "C")

        expect(a.compare(b)).toEqual(-1)
        expect(b.compare(c)).toEqual(-1)
        expect(a.compare(c)).toEqual(-1)

        expect(b.compare(a)).toEqual(1)
        expect(c.compare(b)).toEqual(1)
        expect(c.compare(a)).toEqual(1)

        expect(a.compare(a)).toEqual(0)
        expect(b.compare(b)).toEqual(0)
        expect(c.compare(c)).toEqual(0)
    })

    it(": File stays ordered", () => {
        let f = new File()
        f.createTransaction("2018-02-15", f.accounts[0], 0, "A")
        f.createTransaction("2018-06-15", f.accounts[0], 0, "B")
        f.createTransaction("2018-03-15", f.accounts[0], 0, "C")
        f.createTransaction("2018-01-15", f.accounts[0], 0, "C")
        f.createTransaction("2018-08-15", f.accounts[0], 0, "C")

        for (let i = 1; i < f.transactions.length; i++)
        {
            if (f.transactions[i - 1].compare(f.transactions[i]) != -1)
                fail("Transactions are not ordered.")
        }
    })

    it("can be looked up", () => {
        let f = new File()
        let a = f.createTransaction("2018-02-15", f.accounts[0], 0, "A")
        let b = f.createTransaction("2018-06-15", f.accounts[0], 0, "B")

        expect(f.getTransaction(0)).toEqual(a)
        expect(f.getTransaction(1)).toEqual(b)
        expect(f.getTransaction(10)).toEqual(null)
    })

})