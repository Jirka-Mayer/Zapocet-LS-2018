# Page

Největší jednotka uživatelského rozhraní je stránka (page). Jedná se o libovolnou třídu, která dědí od `pages/Page`. Stránka má k dispozici celé okno prohlížeče a dostane odkaz na instanci aplikace a může s ní dělat cokoliv. Nikdy není zobrazeno více stránek současně.


## Vlastnosti


### `app`

Odkaz na aplikaci. Odsud aplikaci řídí, otevírá soubory a přistupuje k otevřenému souboru.


### `container`

Html element obsahující stránku (někde uvnitř je html element `page.element`).


### `element`

Html element stránky. Uvnitř něho si může stránka dělat co chce. Jeho obsah specifikuje metoda `page.template()`.


### `refs`

Seznam html elementů uvnitř stránky, které obsahují atribut `ref="..."`, kde jeho hodnota je klíč uvnitř slovníku `refs`. Více uvnitř `code/utils/getRefs.js`.


## Metody


### `template()`

Metoda vracející `string`, který se dosadí jako html obsah elemetu stránky.


### `close()`

Provede potřebné kroky pro zavření stránky (odstranění html elementu).