/**
 * Enables or disables a css class on an element
 */
function cssClass(element, cssClass, enable)
{
    let newClasses = ""
    let found = false

    for (let i = 0; i < element.classList.length; i++)
    {
        if (element.classList[i] == cssClass)
        {
            found = true

            if (enable)
                newClasses += element.classList[i] + " "
        }
        else
        {
            newClasses += element.classList[i] + " "
        }
    }

    if (!found && enable)
        newClasses += cssClass

    element.className = newClasses
}

module.exports = cssClass