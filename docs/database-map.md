# Transactions

- ID (key, autoincrement)
- Date (no timezone, no time)
- Account (account id - a relation)
- Amount (signed int)
- Title (shorter string)
- Description (longer optional string)

## Transaction ordering:

1) Date
2) ID (insertion order)

## Synchronizing transactions

Have title equal to `:sync:`.

# Accounts

- ID (key, autoincrement)
- Title
- Initial amount

# Meta

Stores additional unstructured metadata like default settings.

- Key (string)
- Value (text)

Key namespacing:
    
    settings.default-account

Value should be encoded as JSON.
