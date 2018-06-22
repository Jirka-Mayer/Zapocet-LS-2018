const cssClass = require("../utils/cssClass.js")

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

            html += `
                <tr>
                    <td style="white-space: nowrap">
                        ${t.date.format("YYYY-MM-DD")}
                    </td>
                    <td>
                        <b>${t.amount}</b>
                    </td>
                    <td style="width: 100%">
                        ${t.title}
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
            x => x.addEventListener("click", this.clickHandler.bind(this))
        )
    }

    /**
     * Handles clicks on action buttons
     */
    clickHandler(e)
    {
        let action = e.target.getAttribute("data-action")
        let id = e.target.getAttribute("data-transaction-id")

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