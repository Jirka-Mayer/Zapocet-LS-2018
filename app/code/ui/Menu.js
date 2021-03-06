const cssClass = require("../utils/cssClass.js")

const ITEMS = [
    {
        name: "transactions",
        title: "Transactions"
    },
    {
        name: "overview",
        title: "Overview"
    },
    {
        name: "account",
        title: "Accounts"
    }
]

function resolvePageConstructor(name)
{
    return {
        "overview": require("../pages/OverviewPage.js"),
        "transactions": require("../pages/TransactionPage.js"),
        "account": require("../pages/AccountPage.js")
    }[name]
}

class Menu
{
    constructor(app, element, activeItem)
    {
        this.app = app

        /**
         * Menu items
         */
        this.items = ITEMS

        /**
         * Root html element
         */
        this.element = element

        cssClass(this.element, "menu", true)
        this.element.innerHTML = this.template()

        // event listeners
        this.element.querySelectorAll("a").forEach(
            x => x.addEventListener("click", this.handleClick.bind(this))
        )
    }

    template()
    {
        let itemsHtml = ""

        for (let i = 0; i < this.items.length; i++)
        {
            itemsHtml += `
                <a
                    class="menu-item"
                    data-name="${this.items[i].name}"
                >
                    ${this.items[i].title}
                </a>
            `
        }

        return `
            <nav class="menu-wrapper">
                ${itemsHtml}
                <a class="menu-item" data-name="closeFile">Close file</a>
            </nav>
        `
    }

    /**
     * Handle click on an item
     */
    handleClick(e)
    {
        let name = e.target.getAttribute("data-name")

        // lazily later to avoid circular dependency
        let page = resolvePageConstructor(name)

        if (name == "closeFile")
        {
            this.app.saveAndCloseFile()
            return
        }

        this.app.gotoPage(page)
    }
}

module.exports = Menu