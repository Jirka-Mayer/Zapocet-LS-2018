const cssClass = require("../utils/cssClass.js")

class TransactionList
{
    constructor(element, removeTransaction, editTransaction)
    {
        /**
         * Root html element
         */
        this.element = element

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

        for (let i = 0; i < transactions.length; i++)
        {
            let t = transactions[i]

            html += `
                <div>
                    <b>${t.amount}</b>
                    ${t.title}
                    <button
                        data-action="edit"
                        data-transaction-id="${t.id}"
                    >Edit</button>
                    <button
                        data-action="remove"
                        data-transaction-id="${t.id}"
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