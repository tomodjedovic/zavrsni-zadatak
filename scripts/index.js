document.addEventListener("DOMContentLoaded", async function(){


    async function dohvatiApi(url){
        if(!url) return
    
        try {
            const response = await fetch (url);
            if(!response.ok){
                throw new Error(`greska pri pokusaju konekcije`);
            }
            const data =  await response.json();
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

    var apiORaketama = " https://api.spacexdata.com/v4/rockets/";
    const podaciORaketama = await dohvatiApi(apiORaketama);

    var divSveRakete = document.getElementById("sveRakete");

    podaciORaketama.forEach(async(element)=>{

        if(!divSveRakete ) return;
        var raketa = document.createElement("div");
        raketa.className = "raketa";
        divSveRakete.appendChild(raketa);

        var slika = document.createElement("img");
        slika.className = "slikaRakete";
        slika.src = await element.flickr_images[0];
        raketa.appendChild(slika);

        var ime = document.createElement("h3");
        raketa.appendChild(ime);
        ime.textContent =await element.name;

        var prviLet = kreirajParagraf(prviLet,`prvi let :${await element.first_flight}`,raketa);
         
        var visina = kreirajParagraf(visina,`visina : ${await element.height.meters} m`,raketa);
        
        var masa = kreirajParagraf(masa, `masa : ${await element.mass.kg} kg`,raketa);

        var dugme = document.createElement("button");
        dugme.textContent = "VIŠE";
        dugme.onclick = function() {
            window.location.href = './samo_raketa.html#' + element.id;
        }
        raketa.appendChild(dugme);
    });

    //lansiranja//

    var apiZaLansiranja= " https://api.spacexdata.com/v4/launches/"
    const podaciOLansiranjima = await dohvatiApi(apiZaLansiranja);
    var divSvaLansiranja = document.getElementById("svaLansiranja");

    podaciOLansiranjima.forEach(async(element) => {

        if (!divSvaLansiranja) return;

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
        if(!element.details) return;
        opisLansiranja.textContent = await element.details.slice(0,100);    
        lansiranje.appendChild(opisLansiranja)
    });

   

    //informacije//

    const apiZaInfo = "https://api.spacexdata.com/v4/company"
    const info = await dohvatiApi(apiZaInfo);

    var sveInformacije = document.getElementById("info");
    if( sveInformacije) {
        var divSjediste = document.createElement("div");
        sveInformacije.appendChild(divSjediste);
        
        var naslovSjediste = document.createElement("h3");
        naslovSjediste.textContent = "sjediste kompanije :";
        divSjediste.appendChild(naslovSjediste);
        
        var paragrafAdresa = kreirajParagraf(paragrafAdresa,`adresa : ${info.headquarters.address}`,divSjediste);
        var paragrafGrad = kreirajParagraf(paragrafGrad,`grad : ${info.headquarters.city}`,divSjediste);
        var paragrafDrzava = kreirajParagraf(paragrafDrzava,`drzava : ${info.headquarters.state}`,divSjediste)
    }
        
    //podaci//
    var divPodaci =  document.createElement("div");
    if( sveInformacije) { 

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
    }

    //linkovi//
    var divLinkovi = document.createElement("div");
    if( sveInformacije) {
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
    }

     // samo Raketa
    if( window.location.hash != undefined) {
        let raketaId = window.location.hash.substring(1);
        
        const samoRaketa = await dohvatiApi(apiORaketama + raketaId);
        console.log(samoRaketa);

       var divSamoRaketa = document.getElementById("samoraketa");
       if(!divSamoRaketa) return;
       var imeRakete = document.createElement("h1");
       imeRakete.textContent = samoRaketa.name;
       divSamoRaketa.appendChild(imeRakete);

       //podaci
       var divPodaci = document.createElement("div");
       divSamoRaketa.appendChild(divPodaci);

       var prviLet = kreirajParagraf(prviLet,`prvi let : ${samoRaketa.first_flight}`,divPodaci);
       var visina = kreirajParagraf(visina,`visina : ${samoRaketa.height.meters} m`,divPodaci);
       var masa = kreirajParagraf(masa,`masa : ${samoRaketa.mass.kg} kg`,divPodaci);
       var cenaLansiranja = kreirajParagraf(cenaLansiranja,`cena lansiranja : ${samoRaketa.cost_per_launch} $`,divPodaci);
       var opis = kreirajParagraf(opis,`opis : ${samoRaketa.description}`,divPodaci);
    
       //slajder

       var sliderElement = document.createElement("div");
       sliderElement.className = "slider";
       sliderElement.id = "slider";
       divSamoRaketa.appendChild(sliderElement);
   
       const photos = samoRaketa.flickr_images
       photos.forEach((photoPath) => {
           var photoDiv = document.createElement("div")
           photoDiv.className = "slide";
           sliderElement.appendChild(photoDiv);
           var imgElement = document.createElement("img");
           imgElement.src = photoPath;
           photoDiv.append(imgElement);
       });
       
       var nextButton = document.createElement("next");
       nextButton.className = "next";
       nextButton.textContent = "Sledeca slika";
       sliderElement.appendChild(nextButton);
   
       var prevButton = document.createElement("prev");
       prevButton.className = "prev";
       prevButton.textContent = "Prethodna slika"
       sliderElement.appendChild(prevButton);
   
       var curentSlide = 0;
       var totalSlide = photos.length;
       const slides = document.getElementsByClassName("slide");
   
       var counter = document.createElement("p");
       counter.className="brojevi";
       document.body.appendChild(counter);
       counter.textContent = curentSlide + 1 + ' of ' + totalSlide;
   
       nextButton.addEventListener("click", function(){
           curentSlide++;
           if (curentSlide > totalSlide - 1) {
               curentSlide = 0;
           }
           console.log(curentSlide);
           counter.textContent = curentSlide + 1 + ' of ' + totalSlide;
           showSlides();
   
       });
   
       prevButton.addEventListener("click", function(){
           curentSlide--;
           if (curentSlide < 0) {
               curentSlide = totalSlide;
           }
           console.log(curentSlide);
           showSlides();
   
       });
       function showSlides() {
           for (let i = 0; i < slides.length; i++) {
               slides[i].style.opacity = 0;
           }
           slides[curentSlide].style.opacity = 1;
       }
       showSlides();
       





    }
   
});
