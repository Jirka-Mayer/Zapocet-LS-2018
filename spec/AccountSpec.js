const File = require("../app/code/File.js")
const Account = require("../app/code/Account.js")

/**
 * It's more like File->Accounts test suite
 */
describe("Account", () => {

    it("can serialize and deserialize", () => {
        let a = new Account(0, "Cash", 120)
        let sa = a.serialize()

        let b = Account.deserialize(sa)
        let sb = b.serialize()

        expect(sa).toEqual({
            id: 0,
            title: "Cash",
            initialAmount: 120
        })
        expect(sa).toEqual(sb)
    })

    it(": New file contains a default account ", () => {
        let f = new File()
        
        expect(f.accounts.length).toEqual(1)
        expect(f.accounts[0]).toEqual(jasmine.objectContaining({
            id: 0,
            title:"Cash",
            initialAmount: 0
        }))
    })

    it("can be created", () => {
        let f = new File()
        f.createAccount("Bank", 100)

        expect(f.accounts.length).toEqual(2)
        expect(f.accounts[1]).toEqual(jasmine.objectContaining({
            id: 1,
            title:"Bank",
            initialAmount: 100
        }))
    })

    it("can be removed", () => {
        // by id
        let f = new File()
        f.removeAccount(f.accounts[0].id)
        expect(f.accounts.length).toEqual(0)

        // by instance
        f = new File()
        f.removeAccount(f.accounts[0])
        expect(f.accounts.length).toEqual(0)
    })

    it("can be set default", () => {
        // by id
        let f = new File()
        let bank = f.createAccount("Bank", 100)
        f.setDefaultAccount(bank.id)

        // by instance
        f = new File()
        bank = f.createAccount("Bank", 100)
        f.setDefaultAccount(bank)
    })

    it("can be looked up", () => {
        let f = new File()

        expect(f.getAccount(0)).toEqual(f.accounts[0])
        expect(f.getAccount(42)).toEqual(null)
    })

})