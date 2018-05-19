
/**
 * Adds default option values to a provided options object
 */
function defaultOptions(options, defOptions)
{
    if (options === undefined)
        options = {}

    for (o in defOptions)
    {
        if (options[o] === undefined)
            options[o] = defOptions[o]
    }

    return options
}

module.exports = defaultOptions