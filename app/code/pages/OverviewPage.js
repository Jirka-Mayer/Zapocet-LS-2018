const Page = require("./Page.js")
const Menu = require("../ui/Menu.js")

class OverviewPage extends Page
{
    constructor(app)
    {
        super(app)

        this.menu = new Menu(this.app, this.refs.menu, "overview")
    }

    template()
    {
        return `
            <div ref="menu"></div>
            <h1>Overview page</h1>
        `
    }
}

module.exports = OverviewPage