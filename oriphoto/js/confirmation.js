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
let pageUrl = new URL(document.location.href);
let orderId = pageUrl.searchParams.get("id");
let totalPrice = pageUrl.searchParams.get("total");
totalPriceText = "Total payé: " + parseFloat(totalPrice).toFixed(2) + "€";

async function displayConfirmation() {
    let recapText = document.getElementById("recap-text");
    let orderIdText = document.createElement("p");
    orderIdText.setAttribute("id", "order--id--text");
    orderIdText.setAttribute("class", "order--id--text");
    orderIdText.textContent = "Commande N°" + orderId + " enregistrée";
    recapText.appendChild(orderIdText);
    let totalPriceElement = document.createElement("p");
    totalPriceElement.setAttribute("id", "order-total-price--text");
    totalPriceElement.setAttribute("class", "order--total-price--text");
    totalPriceElement.textContent = totalPriceText;
    recapText.appendChild(totalPriceElement);
}