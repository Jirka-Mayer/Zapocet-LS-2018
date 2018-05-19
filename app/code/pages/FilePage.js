const Page = require("./Page.js")
const FileBag = require("../FileBag.js")
const File = require("../File.js")

class FilePage extends Page
{
    constructor(app, container)
    {
        super(app, container)

        this.fileBag = new FileBag()

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
                    <button data-descriptor="` + i + `">Open</button>
                </li>
            `
        }

        this.refs.fileList.innerHTML = html
    }

    onFileListClick(e)
    {
        if (e.target.attributes["data-descriptor"] !== undefined)
            this.openFile(this.fileBag.descriptors[
                parseInt(e.target.attributes["data-descriptor"].value)
            ])
    }

    /**
     * Handles openning of a file
     */
    openFile(descriptor)
    {
        let file = new File()
        file.load(this.fileBag.loadFile(descriptor))
    }

    /**
     * Handles creation of a new file
     */
    createFile()
    {
        // DEBUG

        let d = this.fileBag.addDescriptor("New file", "local", "file.new-file")
        
        let file = new File()
        this.fileBag.saveFile(d, file.serialize())

        this.refreshFileList()
    }
}

module.exports = FilePage