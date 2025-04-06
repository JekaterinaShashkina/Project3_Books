# Project3_Books

**Project3_Books** on RESTful API raamatute haldamiseks, kasutades JWT-autentimist.

## Kirjeldus
See projekt on raamatukogu serveripoolne rakendus, mis võimaldab teostada CRUD-operatsioone (loomine, lugemine, muutmine, kustutamine) raamatute kallal ning sisaldab ka autentimis- ja autoriseerimissüsteemi JWT kaudu.

## Funktsionaalsus
- Kasutajate registreerimine ja sisselogimine erinevate rollidega (administraator, kasutaja).
- Raamatute lisamine, muutmine ja kustutamine (ainult administraatorile).
- Kategooriate ja autorite lisamine ja muutmine (ainult administraatorile)
- Raamatute otsing kategooria, autori või pealkirja alusel (administraator, kasutaja). 
- Kommentaaride lisamine ja haldamine (administraator, kasutaja).
- Täielik API dokumentatsioon Swaggeri abil.

## Tehnoloogiad
- Node.js
- Express.js
- Sequelize (ORM andmebaasiga töötamiseks)
- JWT (JSON Web Tokens) autentimiseks
- Swagger (API dokumenteerimiseks)

## Paigaldamine
1. Klooni hoidla: `git clone https://github.com/JekaterinaShashkina/Project3_Books.git`
2. Mine projekti kausta: ` cd Project3_Books`
3. Paigalda sõltuvused: `npm install`
4. Loo `.env` fail ja määra järgmised keskkonnamuutujad:
`SECRET_ACCESS_TOKEN=your_secret_key`
`DATABASE_URL=your_database_url`
5. Käivita server: `node ./index.js` или `npx nodemon .\index.js `

## Kasutamine
Kui server on käivitatud, on see kättesaadav aadressil  **http://localhost:3000**. Sa saad kasutada tööriistu nagu Postman või Swagger UI, et testida ja kasutada API-d.

Swaggeri dokumentatsioon on saadaval aadressil: **http://localhost:3000/api-docs**

## Projekti struktuur

```
Project3_Books/
├── config/             # Konfiguratsioonifailid
├── controllers/        # Päringute kontrollijad
├── middleware/         # Autentimise ja autoriseerimise vahevara
├── models/             # Sequelize mudelid
├── routes/             # Marsruutide määratlused
├── swagger/            # Swaggeri konfiguratsioon
├── index.js            # Peamine rakenduse käivitusfail
├── package.json        # Sõltuvused ja skriptid
└── .gitignore          # Failide välistamine Gitist
```

## Rollid

- **Administraator** – saab lisada, muuta ja kustutada raamatuid, autoreid, kategooriaid ning hallata kõike.
- **Kasutaja** – saab vaadata raamatuid, otsida ning lisada kommentaare.

## API endpointid
Swaggeri täielik dokumentatsioon on saadaval aadressil: **http://localhost:3000/api-docs**.
### Autentimine
`POST /auth/signup` — Uue kasutaja registreerimine

`POST /auth/signin` — Kasutaja sisselogimine

### Raamatud
`POST /books` - Uue raamatu lisamine (ainult adminile)

`GET /books` - Kogu raamatute listi saamine

`GET /books/:id` - Ühe raamatu koos autorite, kategooria ja kommentidega saamine ID järgi 

`PUT /books/:id` - Raamatu info uuendamine (ainult adminile)

`DELETE /books/:id` - Raamatu kustutamine (ainult adminile)

### Otsing
`GET /search/author/:author` - Raamatute otsing autoori järgi

`GET /search/title/:title` - Raamatute otsing nimetuse järgi

`GET /search/category/:category_id` - Raamatute otsing kategooria järgi

### Kommentaarid
`POST /comments/:bookId` - Kommentaari lisamine raamatu kohta

`GET /comments/:id` - Kõik kommentide saamine

## Swagger
### Võimalused
- Kõik kättesaadavate endpointide vaatamine
- Päringute interaktiine testimine, saab saata **GET**, **POST**, **PUT**, **DELETE** päringud otse brauserist
- Turvaliste marsruutideks on vajalik sisestada JWT token

### Autoriseerimine Swaggeris
1. Vajuta nuppu **Authorize** paremas nurgas
2. Vormis sisesta token ilma **BEARER** 
Näidis: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Vajuta **Authorize**, selleks et aktiveerida tokeni
4. Pärast autoriseerimist saab teha turvalised päringud.

## Autor
Projekt tehtud Jekaterina Šaškina poolt õppeaine “Web Programming” raames.

