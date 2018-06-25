const cssClass = require("../utils/cssClass.js")
const DateFormatter = require("./DateFormatter.js")
const AmountFormatter = require("./AmountFormatter.js")
const HtmlEntities = require("../utils/HtmlEntities.js")

class TransactionList
{
    constructor(element, removeTransaction, editTransaction)
    {
        /**
         * Root html element
         */
        this.element = element

        cssClass(this.element, "table", true)

        // listeners
        this.removeTransaction = removeTransaction
        this.editTransaction = editTransaction
    }

    /**
     * Updates DOM
     */
    refresh(transactions)
    {
        let html = ""

        // reversed, latest transactions on top
        for (let i = transactions.length - 1; i >= 0; i--)
        {
            let t = transactions[i]

            let color = t.amount >= 0 ? "#bd2e2e" : "#3c733c"

            let content = HtmlEntities.escape(t.title || "")

            if (t.isSynchronizing())
                content = `<b>Sync</b>`

            if (t.description)
                content += `
                    <br>
                    <i style="font-size: 80%;">
                        ${HtmlEntities.escape(t.description)}
                    </i>
                `

            html += `
                <tr>
                    <td style="white-space: nowrap">
                        ${DateFormatter.format(t.date)}
                    </td>
                    <td style="white-space: nowrap; color: ${color};">
                        <b>${AmountFormatter.format(Math.abs(t.amount))}</b>
                    </td>
                    <td style="width: 100%">
                        ${content}
                    </td>
                    <td>
                        <button
                            class="icon-button"
                            data-action="remove"
                            data-transaction-id="${t.id}"
                        ><span class="icon-trash"></span></button>
                    </td>
                    <td>
                        <button
                            class="icon-button"
                            data-action="edit"
                            data-transaction-id="${t.id}"
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
        let id = target.getAttribute("data-transaction-id")

        switch (action)
        {
            case "edit":
                this.editTransaction(id)
                break

            case "remove":
                this.removeTransaction(id)
                break
        }
    }
}

module.exports = TransactionList