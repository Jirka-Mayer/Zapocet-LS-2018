const ITEMS = [
    {
        name: "transactions",
        title: "Transactions"
    }
]

class Menu
{
    constructor(element, activeItem)
    {
        /**
         * Menu items
         */
        this.items = ITEMS

        /**
         * Root html element
         */
        this.element = element

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

            <a data-name="closeFile">Save and close file</a>
        `
    }

    /**
     * Handle click on an item
     */
    handleClick(e)
    {
        let name = e.target.getAttribute("data-name")

        if (name = "closeFile")
        {
            // handle extra
            return
        }

        // handle default...
    }
}

module.exports = Menu