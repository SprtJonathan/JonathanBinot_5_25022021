// Déclaration des variables du panier pour l'initialiser
const cartId = "userShoppingCart"; // Nom du panier qui sera ajouté au localStorage
let shoppingCart = JSON.parse(localStorage.getItem(cartId)); // Tableau contenant les éléments ajoutés au panier

// Ajout de l'affichage du nombre d'éléments dans le panier
// Vérification que le localStorage soit initialisée pour éviter les erreurs
if (localStorage.getItem(cartId)) {
    console.log(shoppingCart);
} else {
    console.log("Le panier va être initalisé");
    shoppingCart = [];
    localStorage.setItem(cartId, JSON.stringify(shoppingCart));
}

// Définition des variables
let pageUrl = new URL(document.location.href); // Permet de récupérer l'URL de la page
let orderId = pageUrl.searchParams.get("id"); // Récupère les informations de l'URL à partir de l'id défini précédemment
let customerFName = pageUrl.searchParams.get("firstName");
let customerLName = pageUrl.searchParams.get("lastName");
let totalPrice = pageUrl.searchParams.get("total");
totalPriceText = "Total payé: " + parseFloat(totalPrice).toFixed(2) + "€";

// Fonction permettant d'afficher les informations de la confirmation de commande
async function displayConfirmation() {
    let recapText = document.getElementById("recap-text");
    let orderIdText = document.createElement("p");
    orderIdText.setAttribute("id", "order-id-text");
    orderIdText.setAttribute("class", "order--id--text");
    orderIdText.innerHTML = "Commande N°" + orderId + "</br>" + " au nom de " + customerFName + " " + customerLName + " enregistrée";
    recapText.appendChild(orderIdText);
    let totalPriceElement = document.createElement("p");
    totalPriceElement.setAttribute("id", "order-total-price-text");
    totalPriceElement.setAttribute("class", "order--total-price--text");
    totalPriceElement.textContent = totalPriceText;
    recapText.appendChild(totalPriceElement);
}