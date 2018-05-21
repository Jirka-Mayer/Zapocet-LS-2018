const LOCAL_STORAGE_FILE_PREFIX = "local-file."

class LocalStorageDriver
{
    constructor(localStorage)
    {
        /**
         * Local storage instance
         * @type {Storage}
         */
        this.localStorage = localStorage
    }

    getFile(id)
    {
        return this.localStorage[LOCAL_STORAGE_FILE_PREFIX + id]
    }

    storeFile(id, contents)
    {
        this.localStorage[LOCAL_STORAGE_FILE_PREFIX + id] = contents
    }

    removeFile(id)
    {
        delete this.localStorage[LOCAL_STORAGE_FILE_PREFIX + id]
    }
}

module.exports = LocalStorageDriver