const proizvodi = [
    {
        id: 1,
        naziv: "Čokolada Lešnik",
        opis: "Ručno pravljena čokolada sa lešnikom.",
        cena: 400,
        slika: "galerija_1.png",
        kategorija: "orašasti"
    },
    {
        id: 2,
        naziv: "Čokolada Badem",
        opis: "Ukusna čokolada sa bademom.",
        cena: 420,
        slika: "galerija_2.png",
        kategorija: "orašasti"
    },
    {
        id: 3,
        naziv: "Čokolada Šljiva",
        opis: "Čokolada sa ukusom šljive.",
        cena: 410,
        slika: "galerija_3.png",
        kategorija: "voćne"
    },
    {
        id: 4,
        naziv: "Čokolada Višnja",
        opis: "Čokolada sa višnjom.",
        cena: 430,
        slika: "galerija_4.png",
        kategorija: "voćne"
    },
    {
        id: 5,
        naziv: "Čokolada Lubenica",
        opis: "Neobična čokolada sa ukusom lubenice.",
        cena: 400,
        slika: "galerija_5.png",
        kategorija: "voćne"
    }
];

const listaProizvoda = document.getElementById("listaProizvoda");
const formaPorudzbine = document.getElementById("formaPorudzbine");
const proizvodSelect = document.getElementById("proizvod");
const poruka = document.getElementById("poruka");
const dugmePretraga = document.getElementById("dugmePretraga");
const dugmePrikaziSve = document.getElementById("dugmePrikaziSve");
const pretraga = document.getElementById("pretraga");

function izracunajUkupno(cena, kolicina) {
    return cena * kolicina;
}

function formatirajIme(ime) {
    return ime.trim().toUpperCase();
}

function pronadjiProizvodPoId(id) {
    return proizvodi.find(function(proizvod) {
        return proizvod.id === id;
    });
}

function napraviKarticu(proizvod) {
    return `
        <article class="proizvod-kartica">
            <img src="./slike/${proizvod.slika}" alt="${proizvod.naziv}">
            <h3>${proizvod.naziv}</h3>
            <p>${proizvod.opis}</p>
            <p>Kategorija: ${proizvod.kategorija}</p>
            <p><strong>Cena: ${proizvod.cena} RSD</strong></p>
        </article>
    `;
}

function prikaziProizvode(lista) {
    listaProizvoda.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        listaProizvoda.innerHTML += napraviKarticu(lista[i]);
    }
}

function popuniSelect() {
    proizvodSelect.innerHTML = "";

    proizvodi.forEach(function(proizvod) {
        const option = document.createElement("option");
        option.value = proizvod.id;
        option.textContent = proizvod.naziv + " - " + proizvod.cena + " RSD";
        proizvodSelect.appendChild(option);
    });
}

function pretraziProizvode(tekst) {
    const sredjenTekst = tekst.trim().toLowerCase();

    return proizvodi.filter(function(proizvod) {
        return proizvod.naziv.toLowerCase().includes(sredjenTekst);
    });
}

function naziviProizvoda() {
    return proizvodi.map(function(proizvod) {
        return proizvod.naziv;
    });
}

dugmePretraga.addEventListener("click", function() {
    const rezultati = pretraziProizvode(pretraga.value);
    prikaziProizvode(rezultati);

    if (rezultati.length === 0) {
        listaProizvoda.innerHTML = "<p>Nema proizvoda za traženi pojam.</p>";
    }
});

dugmePrikaziSve.addEventListener("click", function() {
    pretraga.value = "";
    prikaziProizvode(proizvodi);
});

proizvodSelect.addEventListener("change", function() {
    const izabraniId = Number(proizvodSelect.value);
    const izabraniProizvod = pronadjiProizvodPoId(izabraniId);

    if (izabraniProizvod.cena > 420) {
        proizvodSelect.style.borderColor = "#a0522d";
    } else {
        proizvodSelect.style.borderColor = "#ccc";
    }
});

formaPorudzbine.addEventListener("submit", function(event) {
    event.preventDefault();

    const ime = document.getElementById("ime").value;
    const email = document.getElementById("email").value;
    const izabraniId = Number(document.getElementById("proizvod").value);
    const kolicina = Number(document.getElementById("kolicina").value);
    const placanje = document.getElementById("placanje").value;
    const izabraniProizvod = pronadjiProizvodPoId(izabraniId);
    const ukupno = izracunajUkupno(izabraniProizvod.cena, kolicina);
    const sredjenoIme = formatirajIme(ime);

    if (kolicina <= 0) {
        poruka.className = "poruka greska";
        poruka.textContent = "Količina mora biti veća od nule.";
        return;
    }

    switch (placanje) {
        case "kartica":
            poruka.className = "poruka uspeh";
            poruka.textContent = sredjenoIme + ", poručili ste " + kolicina + " komada proizvoda " + izabraniProizvod.naziv + ". Ukupno za plaćanje karticom: " + ukupno + " RSD. Potvrda je poslata na " + email + ".";
            break;
        case "pouzece":
            poruka.className = "poruka uspeh";
            poruka.textContent = sredjenoIme + ", poručili ste " + kolicina + " komada proizvoda " + izabraniProizvod.naziv + ". Ukupno za plaćanje pouzećem: " + ukupno + " RSD. Potvrda je poslata na " + email + ".";
            break;
        default:
            poruka.className = "poruka greska";
            poruka.textContent = "Morate izabrati način plaćanja.";
    }
});

prikaziProizvode(proizvodi);
popuniSelect();
naziviProizvoda();
