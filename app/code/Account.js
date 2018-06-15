class Account
{
    constructor(id, title, initialAmount)
    {
        /**
         * Unique ID of the account
         */
        this.id = id

        /**
         * Title of the account
         */
        this.title = title

        /**
         * Initial amount of money on the account
         */
        this.initialAmount = initialAmount
    }

    /**
     * Returns serialization in the form of a javascript object
     */
    serialize()
    {
        return {
            id: this.id,
            title: this.title,
            initialAmount: this.initialAmount
        }
    }

    /**
     * Creates an instance from serialized data
     */
    static deserialize(data)
    {
        return new Account(
            data.id,
            data.title,
            data.initialAmount
        )
    }
}

module.exports = Account