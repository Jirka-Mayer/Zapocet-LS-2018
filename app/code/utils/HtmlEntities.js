class HtmlEntities
{
    static escape(str)
    {
        return str
            .replace(/\&/g, "&amp;")
            .replace(/\>/g, "&gt;")
            .replace(/\</g, "&lt;")
    }
}

module.exports = HtmlEntities