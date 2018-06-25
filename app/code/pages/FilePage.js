const Page = require("./Page.js")
const FileBag = require("../FileBag.js")
const File = require("../File.js")
const TransactionPage = require("./TransactionPage.js")
const PromptModal = require("../ui/PromptModal.js")
const slug = require("../utils/slug.js")
const HtmlEntities = require("../utils/HtmlEntities.js")

class FilePage extends Page
{
    constructor(app, container)
    {
        super(app, container)

        this.fileBag = new FileBag(app.window.localStorage)

        this.refreshFileList()

        this.refs.createFileButton.addEventListener(
            "click", this.createFile.bind(this))

        this.refs.createTestFileButton.addEventListener(
            "click", this.createTestFile.bind(this))
    }

    template()
    {
        return `
            <div class="page-container">

                <div class="app-welcome">
                    <h1>Zápočtový program</h1>
                    <h2>Letní semestr 2018 - Jiří Mayer</h2>
                </div>

                <h3 class="heading">Files:</h3>
                <table class="table" ref="fileList"></table>

                <div class="file-page-actions">
                    <button ref="createFileButton" class="button big">Create new file</button>
                    <button ref="createTestFileButton" class="button big">Create test file</button>
                </div>
            </div>
        `
    }

    /**
     * Refreshes list of files (DOM)
     */
    refreshFileList()
    {
        let html = ""

        if (this.fileBag.descriptors.length == 0)
            html = `
                <tr>
                    <th style="text-align: center">No files</th>
                </tr>
            `

        for (let i = 0; i < this.fileBag.descriptors.length; i++)
        {
            html += `
                <tr>
                    <td style="width: 100%">
                        <span
                            class="clickable-text action"
                            data-descriptor="${i}"
                            data-action="open"
                        >
                            ${HtmlEntities.escape(this.fileBag.descriptors[i].title)}
                        </span>
                    </td>
                    <td>
                        <button
                            class="icon-button action"
                            data-descriptor="${i}"
                            data-action="remove"
                        >
                            <span class="icon-trash"></span>
                        </button>
                    </td>
                    <td>
                        <button
                            class="icon-button action"
                            data-descriptor="${i}"
                            data-action="rename"
                        >
                            <span class="icon-edit"></span>
                        </button>
                    </td>
                </tr>
            `
        }

        this.refs.fileList.innerHTML = html

        // register event listeners
        this.refs.fileList.querySelectorAll(".action").forEach(
            x => x.addEventListener("click", () => {
                this.clickHandler(x)
            })
        )
    }

    clickHandler(target)
    {
        let action = target.getAttribute("data-action")
        let i = parseInt(target.getAttribute("data-descriptor"))

        switch (action)
        {
            case "open":
                this.openFile(this.fileBag.descriptors[i])
                break

            case "remove":
                this.removeFile(this.fileBag.descriptors[i])
                break

            case "rename":
                this.renameFile(this.fileBag.descriptors[i])
                break
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
     * Changes title of a descriptor via a modal
     */
    renameFile(descriptor)
    {
        this.app.modals.show(
            new PromptModal(
                "Change file title",
                "File title:",
                descriptor.title,
                (newTitle) => {
                    descriptor.title = newTitle

                    this.fileBag.saveDescriptors()
                    this.refreshFileList()
                },
                null
            )
        )
    }

    /**
     * Handles creation of a new file
     */
    createFile()
    {
        this.app.modals.show(
            new PromptModal(
                "Create new file",
                "File title:",
                "New file",
                (fileTitle) => {
                    let idealId = "file." + slug(fileTitle)
                    let id = this.fileBag.uniqueId(idealId)
                    let d = this.fileBag.addDescriptor(fileTitle, "local", id)
                    this.fileBag.saveDescriptors()
                    
                    let file = new File()

                    this.fileBag.saveFile(d, file.serialize())

                    this.refreshFileList()
                },
                null
            )
        )
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
        let fileTitle = "Test file"
        let idealId = "file." + slug(fileTitle)
        let id = this.fileBag.uniqueId(idealId)
        let d = this.fileBag.addDescriptor(fileTitle, "local", id)
        this.fileBag.saveDescriptors()
        
        let file = new File()

        // accounts
        let cash = file.getDefaultAccount()
        let bank = file.createAccount("Bank", 0)

        cash.initialAmount = 21200
        bank.initialAmount = 10563

        /*
            Transakce jsou vybrané záznamy z reálných dat.
         */
        
        // transactions
        file.createTransaction("2015-10-07", cash, -8, "Kantýna", "1 Rohlík")
        file.createTransaction("2015-10-12", cash, -30, "Vlak")
        file.createTransaction("2015-10-24", cash, -62, ":sync:")
        file.createTransaction("2015-11-04", bank, -750, "Poplatek za zkoušky z autoškoly")
        file.createTransaction("2015-11-26", cash, -171, "DOD Matfyz vlak")
        file.createTransaction("2015-12-04", cash, -160, "Maturitní ples")
        file.createTransaction("2015-12-18", cash, -54, "Vlak do Pardubic")
        file.createTransaction("2016-02-05", cash, -69, "Baterky AAA")
        file.createTransaction("2016-03-14", cash, -11, "Autobus")
        file.createTransaction("2016-03-15", cash, -100, "Divadlo")
        file.createTransaction("2017-01-15", bank, -590, "Přihláška na MFF")
        file.createTransaction("2017-01-16", cash, -20, "Doprava")
        file.createTransaction("2017-01-17", cash, -52, "Doprava na krajské kolo MO-P")
        file.createTransaction("2017-02-16", cash, -88, "Oběd na Fyziklání")
        file.createTransaction("2017-03-01", cash, -21, "Doprava")
        file.createTransaction("2017-03-01", cash, -20, "Kantýna")
        file.createTransaction("2017-03-01", cash, 48, "Proplacení jízdenek na Fyziklání", "Od školy")
        file.createTransaction("2017-03-02", cash, -20, "Doprava")
        file.createTransaction("2017-03-03", cash, -20, "Doprava")
        file.createTransaction("2017-05-10", cash, 400, "Doučování", "Fyzika")

        this.fileBag.saveFile(d, file.serialize())
        this.refreshFileList()
    }
}

module.exports = FilePage