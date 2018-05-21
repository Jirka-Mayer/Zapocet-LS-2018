const FileBag = require("../app/code/FileBag.js")

describe("FileBag", () => {

    // fake local storage
    let localStorage = {
        clear()
        {
            for (i in this)
                if (i != "clear")
                    delete this[i]
        }
    }

    // file bag instance
    let fileBag

    // clear storage before each test and create fresh file bag
    beforeEach(() => {
        localStorage.clear()
        fileBag = new FileBag(localStorage)
    })

    it("loads descriptors", () => {
        
        // mock saved descriptors
        localStorage["file-bag"] = JSON.stringify([
            {
                title: "Some file",
                driver: "local",
                id: "some-file"
            },
            {
                title: "Some other file",
                driver: "local",
                id: "some-other-file"
            }
        ])

        // this has been called in constructor,
        // no need to call it in real code
        fileBag.loadDescriptors()

        expect(fileBag.descriptors).toEqual(JSON.parse(localStorage["file-bag"]))
    })

    it("stores new descriptors", () => {
        fileBag.addDescriptor("Title", "local", "id")
        fileBag.saveDescriptors()
        expect(localStorage["file-bag"]).toEqual(JSON.stringify([
            {title: "Title", driver: "local", id: "id"}
        ]))
    })

    describe("with local storage driver", () => {
        
        it("loads saved file", () => {
            let descriptor = {title: "Foo", driver: "local", id: "foo"}

            localStorage["file-bag"] = JSON.stringify([descriptor])
            localStorage["local-file.foo"] = "this-is-file-content"
            fileBag.loadDescriptors()
            
            expect(fileBag.loadFile(descriptor)).toEqual("this-is-file-content")
        })

        it("stores new files", () => {
            let descriptor = {title: "Foo", driver: "local", id: "foo"}
            localStorage["file-bag"] = JSON.stringify([descriptor])
            fileBag.loadDescriptors()

            fileBag.saveFile(descriptor, "this-is-file-content")
            expect(localStorage["local-file.foo"]).toEqual("this-is-file-content")
        })

    })

})