// handle squirrel events
if (require("electron-squirrel-startup"))
    return

const {app, BrowserWindow} = require("electron")
const path = require("path")
const url = require("url")

// global window reference
let win

function createWindow()
{
    win = new BrowserWindow({
        width: 800, // or 1200x600
        height: 600,

        /*
            ICON NOT NEEDED YET

        // .ico on windows, .png otherwise
        icon: /^win/.test(process.platform) ?
            path.join(__dirname, "../icon.ico") :
            path.join(__dirname, "../icon.png")
        */
    })

    // main window
    win.loadURL(url.format({
        pathname: path.join(__dirname, "./window.html"),
        protocol: "file:",
        slashes: true
    }))

    // Open the DevTools
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on("closed", () => {
        // free up memory
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin")
        app.quit()
})

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null)
        createWindow()
})