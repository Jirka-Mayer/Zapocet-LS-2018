# Zápočtový program na letní semestr 2018 - Jiří Mayer

Aplikace na evidenci transakcí.

> **Motivace:** Kolik tenkrát vlastně stály ty sluchátka co jsem si kupoval?

Webová aplikace: [http://jirka-mayer.github.io/zapocet-ls-2018/web.html](http://jirka-mayer.github.io/zapocet-ls-2018/web.html)

Win32 binary: Lze zkompilovat po naklonování repozitáře `npm run build-win32`.

# Dokumentace


### Transakce

Aplikace pracuje s daty o provedených transakcích. Každá transakce obsahuje stručný titulek, datum provedení a množství přenesených peněz. K transakci lze přidat volitelný detailnější popis. Původní myšlenka je sledovat pouze fyzické peníze. Proto se transakce zadávají do aplikace manuálně. Pokud bychom chtěli zároveň zaznamenávat i transakce např. v bance, aplikace obsahuje koncept účtů a každá transakce pod nějaký účet spadá.


### Účty

Účet má nějaký název a počáteční množství peněz. Aplikace nerozlišuje různé měny, pracuje čistě s čísly. Peníze nelze převádět mezi účty, pouze "na účet" a "z účtu", takže věc lze chápat tak, že každý účet má vlastní měnu. Případná implementace je jen otázka formátování textu.

Aplikace v praxi nebude obsahovat všechny transakce, protože na nějaké se zapomene. Proto bude časem *odplouvat* od reálného stavu účtu. Proto je možné každý účet *synchronizovat*. Tedy přidat speciální transakci, která účet uvede zpět do konzistentního stavu.


### Přehled účtů

Sečtením všech transakcí dostanu současný stav účtu a částečnými součty zase stav účtu v minulosti. To se hodí kdykoliv potřebuji rychle zjistit, kolik mám peněz (cash) aniž bych je pracně počítal. To je také jedna z motivací aplikace.

> Předpokládáme, že účty nebudou *odplouvat* zásadně rychle; chybovost uživatele bude minimální.

Graf jmění v čase potěší nejednoho uživatele (tedy pokud roste).


## Provedení aplikace

Vybral jsem si prostředí webu, protože je přístupné z mnoha zařízení (PC, mobil) aniž bych musel používat rozdílné technologie. Tedy cílem byla rozšiřitelnost do budoucna (protože někdy bych rád transakci zapsal rovnou na mobilu a nemusel na ni dále pamatovat). Navíc pokud použiju platformu *electron*, tak se aplikace na PC může tvářit jako desktopová.

Aplikace je napsaná ve vanilla javascriptu. Cílem zápočtového programu je ukázat porozumění OOP, proto nepoužívám žádný framework jako React nebo Vue. Javascript je sice prototypový jazyk, ne objektový; součástí *ECMAScript 2015* je ale klíčové slovo `class`, které umožňuje dostatečně dobře imitovat chování objektového jazyka.

Pro přístup k datům z více zařízení jsem měl v plánu využít cloudová úložiště souborů jako je *Google Drive* nebo *Dropbox*. Ta v aplikaci implementována nejsou, ale je pro ně připraveno místo a inspirovala způsob ukládání dat:

Data (transakce, účty, nastavení) jsou uložena v souboru (lze chápat jako velký `string`) a soubor může být uložen na různých místech - lokálně, v cloudu, v local storage, ... V současnoti je implementováno pouze local storage, což je úložiště uvnitř webového prohlížeče, které má každá doména vyhrazené pro sebe. Takže data v aplikaci jsou uložena perzistentně, ale jsou pouze v aplikaci samotné. Více informací je ve třídě `app/code/FileBag.js`.


## Testy

Jádro aplikace je testované pomocí unit testů uvnitř `/spec`. Uživatelské rozhraní už testy nemá.


## Dokumentace kódu

- [Architektura jádra aplikace](docs/app-core.md)
- [Soubory](docs/files.md)
- [Dialogová okna](docs/modals.md)