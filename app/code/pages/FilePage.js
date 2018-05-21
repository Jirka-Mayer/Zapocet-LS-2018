const Page = require("./Page.js")
const FileBag = require("../FileBag.js")
const File = require("../File.js")

class FilePage extends Page
{
    constructor(app, container)
    {
        super(app, container)

        this.fileBag = new FileBag(app.window.localStorage)

        this.refreshFileList()

        this.refs.fileList.addEventListener(
            "click", this.onFileListClick.bind(this))

        this.refs.createFileButton.addEventListener(
            "click", this.createFile.bind(this))
    }

    template()
    {
        return `
            <h1>File page</h1>
            <ul ref="fileList">
                <!--...-->
            </ul>
            <button ref="createFileButton">Create new file</button>
        `
    }

    /**
     * Refreshes list of files (DOM)
     */
    refreshFileList()
    {
        let html = ""

        for (let i = 0; i < this.fileBag.descriptors.length; i++)
        {
            html += `
                <li>
                    ` + this.fileBag.descriptors[i].title + `
                    <button data-descriptor="` + i + `" data-action="open">Open</button>
                    <button data-descriptor="` + i + `" data-action="remove">X</button>
                </li>
            `
        }

        this.refs.fileList.innerHTML = html
    }

    onFileListClick(e)
    {
        if (e.target.attributes["data-descriptor"] !== undefined)
        {
            let i = parseInt(e.target.attributes["data-descriptor"].value)

            if (e.target.attributes["data-action"].value == "open")
                this.openFile(this.fileBag.descriptors[i])

            if (e.target.attributes["data-action"].value == "remove")
                this.removeFile(this.fileBag.descriptors[i])
        }
    }

    /**
     * Handles openning of a file
     */
    openFile(descriptor)
    {
        this.app.file = File.deserialize(this.fileBag.loadFile(descriptor))

        // swicth pages
        this.hide()
        this.app.pages.transaction.show()
    }

    /**
     * Handles creation of a new file
     */
    createFile()
    {
        // DEBUG

        let d = this.fileBag.addDescriptor("New file", "local", "file.new-file")
        this.fileBag.saveDescriptors()
        
        let file = new File()
        this.fileBag.saveFile(d, file.serialize())

        this.refreshFileList()
    }

    /**
     * Removes a file from the list of descriptors and deletes it
     */
    removeFile(descriptor)
    {
        this.fileBag.removeFile(descriptor)
        this.refreshFileList()
    }
}

module.exports = FilePage