# Griblje — muzejska arhitektura

## Osnovni princip

Griblje ni predstavljeno kot klasična turistična spletna stran. Projekt je zasnovan kot **digitalni muzej resnične vasi**.

Osnovna povezava podatkov je:

`KRAJ → HIŠA → LJUDJE → PREDMET → ZGODBA → DOGODEK → VIR`

En objekt je lahko povezan z več drugimi objekti. Tako lahko obiskovalec začne pri lokaciji in nadaljuje do ljudi, fotografij, predmetov, spominov in dogodkov.

## Muzejski zapisi

Vsak zapis mora imeti:

- stabilen `id`,
- naslov,
- tip oziroma plast zbirke,
- obdobje,
- lokacijo,
- opis,
- izvor oziroma vir,
- status preverjanja,
- povezave na sorodne zapise.

### Statusi

- `osnovni zapis` — zapis obstaja, vendar še ni kuratorsko zaključen;
- `potrebna dokumentacija` — potrebujemo dodaten vir ali potrditev;
- `preverjeno` — objavljeno vsebino podpirajo navedeni viri.

Spomin ali ustno pričevanje se ne sme samodejno pretvoriti v zgodovinsko dejstvo.

## Zemljevid

Zemljevid uporablja podatkovni model z neobveznima koordinatama `lat` in `lng`.

Koordinat se ne izmišljuje. Točka dobi natančen položaj šele po preverjanju vira oziroma terenskem preverjanju.

Ko bodo koordinate zbrane, lahko vizualni sloj preklopimo iz sedanjega konceptnega zemljevida v pravi interaktivni zemljevid brez spremembe muzejske podatkovne strukture.

## Referenčni model

Kot oblikovni in konceptualni vzor se uporablja Beamish, The Living Museum of the North. Njegova struktura povezuje zgodovinske prostore, hiše, ljudi, predmete, vsakdanje življenje, zgodbe in zemljevid muzeja.

Griblje ne kopira Beamisha. Prevzame princip in ga prilagodi resnični slovenski vasi, kjer je sama vas muzejski prostor.

## Prednostna razvojna pot

1. preverjeni kraji in osnovni zemljevid;
2. domačije oziroma hiše;
3. družine in ljudje;
4. fotografije in predmeti;
5. ustna zgodovina in spomini;
6. dogodki in časovna os;
7. arhivski viri in citiranje;
8. moderirano dodajanje vsebin obiskovalcev;
9. večjezična predstavitev.
