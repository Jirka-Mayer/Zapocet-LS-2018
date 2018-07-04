# File

Třída obsahuje data jednoho souboru. Zajišťuje jejich serializaci a deserializaci, jejich úpravu a správný formát.

Neřeší, kde, nebo jak je uložený soubor samotný, ani jak se jmenuje. To má na starost pro všechny soubory třída `FileBag` popsaná níže.


## Vlastnosti


### `accounts`

Seznam všech účtů, tedy `array` s položkami typu `Account`. Jejich pořadí je libovolné.


### `transactions`

Seznam transakcí, `array` s položkami `Transaction`. Jsou udržovány seřazené podle data od nejstarší na indexu 0, po nejmladší. Transakce se stejným datem jsou řazeny dle jejich `id` vzestupně. Při změně data transakce je třeba opravit její pořadí zavoláním metody `file.repairTransactionOrder(transaction)`.


### `meta`

Obyčejný javascriptový objekt, který pod textovým klíčem ukládá libovolnou hodnotu. Je určený pro ukládání drobných metadat o souboru.

- `"accounts.next-id"` ID dalšího vytvořeného účtu
- `"transactions.next-id"` ID další vytvořené transakce
- `"settings.default-account"` výchozí účet


## Metody


### `serialize(); static deserialize(stringData)`

Metody pro serializaci souboru jako textový řetězec pro ukládání.

První řádek serializovaného souboru je hlavička. Ta obsahuje verzi souboru. Při načtení starší verze souboru je tak možné provést konverzi do novější (do budoucna; teď neumí).

Co náselduje za hlavičkou záleží na verzi. V současnosti je tam ale obsah souboru serializovaný jako JSON.


### `createAccount(...); removeAccount(id); getAccount(id)`

Vytváření a mazání účtů, získání instance účtu z jeho id.

> Mazání účtu nesmaže jeho transakce. To se musí provést dodatečně, je-li třeba.


### `createTransaction(...); removeTransaction(id); getTransaction(id)`

Analogické metody pro transakce.


### `repairTransactionOrder(transaction)`

Vezme transakci (nebo její id), která už je v souboru a umístí ji na správné místo v seznamu transakcí. Metoda by se měla zavolat poté, co se upraví datum nějaké transakce.

> **Poznámka:** Asi by se hodil immutable přístup, aby někdo někde nezapomněl tuhle metodu volat, ale to by chtělo psát tak celou aplikaci.


### `getDefaultAccount(); setDefaultAccount(id)`

Práce s výchozím účtem.


# FileBag

Seznam souborů, na které aplikace vidí má na starost třída `FileBag`. Každý soubor v ní je jednoznačně identifikován dvěmi vlastnostmi: `driver` a `id`. Driver je rozhraní pro ukládání souboru "někam" (na disk, do cloudu). ID je unikátní string v rámci driveru a ten ho může použít pro pojemnování souboru v rámci systému, ve kterém soubor ukládá.

Javascript nemá rozhraní, ale kdyby měl, tak každá instance driveru by měla implementovat následující metody:

```js
class FileDriver
{
    constructor(dependencies, for, dependency, injection) {}

    getFile(id) {} // -> string

    storeFile(id, contents) {}

    removeFile(id) {}
}
```

`FileBag` si drží seznam podporovaných driverů jako instance jejich tříd a navenek jejich existenci schovává.

Seznam deskriptorů se ukládá perzistentně uvnitř prohlížeče v `LocalStorage`.


## Vlastnosti


### `descriptors`

Seznam descriptorů (defakto seznam souborů).

Struktura deskriptoru:

```js
let someDescriptor = {
    title: "Human-readable file title",
    driver: "driver name", // local, filesystem, google-drive, ...
    id: "/driver-specific/file-identifier.dat"
}
```


### `drivers`

Seznam podorovaných driverů. Klíč je název driveru a hodnota je jeho instance.


## Metody


### `loadFile(descriptor); saveFile(descriptor, contents)`

Metody zajistí načtení nebo uložení souboru pomocí příslušného driveru. Souborem se myslí jeho textová serializace.

> Uložení souboru provede jeho vytvoření, pokud ještě neexistuje.


### `removeFile(descriptor)`

Smaže soubor.


### `addDescriptor(title, driver, id)`

Přidá záznam do seznamu deskriptorů. Uložením souboru na tento nový deskriptor se defakto soubor vytvoří.

> **Poznámka:** Tohle není úplně čitelné, možná by stálo za zvážení kód upravit a přidat metodu `createFile`. Resp. to nějak sjednotit, část logiky vytváření souboru leží ve `FilePage` což nejspíš není to pravé místo.