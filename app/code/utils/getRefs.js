/**
 * Return an object of all refs in a given element
 *
 * Ref is an element with the ref="..." tag
 */
function getRefs(element)
{
    let refs = {}
    let elements = element.querySelectorAll('[ref]')

    for (let i = 0; i < elements.length; i++)
        refs[elements[i].getAttribute("ref")] = elements[i]

    return refs
}

module.exports = getRefs