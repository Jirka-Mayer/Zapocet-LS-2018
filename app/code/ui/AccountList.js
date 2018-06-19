class AccountList
{
    constructor(file, element, editAccount, removeAccount)
    {
        this.file = file

        this.element = element

        this.editAccount = editAccount
        this.removeAccount = removeAccount
    }

    refresh()
    {
        let html = ""

        for (let i = 0; i < this.file.accounts.length; i++)
        {
            let account = this.file.accounts[i]

            html += `
                <div>
                    <b>${account.title}</b>
                    ${account.initialAmount}

                    <button
                        data-action="edit"
                        data-account-id="${account.id}"
                    >Edit</button>

                    <button
                        data-action="remove"
                        data-account-id="${account.id}"
                    >Remove</button>
                </div>
            `
        }

        this.element.innerHTML = html

        // register event listeners
        this.element.querySelectorAll("button").forEach(
            x => x.addEventListener("click", this.clickHandler.bind(this))
        )
    }

    /**
     * Handles clicks on action buttons
     */
    clickHandler(e)
    {
        let action = e.target.getAttribute("data-action")
        let id = e.target.getAttribute("data-account-id")

        switch (action)
        {
            case "edit":
                this.editAccount(id)
                break

            case "remove":
                this.removeAccount(id)
                break
        }
    }
}

module.exports = AccountList