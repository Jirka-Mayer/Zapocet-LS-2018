const Page = require("./Page.js")
const FileBag = require("../FileBag.js")
const File = require("../File.js")
const TransactionPage = require("./TransactionPage.js")

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

        this.refs.createTestFileButton.addEventListener(
            "click", this.createTestFile.bind(this))

        // DEBUG
        /*setTimeout(() => {
            this.openFile(this.fileBag.descriptors[0])
        }, 10)*/
    }

    template()
    {
        return `
            <div class="page-container">
                <h3 class="heading">Files:</h3>
                <table class="table" ref="fileList"></table>
                <button ref="createFileButton" class="button">Create new file</button>
                <button ref="createTestFileButton" class="button">Create test file</button>
            </div>
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
                <tr>
                    <td style="width: 100%">
                        <span
                            class="clickable-text"
                            data-descriptor="${i}"
                            data-action="open"
                        >
                            ${this.fileBag.descriptors[i].title}
                        </span>
                    </td>
                    <td>
                        <button class="icon-button" data-descriptor="${i}" data-action="remove">
                            <span class="icon-trash"></span>
                        </button>
                    </td>
                    <td>
                        <button class="icon-button" data-descriptor="${i}" data-action="rename">
                            <span class="icon-edit"></span>
                        </button>
                    </td>
                </tr>
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
        this.app.fileDescriptor = descriptor

        this.app.gotoPage(TransactionPage)
    }

    /**
     * Handles creation of a new file
     */
    createFile()
    {
        let d = this.fileBag.addDescriptor("New file", "local", "file.new-file")
        this.fileBag.saveDescriptors()
        
        let file = new File()

        this.fileBag.saveFile(d, file.serialize())

        this.refreshFileList()
    }

    /**
     * Saves a file to a descriptor
     */
    saveFile(descriptor, file)
    {
        this.fileBag.saveFile(descriptor, file.serialize())

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

    /**
     * Creates file for testing
     */
    createTestFile()
    {
        let d = this.fileBag.addDescriptor("Test file", "local", "file.test-file")
        this.fileBag.saveDescriptors()
        
        let file = new File()

        // accounts
        let cash = file.getDefaultAccount()
        let bank = file.createAccount("Bank", 0)
        
        // transactions
        file.createTransaction("2018-06-11", cash, -106, "Doprava")
        file.createTransaction("2018-06-12", cash, -45, "Nákup")
        file.createTransaction("2018-06-13", cash, 5000, "Webovky")
        file.createTransaction("2018-06-14", cash, 12, ":sync:")
        file.createTransaction("2018-06-15", bank, 45, ":sync:")
        file.createTransaction("2018-06-16", bank, 5, "Úroky")

        this.fileBag.saveFile(d, file.serialize())
        this.refreshFileList()
    }
}

module.exports = FilePage