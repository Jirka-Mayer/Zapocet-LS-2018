/**
 * Clamp a value between two bounds
 */
function clamp(x, min, max)
{
    if (x < min)
        return min
    else if (x > max)
        return max
    else
        return x
}

module.exports = clamp