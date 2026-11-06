// Ceci est un commentaire sur une seule ligne

const boutonsProduits = document.querySelectorAll(".produit");
const listeCommande = document.getElementById("listeCommande");
const affichageTotal = document.getElementById("total");
const boutonAnnulerDernier = document.getElementById("annulerDernier");
const boutonNouvelleCommande = document.getElementById("nouvelleCommande");

let commande = [];

function afficherCommande() {
    listeCommande.innerHTML = "";

    let total = 0;
    let compteur = {};

    commande.forEach(function(item) {
        total = total + item.prix;

        if (compteur[item.nom]) {
            compteur[item.nom].quantite++;
            compteur[item.nom].total += item.prix;
        } else {
            compteur[item.nom] = {
                quantite: 1,
                total: item.prix
            };
        }
    });

    for (let produit in compteur) {
        const item = compteur[produit];

        const nouvelItem = document.createElement("p");
        nouvelItem.textContent =
            produit + " x" + item.quantite + " - " + item.total.toFixed(2) + " $";

        listeCommande.appendChild(nouvelItem);
    }

    affichageTotal.textContent = "Total : " + total.toFixed(2) + " $";
}

function enregistrerVente() {
    let ventes = JSON.parse(localStorage.getItem("ventes")) || {};

    commande.forEach(function(item) {
        if (ventes[item.nom]) {
            ventes[item.nom].quantite++;
            ventes[item.nom].total += item.prix;
        } else {
            ventes[item.nom] = {
                quantite: 1,
                total: item.prix,
                categorie: item.categorie
            };
        }
    });

    localStorage.setItem("ventes", JSON.stringify(ventes));
}


boutonsProduits.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        const nomProduit = bouton.textContent;
        const prixProduit = Number(bouton.dataset.prix);
        const categorieProduit = bouton.dataset.categorie;

        commande.push({
            nom: nomProduit,
            prix: prixProduit,
            categorie: categorieProduit
        });

        afficherCommande();
    });
});

boutonAnnulerDernier.addEventListener("click", function() {
    commande.pop();
    afficherCommande();
});


boutonNouvelleCommande.addEventListener("click", function() {
    enregistrerVente();

    commande = [];
    afficherCommande();
});