const SubmitModal = require("./SubmitModal.js")
const TextField = require("./TextField.js")

class PromptModal extends SubmitModal
{
    constructor(title, label, initialText, submitCallback, cancelCallback)
    {
        super(title, submitCallback, cancelCallback)

        this.label = label
        this.initialText = initialText
    }

    contents()
    {
        return `
            <div ref="text" style="display: block"></div>
        `
    }

    modalDidMount()
    {
        super.modalDidMount()

        this.refs.text = new TextField(this.refs.text, this.label)
        this.refs.text.value = this.initialText

        this.refs.text.focus()
        this.refs.text.onSubmit = this.submit.bind(this)
    }

    returns()
    {
        return [this.refs.text.value || ""]
    }
}

module.exports = PromptModal