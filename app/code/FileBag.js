const LocalFileStorage = require("./file-storage/LocalFileStorage.js")

class FileBag
{
    constructor()
    {
        /**
         * List of file descriptors
         */
        this.descriptors = []

        this.storages = {
            "local": new LocalFileStorage(),
            "filesystem": null,
            "google-drive": null
        }

        this.load()
    }

    /**
     * Load bag contents
     */
    load()
    {
        // TODO: load descriptors from local storage

        // DEBUG
        this.addDescriptor("Sample file", "local", "file.sample-file")
    }

    /**
     * Adds a file descriptor into the list of descriptors
     */
    addDescriptor(title, storage, fileIdentifier)
    {
        // TODO: if already exists, throw an error

        let d = {
            title: title,
            storage: storage, // or google drive, ...
            fileIdentifier: fileIdentifier // storage specific file identifier
        }

        this.descriptors.push(d)
        return d
    }

    /**
     * Returns file string of a given descriptor
     */
    loadFile(descriptor)
    {
        this.storages[descriptor.storage].getFile(descriptor.fileIdentifier)
    }

    /**
     * Stores a file string into a location given by a descriptor
     */
    saveFile(descriptor, fileString)
    {
        this.storages[descriptor.storage].storeFile(
            descriptor.fileIdentifier,
            fileString
        )
    }
}

module.exports = FileBag