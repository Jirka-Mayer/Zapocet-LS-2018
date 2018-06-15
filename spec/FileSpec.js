const File = require("../app/code/File.js")

describe("File", () => {

    it("can serialize and deserialize", () => {
        let file = new File()
        let cash = file.getDefaultAccount()
        cash.initialAmount = 1200
        file.createTransaction("2018-02-15", cash, -12, "Lolipop", "Of a red color.")
        file.createTransaction("2018-03-15", cash, -40, "Stuff")
        file.createTransaction("2018-04-15", cash, 6, ":sync:")

        let data = file.serialize()
        let loadedFile = File.deserialize(data)

        expect(jasmine.objectContaining(loadedFile))
            .toEqual(jasmine.objectContaining(file))
    })

})