let mix = require("laravel-mix")

mix.stylus(
    "app/assets/stylus/window.styl",
    "app/electron/resources/window.css"
)

mix.stylus(
    "app/assets/stylus/application.styl",
    "app/electron/resources/application.css"
)

/*
    COPY FONTS

mix.copyDirectory(
    "app/assets/fonts/fira-code",
    "app/electron/resources/fira-code"
)
*/

// build javascript for browsers
// (electron uses js code directly)
mix.js("app/code/Application.js", "app/electron/resources/application.js")

// mix settings
mix.setPublicPath(".")