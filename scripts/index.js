document.addEventListener("DOMContentLoaded", async function(){


    async function dohvatiApi(url){
        if(!url) return
    
        try {
            const response = await fetch (url);
            if(!response.ok){
                throw new Error(`greska pri pokusaju konekcije`);
            }
            const data =  await response.json();
            console.log(data); 
            return data;
    
        }catch(error){
            console.log(error);
        }
    }

     function kreirajParagraf(naziv,tekst,roditelj){
        naziv = document.createElement("p");
        naziv.textContent =  tekst;
        roditelj.appendChild(naziv);
         
    }

        //rakete//

    var apiORaketama = " https://api.spacexdata.com/v4/rockets";
     const podaciORaketama = await dohvatiApi(apiORaketama);
    
    var divSveRakete = document.getElementById("sveRakete");

    podaciORaketama.forEach(async(element)=>{
        var raketa = document.createElement("div");
        raketa.className = "raketa";
        divSveRakete.appendChild(raketa);

        var slika = document.createElement("img");
        slika.className = "slikaRakete";
        slika.src =await element.flickr_images[0];
        raketa.appendChild(slika);

        var ime = document.createElement("h3");
        raketa.appendChild(ime);
        ime.textContent =await element.name;

        var prviLet = document.createElement("p");
        raketa.appendChild(prviLet);
        prviLet.textContent = `prvi let : ${await element.first_flight}`;
        
        var visina = document.createElement("p");
        raketa.appendChild(visina);
        visina.textContent = `visina : ${await element.height.meters} m`;

        var masa = document.createElement("p");
        raketa.appendChild(masa);
        masa.textContent = `masa : ${await element.mass.kg} kg`;

        var dugme = document.createElement("button");
        dugme.textContent = "VIŠE";
        raketa.appendChild(dugme);
        
        dugme.addEventListener("click", function() {
            var samoRaketa = document.getElementById("samo-raketa")
            var p = kreirajParagraf(p,"dsgfg",samoRaketa);

        });
    });

    //lansiranja//

var apiZaLansiranja= " https://api.spacexdata.com/v4/launches"
const podaciOLansiranjima = await dohvatiApi(apiZaLansiranja);
var divSvaLansiranja = document.getElementById("svaLansiranja");

podaciOLansiranjima.forEach(async(element) => {

    var lansiranje = document.createElement("div");
    lansiranje.className = "infoLansiranje";
    divSvaLansiranja.appendChild(lansiranje);

    var slicica = document.createElement("img");
    slicica.className = "slikaLansiranja";
    slicica.src = await element.links.patch.small;
    lansiranje.appendChild(slicica);

    var nazivLansiranja = document.createElement("h3");
    nazivLansiranja.textContent = await element.name;
    lansiranje.appendChild(nazivLansiranja);

    var opisLansiranja = document.createElement("p");
    opisLansiranja.textContent = await element.details.slice(0,100);    
    lansiranje.appendChild(opisLansiranja)
});

//informacije//

const apiZaInfo = "https://api.spacexdata.com/v4/company"
const info = await dohvatiApi(apiZaInfo);

var sveInformacije = document.getElementById("info");
var divSjediste = document.createElement("div");
sveInformacije.appendChild(divSjediste);

var naslovSjediste = document.createElement("h3");
naslovSjediste.textContent = "sjediste kompanije :";
divSjediste.appendChild(naslovSjediste);

var paragrafAdresa = kreirajParagraf(paragrafAdresa,`adresa : ${info.headquarters.address}`,divSjediste);

var paragrafGrad = kreirajParagraf(paragrafGrad,`grad : ${info.headquarters.city}`,divSjediste);

var paragrafDrzava = kreirajParagraf(paragrafDrzava,`drzava : ${info.headquarters.state}`,divSjediste)

//podaci//
var divPodaci =  document.createElement("div");
sveInformacije.appendChild(divPodaci);

var osnovniPodaci =  document.createElement("h3");
osnovniPodaci.textContent  = "osnovni podaci kompanije";
divPodaci.appendChild(osnovniPodaci);

var imeKompanije = kreirajParagraf(imeKompanije,`ime kompanije : ${info.name}`,divPodaci);
var osnivac = kreirajParagraf(osnivac,`osnivac : ${info.founder}`,divPodaci);
var godinaOsnnivanja = kreirajParagraf(godinaOsnnivanja,`godina osnivanja : ${info.founded}`,divPodaci);
var brojZaposlenih = kreirajParagraf(brojZaposlenih,`broj zaposlenih : ${info.employees}`,divPodaci);
var brojRaketa = kreirajParagraf(brojRaketa,`brojRaketa : ${info.vehicles}`,divPodaci);
var lansirneLokacije = kreirajParagraf(lansirneLokacije,`lansirne lokacije : ${info.launch_sites}`,divPodaci);
var testMesta = kreirajParagraf(testMesta,`mesta za testiranje : ${info.test_sites}`,divPodaci);
var izvrsniDirektor = kreirajParagraf(izvrsniDirektor,`izvrsni direktor : ${info.ceo}`,divPodaci);
var tehnickiDirektor = kreirajParagraf(tehnickiDirektor,`texnicki direktor : ${info.cto}`,divPodaci);
var operativniDirektor = kreirajParagraf(operativniDirektor,`operativni direktor : ${info.coo}`,divPodaci);
var direktorPogona = kreirajParagraf(direktorPogona,`direktor pogona : ${info.cto_propulsion}`,divPodaci);
var vrednostKompanije = kreirajParagraf(vrednostKompanije,`vrednost kompanije : ${info.valuation} $`,divPodaci);
var rezime = kreirajParagraf(rezime,`rezime : ${info.summary}`,divPodaci);

//linkovi//
var divLinkovi = document.createElement("div");
sveInformacije.appendChild(divLinkovi);

var naslovLinkova = document.createElement("h3");
naslovLinkova.textContent = "linkovi :";
divLinkovi.appendChild(naslovLinkova);

var link1 = document.createElement("a");
link1.textContent = "-slike-";
link1.href = info.links.flickr;
divLinkovi.appendChild(link1);

var link2 = document.createElement("a");
link2.textContent = "-twitter-";
link2.href = info.links.twitter;
divLinkovi.appendChild(link2);

var link3 = document.createElement("a");
link3.textContent = "-Elon twitter-";
link3.href = info.links.elon_twitter;
divLinkovi.appendChild(link3);







    
                   
    
   
});
