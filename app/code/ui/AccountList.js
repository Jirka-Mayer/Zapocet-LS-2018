const cssClass = require("../utils/cssClass.js")
const HtmlEntities = require("../utils/HtmlEntities.js")
const AmountFormatter = require("./AmountFormatter.js")

class AccountList
{
    constructor(file, element, editAccount, removeAccount, synchronizeAccount)
    {
        this.file = file

        this.element = element

        cssClass(this.element, "table", true)

        this.editAccount = editAccount
        this.removeAccount = removeAccount
        this.synchronizeAccount = synchronizeAccount
    }

    refresh()
    {
        let html = `
            <tr>
                <th style="white-space: nowrap">Account</th>
                <th style="white-space: nowrap">Initial amount</th>
                <th style="white-space: nowrap">Synchronize account</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        `

        for (let i = 0; i < this.file.accounts.length; i++)
        {
            let account = this.file.accounts[i]

            html += `
                <tr>
                    <td style="white-space: nowrap">
                        <b>${HtmlEntities.escape(account.title)}</b>
                    </td>
                    <td style="white-space: nowrap">
                        ${AmountFormatter.format(account.initialAmount)}
                    </td>
                    <td style="text-align: center">
                        <button
                            style="display: inline-block"
                            class="icon-button"
                            data-action="sync"
                            data-account-id="${account.id}"
                        ><span class="icon-globe"></span></button>
                    </td>
                    <td style="width: 100%"></td>
                    <td>
                        <button
                            class="icon-button"
                            data-action="remove"
                            data-account-id="${account.id}"
                        ><span class="icon-trash"></span></button>
                    </td>
                    <td>
                        <button
                            class="icon-button"
                            data-action="edit"
                            data-account-id="${account.id}"
                        ><span class="icon-edit"></span></button>
                    </td>
                </tr>
            `
        }

        this.element.innerHTML = html

        // register event listeners
        this.element.querySelectorAll("button").forEach(
            x => x.addEventListener("click", () => {
                this.clickHandler(x)
            })
        )
    }

    /**
     * Handles clicks on action buttons
     */
    clickHandler(target)
    {
        let action = target.getAttribute("data-action")
        let id = target.getAttribute("data-account-id")

        switch (action)
        {
            case "edit":
                this.editAccount(id)
                break

            case "remove":
                this.removeAccount(id)
                break

            case "sync":
                this.synchronizeAccount(id)
                break
        }
    }
}

module.exports = AccountList