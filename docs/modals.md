# ModalContainer

Aplikace obsahuje subsystém pro podporu dialogových oken.

Všechna dialogová okna řídí třída `/app/code/ui/ModalContainer`. Stará se o jejich zobrazování a správně řazení (z-index).

Každé dialogové okno dědí od třídy `/app/code/ui/Modal` (více níže).


## Vlastnosti


### `modals`

Seznam otevřených dialogových oken. Jejich pořadí v poli určuje pořadí vykreslování (nulté je nejvíc vespod).


## Metody


### `show(modalInstance)`

Zobrazí nové dialogové okno. Argument je instance třídy `Modal`.


### `close(modalInstance)`

Provede zavření okna. Okno nezavírá samo sebe, pokud bych zavolal `modal.close()`, tak okno má uvnitř callback dovnitř `ModalContainer`u, který okno zavře touto metodou.


### `protected refresh()`

Provede překreslení oken (zaktualizuje HTML a z-idnexy).


### `isVisible()`

Vrátí `true`, pokud jsou zobrazená nějaká okna.


# Modal

Výchozí třída pro dialogová okna. Kdyby to javascript uměl, byla by to byla třída abstraktní.

Třída implementuje jen nejnutnější logiku dialogového okna. Exisuje ale i další logika, která je častá. Okna typu "OK / Cancel" mohou dědit od třídy `/app/code/ui/SubmitModal`. Ušetří si tak implementaci callbacků a patičky s příslušnými dvěma tlačítky.

`/app/code/ui/PromptModal` je dialogové okno s textovým polem. Opět se jedná o časté okno, proto má vlastní třídu.

## Vlastnosti


### `title`

Titulek dialogového okna zobrazený v jeho hlavičce.


## Metody


### `initialize(document, closeCallback)`

Při otevírání okna volám `modals.show(...)` a jako argument už předám instanci. Čili kontruktor dialogového okna dostane argumenty důležité pro jeho obsah, ne jeho podporu a logiku, která má být schovaná. `initialize` je metoda podobná konstruktoru, která se ale volá až uvnitř `ModalContainer`u při zobrazení okna. Oknu předá odkaz na dokument kvůli vytváření html elementů a `closeCallback`, který při zavolání zavře okno.

> Metoda není určená k přetěžování ani volání. Je to něco jako privátní metoda třídy `ModalContainer`, ačkoliv uvnitř třídy `Modal`.


### `close()`

Zavře okno zavoláním `closeCallback`u dovnitř `ModalContainer`u.


### `modalDidMount()`

Metoda je volána po zobrazení okna ve chvíli, kdy html kód okna už je uvnitř prohlížeče.

> Určeno jako event handler (event hook).


### `template()`

Metoda poskládá dohromady html kód okna a vrátí ho jako `string`.

Obsahuje základní formátování na hlavičku, tělo a patičku. V případě potřeby je možnost ji přetížit a vykresit si uvnitř okna úplně cokoliv, ale běžně stačí přetížt pouze metody definující obsah příslušných částí: `headContents()`, `contents()`, `footContents()`.
