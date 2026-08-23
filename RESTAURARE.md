# Plasa de siguranță — IAS

Dacă ceva merge prost, aici scrie exact ce ai de făcut. Citește doar partea care
te privește.

---

## 1. Aplicația s-a stricat după o actualizare

**Datele tale nu se pierd niciodată din cauza asta.** Elevii, ședințele și plățile
stau în telefon, nu în fișierele de aici. Orice ai face cu fișierele, ele rămân.

Ca să te întorci la o versiune care mergea:

1. Deschide **github.com/ias-auto/ias/commits/main/index.html**
   (lista tuturor încărcărilor fișierului, cea mai nouă sus)
2. Atinge o încărcare mai veche, dinaintea celei care a stricat ceva
3. Atinge **`View file`** — vezi fișierul așa cum era atunci
4. Atinge cele trei puncte **`⋯`** → **`Download raw file`**
5. Urcă fișierul descărcat peste cel de acum:
   **`Add file`** → **`Upload files`** → alege-l → **`Commit changes`**
6. Pe telefon: închide aplicația complet și redeschide-o

Fă la fel și cu `sw.js`, din aceeași încărcare. Fără el, telefonul poate ține
minte versiunea veche.

---

## 2. Cum se știe ce versiune e în fiecare încărcare

Deschide fișierul din acea încărcare și caută **`IAS v`** — versiunea e scrisă
acolo. Sau, mai simplu: numărul de versiune apare și în aplicație, sub titlu.

---

## 3. Cum se fac modificări fără risc

Fișierul `index.html` e făcut din patru bucăți, ținute în dosarul `parti/`:

| bucată | ce conține | se atinge? |
|---|---|---|
| `cap.html` | capul paginii, stilul, primul script | **nu** |
| `biblioteci.js` | React, three.js, iconițele | **nu** |
| `aplicatie.js` | codul aplicației | **da** |
| `coada.html` | închiderea paginii | **nu** |

Uneltele:

```
node desface.js index.html     # desface un index.html în parti/
node asambleaza.js             # pune bucățile la loc
node asambleaza.js v2.34.39    # la loc, cu versiune nouă (schimbă și sw.js)
node verifica.js               # pornește aplicația și o verifică
node probaModele.js            # verifică mașinile, roțile, lumina, culorile
```

Pentru modele:

```
node extrage.js <set.glb> "Sedan Body" modele/berlina.glb 4.3
```

Scoate o singură mașină dintr-un set mare, o îndreaptă, îi găsește roțile și
scrie un fișier mic, fără texturi. Dacă iese cu spatele, se adaugă `--bot-minus`
(sau `--bot-plus` pentru celălalt sens).

`asambleaza.js` verifică, înainte să scrie ceva:

- că bibliotecile și stilul au rămas **neatinse** (le compară cu amprenta lor)
- că fișierul ieșit începe și se termină cum trebuie
- că stilul, aplicația, garajul și licențierea sunt toate acolo

**Dacă o singură verificare pică, nu scrie nimic.** Mai bine niciun fișier decât
unul stricat.

---

## 4. De ce sunt lucrurile așa

Aplicația a fost cândva rescrisă de la zero, ca să fie codul mai curat. A fost o
hotărâre proastă: o rescriere nu poate egala ceva crescut în zeci de pași fără să
piardă sute de amănunte. S-a pierdut o săptămână și s-a revenit la versiunea
aceasta.

**Regula de acum înainte: modificări mici, una câte una, peste ce funcționează.**
Bibliotecile și stilul rămân neatinse, se schimbă doar bucata de aplicație, iar
fiecare versiune se încarcă separat pe GitHub — ca să existe mereu un pas înapoi.
