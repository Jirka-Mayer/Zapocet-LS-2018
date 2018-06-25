let mix = require("laravel-mix")

mix.stylus(
    "app/assets/stylus/window.styl",
    "app/electron/resources/window.css"
)

mix.stylus(
    "app/assets/stylus/application.styl",
    "app/electron/resources/application.css"
)

mix.copyDirectory("app/assets/icons", "app/electron/resources/icons")
mix.copy("app/assets/fonts/Roboto-Regular.ttf", "app/electron/resources/Roboto-Regular.ttf")
mix.copy("app/assets/fonts/roboto.css", "app/electron/resources/roboto.css")

// build javascript for browsers
// (electron uses js code directly)
mix.js("app/code/Application.js", "app/electron/resources/application.js")

// mix settings
mix.setPublicPath(".")