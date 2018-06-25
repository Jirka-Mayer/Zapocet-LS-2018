# Dialogová okna

Aplikace obsahuje subsystém pro podporu dialogových oken.

Všechna dialogová okna řídí třída `/app/code/ui/ModalContainer`. Stará se o jejich zobrazování a správně řazení (z-index).

Každé dialogové okno dědí od třídy `/app/code/ui/Modal`.

Okna typu "OK / Cancel" mohou dědit od třídy `/app/code/ui/SubmitModal`. Ušetří si tak implementaci callbacků a patičky s příslušnými dvěma tlačítky.
