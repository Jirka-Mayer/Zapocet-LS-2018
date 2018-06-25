# Architektura jádra aplikace

Aplikace se spustí následovně:

```js
const Application = require("../code/Application.js")
window.app = new Application(window, document, "#app")
```

Tedy celá aplikace žije uvnitř třídy `Application`, která dostane kořenový html element, ve kterém si může hospodařit.

Aplikace má jeden otevřený soubor:

```js
app.file // -> File nebo null
```

a ten obsahuje veškerá data a práci s nimi. Umí vytvářet transakce, účty, hlídá pořadí a integritu.

```js
file.trnsactions[i] // -> Transaction
file.accounts[i] // -> Account

file.createTransaction(...)
file.removeAccount(...)
```

Umí se serializovat a zase načíst.

```js
let file = File.deserialize("...data...")

file.serialize() // -> string data
```

Kromě souboru je součástí hlavní logiky i přehled dat. Ten počítá třída `/app/code/Statistics`.


## Pages

Aplikace ještě obsahuje vlastnost `page`. Zde leží veškeré uživatelské rozhraní. Jedna stránka (page) reprezentuje nějaký celek UI, který má k dispozici celé okno prohlížeče.

Jednotlivé stránky dědí od třídy `/app/code/pages/Page.js` a lze na ně přejít voláním `app.gotoPage(TransactionPage)`.

> `TransactionPage` v příkladu není instance, ale kontruktor stránky. Vytvoření instance provede aplikace a ta je potom dosazena do `app.page`.
