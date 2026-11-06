const historiqueBieres = document.getElementById("historiqueBieres");
const historiqueBoissons = document.getElementById("historiqueBoissons");
const historiqueSnacks = document.getElementById("historiqueSnacks");
const historiqueRepas = document.getElementById("historiqueRepas");
const totalVentes = document.getElementById("totalVentes");
const boutonReset = document.getElementById("resetStats");

const ventes = JSON.parse(localStorage.getItem("ventes")) || {};

console.log(ventes);

let montantTotal = 0;

for (let produit in ventes) {

    const item = ventes[produit];
    montantTotal += item.total;

    if (item.categorie === "bieres") {

        historiqueBieres.innerHTML +=
       `
        <div class="ligne-historique">
        <span>${produit}</span>
        <span>x${item.quantite}</span>
        </div>
        `

    }

    else if (item.categorie === "boissons") {

        historiqueBoissons.innerHTML +=
        `
        <div class="ligne-historique">
        <span>${produit}</span>
        <span>x${item.quantite}</span>
        </div>
        `
    }

    else if (item.categorie === "snacks") {

        historiqueSnacks.innerHTML +=
        `
        <div class="ligne-historique">
        <span>${produit}</span>
        <span>x${item.quantite}</span>
        </div>
        `

    }

    else if (item.categorie === "repas") {

        historiqueRepas.innerHTML +=
        `
        <div class="ligne-historique">
        <span>${produit}</span>
        <span>x${item.quantite}</span>
        </div>
        `

    }

}

totalVentes.textContent = montantTotal.toFixed(2) + " $";


boutonReset.addEventListener("click", function(){

    localStorage.removeItem("ventes");

    location.reload();

});

boutonReset.addEventListener("click", function(){

    const confirmation = confirm(
        "Es-tu certaine de vouloir réinitialiser les statistiques?"
    );

    if(confirmation){

        localStorage.removeItem("ventes");

        location.reload();

    }

});

