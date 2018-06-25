const packager = require("electron-packager")
const path = require("path")

packager({
    arch: "ia32",
    name: "Zapocet_LS-2018_Jiri_Mayer",
    dir: path.join(__dirname, ".."),
    platform: "win32",
    asar: true,
    overwrite: true,
    out: path.join(__dirname, "../out"),
    //icon: path.join(__dirname, "../app/icon.ico"),
    "version-string": {
        ProductName: "Zapocet LS-2018",
        CompanyName: "Jiří Mayer"
    }
}, (err, appPath) => {
    if (err) {
        console.log(err)
    }
})