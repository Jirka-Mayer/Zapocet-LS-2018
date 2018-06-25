# Soubory

V kódu je soubor reprezentovaný třídou `/app/code/File`. Její obsah je popsaný v dokumentaci jádra aplikace. Tady je rozebrané ukládání souboru poté co je serializovaný jako *string*.

Seznam souborů, na které aplikace vidí má na starost třída `/app/code/FileBag`. Každý soubor v ní je jednoznačně identifikován dvěmi vlastnostmi: `driver` a `id`. Driver je rozhraní pro ukládání souboru "někam" (na disk, do cloudu). ID je unikátní string v rámci driveru a ten ho může použít pro pojemnování souboru v rámci systému, ve kterém soubor ukládá.

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

`FileBag` si drží seznam podporovaný driverů jako instance jejich tříd a navenek jejich existenci schovává.


## Formát serializace souborů

Soubor má první řádek jako hlavičku. Ta obsahuje verzi souboru. Při načtení starší verze souboru je tak možné provést konverzi do novější (do budoucna; teď neumí).

Co náselduje za hlavičkou záleží na verzi. V současnosti je tam ale obsah souboru serializovaný jako JSON.
