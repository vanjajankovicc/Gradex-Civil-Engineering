# Gradex — Civil Engineering Project Management System

## Šta je promenjeno u ovoj verziji

**Obrisano (nije imalo smisla / bilo je duplikat / nije bilo povezano ni sa čim):**
- `ProcenaStatistika` — prikazivala je izmišljene, hardkodovane brojeve. Zamenjena je pravim ekranom `StatistikaScreen` koji računa stvarne podatke iz baze (budžet, potrošnja, broj projekata po statusu).
- `DinamikaRadova` — bila je skoro identičan duplikat kalkulatora betona iz `KalkulatorMaterijala`. Obrisana.
- `ExcelTabele` — lažna tabela koja se nije nigde čuvala (nestajala je pri osvežavanju stranice). Obrisana.
- Lažna forma i tuđi (kopirani) firmski podaci u `DokumentacijaScreen` — obrisani. Ostao je samo koristan referentni sadržaj o vrstama projektne dokumentacije (IDR, IDP, PGD, PZI, PIO).

**Dodato / popravljeno:**
- `AdminScreen` — link "ADMIN PANEL" u meniju je ranije vodio na stranicu koja uopšte nije postojala. Sada postoji i koristi već gotove backend rute za upravljanje korisnicima (`/api/admin/korisnici`).
- `StatistikaScreen` — nova statistika, povezana na stvarne podatke: za admina globalni pregled (broj korisnika, projekata, isplata), za inženjera pregled sopstvenih projekata sa procentom potrošenog budžeta.
- Backend `server.js` — ispravljen bug gde je server prijavljivao da radi PRE nego što se poveže na MongoDB, pa je posle par sekundi tiho pucao u pozadini ako konekcija ne uspe. Sada server čeka da se baza poveže pre nego što počne da sluša port.
- Root `package.json` sa `concurrently` — sada možeš pokrenuti i frontend i backend jednom komandom.

## Pokretanje

### 1. Podesi environment fajlove

```bash
cd backend
cp .env.example .env
# otvori .env i popuni MONGO_URI, JWT_SECRET, PayPal ključeve (ili ostavi sandbox 'sb')

cd ../frontend
cp .env.example .env
```

### 2. Instaliraj zavisnosti

```bash
cd backend && npm install
cd ../frontend && npm install
cd .. && npm install
```

### 3. Pokreni oba servera jednom komandom

```bash
npm run dev
```

Backend će raditi na `http://localhost:5000`, frontend na `http://localhost:3000`.

## Struktura

```
gradex/
├── backend/          # Express + MongoDB API
│   ├── controllers/  # logika ruta (auth, projekti, zadaci, isplate, admin)
│   ├── models/       # Mongoose šeme (User, Project, Task, Isplata)
│   ├── routes/
│   └── server.js
└── frontend/         # React + Redux Toolkit Query
    ├── src/screens/  # stranice aplikacije
    ├── src/slices/   # RTK Query API pozivi
    └── src/components/
```

## Uloge korisnika

- **inzenjer** — kreira i upravlja svojim projektima i zadacima
- **admin** — vidi sve projekte i korisnike, ima pristup Admin panelu (`/admin`)
