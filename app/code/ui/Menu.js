const cssClass = require("../utils/cssClass.js")

const ITEMS = [
    {
        name: "transactions",
        title: "Transactions"
    },
    {
        name: "overview",
        title: "Overview"
    }
]

function resolvePageConstructor(name)
{
    return {
        "overview": require("../pages/OverviewPage.js"),
        "transactions": require("../pages/TransactionPage.js")
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
            <div>
                ${itemsHtml}
            </div>

            <a class="menu-item" data-name="closeFile">Save and close file</a>
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
            // handle file closing and saving and other stuff
            // probbably via app.closeFile() or simmilar

            return
        }

        this.app.gotoPage(page)
    }
}

module.exports = Menu