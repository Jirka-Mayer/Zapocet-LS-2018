const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")
const AccountPicker = require("../ui/AccountPicker.js")
const AccountList = require("../ui/AccountList.js")
const AccountDetailModal = require("../ui/AccountDetailModal.js")

class AccountPage extends Page
{
    constructor(app)
    {
        super(app)

        this.menu = new Menu(this.app, this.refs.menu, "overview")

        this.accountList = new AccountList(
            this.app.file,
            this.refs.accountList,
            this.editAccount.bind(this),
            this.removeAccount.bind(this)
        )

        this.refs.defaultAccount = new AccountPicker(this.app.file, this.refs.defaultAccount)
        this.refs.defaultAccount.selectDefault()

        this.refs.defaultAccount.onChange(this.handleDefaultAccountChange.bind(this))

        this.accountList.refresh()
    }

    template()
    {
        return `
            <div ref="menu"></div>
            <h1>Account page</h1>

            <label>Default account:</label>
            <select ref="defaultAccount"></select>

            <div ref="accountList"></div>
        `
    }

    handleDefaultAccountChange()
    {
        this.app.file.setDefaultAccount(this.refs.defaultAccount.value)
    }

    editAccount(id)
    {
        this.app.modals.show(
            new AccountDetailModal(
                this.app.file.getAccount(id),
                this.app.file,
                () => {
                    this.accountList.refresh()
                },
                () => {}
            )
        )
    }

    removeAccount(id)
    {
        if (!confirm("Deleting an account will remove associated transactions."))
            return

        this.app.file.removeAccount(id)

        this.app.file.transactions = this.app.file.transactions.filter(
            x => x.id != id
        )
        
        this.accountList.refresh()
    }

    createAccount()
    {
        let account = this.app.file.createAccount("New account", 0)

        this.app.modals.show(
            new AccountDetailModal(
                account,
                this.app.file,
                () => {
                    this.accountList.refresh()
                },
                () => {
                    this.app.file.removeAccount(account)
                }
            )
        )
    }
}

module.exports = AccountPage