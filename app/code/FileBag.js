const LocalStorageDriver = require("./file-drivers/LocalStorageDriver.js")

// key for storing list of file descriptors
const LOCAL_STORAGE_KEY = "file-bag"

/*
    Descriptor structure: 
    {
        title: "Human-readable file title",
        driver: "storage driver", // local, filesystem, google-drive, ...
        id: "/driver-specific/file-identifier.dat"
    }
*/

class FileBag
{
    constructor(localStorage)
    {
        /**
         * List of file descriptors
         */
        this.descriptors = []

        /**
         * Local storage instance
         * @type {Storage}
         */
        this.localStorage = localStorage

        /**
         * Available storage drivers
         */
        this.drivers = {
            "local": new LocalStorageDriver(this.localStorage),
            "filesystem": null,
            "google-drive": null
        }

        this.loadDescriptors()
    }

    /**
     * Load bag contents
     */
    loadDescriptors()
    {
        this.descriptors = []

        let data = this.localStorage[LOCAL_STORAGE_KEY]

        if (typeof(data) == "string")
            data = JSON.parse(data)
        
        if (!(data instanceof Array))
            data = []

        for (let i = 0; i < data.length; i++)
            this.addDescriptor(data[i].title, data[i].driver, data[i].id)
    }

    /**
     * Saves bag contents
     */
    saveDescriptors()
    {
        this.localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(this.descriptors)
    }

    /**
     * Adds a file descriptor into the list of descriptors
     */
    addDescriptor(title, driver, id)
    {
        // TODO: if already exists, throw an error

        let d = {
            title: title,
            driver: driver, // or google drive, ...
            id: id // driver specific file identifier
        }

        this.descriptors.push(d)
        return d
    }

    /**
     * Returns file string of a given descriptor
     */
    loadFile(descriptor)
    {
        return this.drivers[descriptor.driver].getFile(descriptor.id)
    }

    /**
     * Stores a file string into a location given by a descriptor
     */
    saveFile(descriptor, contents)
    {
        this.drivers[descriptor.driver].storeFile(
            descriptor.id,
            contents
        )
    }

    /**
     * Removes file from bag and deletes it in the storage
     */
    removeFile(descriptor)
    {
        // remove descriptor
        for (let i = 0; i < this.descriptors.length; i++)
        {
            if (this.descriptors[i].driver == descriptor.driver
                && this.descriptors[i].id == descriptor.id)
            {
                this.descriptors.splice(i, 1)
                break
            }
        }

        // remove file
        this.drivers[descriptor.driver].removeFile(descriptor.id)

        this.saveDescriptors()
    }

    /**
     * Returns variation of the ideal ID that is unique among existing IDs
     */
    uniqueId(idealId)
    {
        // if unique already
        if (this.descriptors.filter(x => x.id == idealId).length == 0)
            return idealId

        // add a number at the end
        let counter = 2
        while (this.descriptors.filter(x => x.id == idealId + "-" + counter).length > 0)
            counter++

        return idealId + "-" + counter
    }
}

module.exports = FileBag