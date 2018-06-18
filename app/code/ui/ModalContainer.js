const cssClass = require("../utils/cssClass.js")

const BASE_Z_INDEX = 1000
const Z_INDEX_SPACING = 10

/**
 * Contains instances of all openned modals
 */
class ModalContainer
{
    constructor(document, element)
    {
        this.document = document

        /**
         * Root html element
         */
        this.element = element

        /**
         * List of openned modals
         */
        this.modals = []

        // set a css class
        cssClass(this.element, "modal-container", true)
    }

    /**
     * Returns true if any modals are open
     */
    isVisible()
    {
        return this.modals.length > 0
    }

    /**
     * Updates visibility and z-indices
     * (not actual children, that's done during show/close)
     */
    refresh()
    {
        this.element.style.display = this.isVisible() ? "block" : "none"

        for (let i = 0; i < this.modals.length; i++)
            this.modals[i].element.style["z-index"] = BASE_Z_INDEX + (i + 1) * Z_INDEX_SPACING
    }

    /**
     * Display a new modal
     */
    show(modalInstance)
    {
        modalInstance.initialize(this.document, () => {
            this.closeModal(modalInstance)
        })

        this.modals.push(modalInstance)
        this.element.appendChild(modalInstance.element)

        this.refresh()

        // call the hook
        modalInstance.modalDidMount()
    }

    /**
     * Handles closing of a modal
     */
    closeModal(modalInstance)
    {
        let index = this.modals.indexOf(modalInstance)

        if (index == -1)
            return

        this.modals.splice(index, 1)
        this.element.removeChild(modalInstance.element)

        this.refresh()
    }
}

module.exports = ModalContainer