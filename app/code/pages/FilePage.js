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

        // DEBUG
        setTimeout(() => {
            this.openFile(this.fileBag.descriptors[0])
        }, 10)
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