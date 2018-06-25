const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")
const AccountPicker = require("../ui/AccountPicker.js")
const AccountList = require("../ui/AccountList.js")
const AccountDetailModal = require("../ui/AccountDetailModal.js")
const AccountSynchronizationModal = require("../ui/AccountSynchronizationModal.js")
const TransactionPage = require("./TransactionPage.js")

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
            this.removeAccount.bind(this),
            this.synchronizeAccount.bind(this)
        )

        this.refs.defaultAccount = new AccountPicker(this.refs.defaultAccount, "Account:", this.app.file)
        this.refs.defaultAccount.selectDefault()

        this.refs.defaultAccount.onChange(this.handleDefaultAccountChange.bind(this))

        this.refs.createAccountButton.addEventListener(
            "click", this.createAccount.bind(this)
        )

        this.accountList.refresh()
    }

    template()
    {
        return `
            <div ref="menu"></div>
            <div class="page-container account-page">
                <h3 class="heading">Default account:</h3>
                <div ref="defaultAccount" class="default-account"></div>

                <h3 class="heading">All accounts:</h3>
                <table ref="accountList"></table>

                <div class="account-page-actions">
                    <button ref="createAccountButton" class="button big">Create new account</button>
                </div>
            </div>
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
                () => {
                    this.accountList.refresh()
                    this.refs.defaultAccount.refreshOptions()
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
            x => x.account.id != id
        )
        
        this.accountList.refresh()
        this.refs.defaultAccount.refreshOptions()
    }

    synchronizeAccount(id)
    {
        let account = this.app.file.getAccount(id)

        this.app.modals.show(
            new AccountSynchronizationModal(
                account,
                this.app.file,
                (transaction) => {
                    let page = this.app.gotoPage(TransactionPage)
                    page.editTransaction(transaction)
                }
            )
        )
    }

    createAccount()
    {
        let account = this.app.file.createAccount("New account", 0)

        this.app.modals.show(
            new AccountDetailModal(
                account,
                () => {
                    this.accountList.refresh()
                    this.refs.defaultAccount.refreshOptions()
                },
                () => {
                    this.app.file.removeAccount(account)
                }
            )
        )
    }
}

module.exports = AccountPage